// Copyright 2020 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import BigNumber from 'bignumber.js';

import ContractEntityHandler from '../../common/handlers/ContractEntityHandler';

import DepositIntent from '../models/DepositIntent';
import Message, { MessageStatus, MessageType } from '../models/Message';
import GatewayRepository from '../repositories/GatewayRepository';
import DepositIntentRepository from '../repositories/DepositIntentRepository';
import MessageRepository from '../repositories/MessageRepository';
import Utils from '../../common/Utils';
import Logger from '../../common/Logger';
import Gateway from '../models/Gateway';

/** It represents record of DeclaredDepositIntents entity. */
interface DeclaredDepositIntentsEntityInterface {
  contractAddress: string;
  messageHash: string;
  valueToken: string;
  beneficiary: string;
  amount: string;
  feeGasPrice: string;
  feeGasLimit: string;
  blockNumber: string;
  depositor: string;
  nonce: string;
}

/**
 * It handles updates from DeclaredDepositIntents entity.
 */
export default class DeclaredDepositIntentsHandler extends ContractEntityHandler {
  /** Instance of DepositIntentRepository. */
  private readonly depositIntentRepository: DepositIntentRepository;

  /** Instance of MessageRepository. */
  private readonly messageRepository: MessageRepository;

  /** Instance of GatewayRepository. */
  private readonly gatewayRepository: GatewayRepository;

  /** Unique list of tokens to be facilitated */
  private readonly supportedTokens: Set<string>;

  /**
   * Constructor for DeclaredDepositIntentHandler.
   *
   * @param depositIntentRepository Instance of DepositIntentRepository.
   * @param gatewayRepository Instance of GatewayRepository.
   * @param messageRepository Instance of MessageRepository.
   * @param supportedTokens Array of tokens to be facilitated.
   */
  public constructor(
    depositIntentRepository: DepositIntentRepository,
    gatewayRepository: GatewayRepository,
    messageRepository: MessageRepository,
    supportedTokens: Set<string>,
  ) {
    super();

    this.depositIntentRepository = depositIntentRepository;
    this.gatewayRepository = gatewayRepository;
    this.messageRepository = messageRepository;
    this.supportedTokens = supportedTokens || new Set();
  }

  /**
   * Handles DeclaredDepositIntents entity records.
   * - It filter records which has value token not in supportedTokens list.
   * - It creates a message record and updates it's source status to `Declared`.
   * - It creates `DepositIntent` record.
   * - This handler only reacts to DepositIntentDeclared event of ERC20Gateway which are populated
   *   during seed data. It silently ignores the events by other ERC20Gateway.
   *
   * @param records List of DeclaredDepositIntent entity.
   */
  public async handle(records: DeclaredDepositIntentsEntityInterface[]): Promise<void> {
    Logger.info(`DeclaredDepositIntentsHandler::records received: ${records.length}`);
    const promisesCollection = records.filter(
      (rec): boolean => this.isTokenSupported(rec.valueToken),
    ).map(
      async (record): Promise<void> => {
        await this.handleMessage(
          record.contractAddress,
          record.messageHash,
          record.feeGasPrice,
          record.feeGasLimit,
          record.blockNumber,
          record.depositor,
          record.nonce,
        );
        await this.handleDepositIntent(
          record.messageHash,
          record.valueToken,
          record.amount,
          record.beneficiary,
        );
      },
    );
    await Promise.all(promisesCollection);
    Logger.debug('DeclaredDepositIntentsHandler::messages saved');
  }

  /**
   * It creates/updates Message model.
   *
   * @param contractAddress Address of gateway contract.
   * @param messageHash Message hash.
   * @param feeGasPrice GasPrice which depositor will be paying.
   * @param feeGasLimit GasLimit which depositor will be paying.
   * @param blockNumber Block number at which deposit transaction is mined.
   * @param depositor Address of depositor.
   * @param nonce Mesasge nonce.
   */
  private async handleMessage(
    contractAddress: string,
    messageHash: string,
    feeGasPrice: string,
    feeGasLimit: string,
    blockNumber: string,
    depositor: string,
    nonce: string,
  ): Promise<void> {
    let messageObj = await this.messageRepository.get(messageHash);
    if (messageObj === null) {
      const gatewayRecord = await this.gatewayRepository.get(
        Gateway.getGlobalAddress(contractAddress),
      );
      if (gatewayRecord !== null) {
        Logger.info(`DeclaredDepositIntentsHandler::gateway record found for gatewayGA ${gatewayRecord.gatewayGA}`);
        messageObj = new Message(
          messageHash,
          MessageType.Deposit,
          MessageStatus.Undeclared,
          MessageStatus.Undeclared,
          Utils.toChecksumAddress(gatewayRecord.gatewayGA),
          new BigNumber(feeGasPrice),
          new BigNumber(feeGasLimit),
          new BigNumber(blockNumber),
        );
        messageObj.sender = Utils.toChecksumAddress(depositor);
        messageObj.nonce = new BigNumber(nonce);
        Logger.debug(`Creating message object ${JSON.stringify(messageObj)}`);
      } else {
        Logger.warn(`DeclaredDepositIntentsHandler::gateway record not found for gatewayGA ${contractAddress}`);
      }
    }
    if (messageObj !== null
      && messageObj.sourceStatus === MessageStatus.Undeclared
      && messageObj.type === MessageType.Deposit
    ) {
      messageObj.sourceStatus = MessageStatus.Declared;
      await this.messageRepository.save(messageObj);
      Logger.debug(`DeclaredDepositIntentsHandler::saved message ${JSON.stringify(messageObj)}`);
    }
  }

  /**
   * It creates/updates DepositIntent model.
   *
   * @param messageHash Message hash.
   * @param valueTokenAddress Value token address.
   * @param amount Deposit amount.
   * @param beneficiary Beneficiary address.
   */
  private async handleDepositIntent(
    messageHash: string,
    valueTokenAddress: string,
    amount: string,
    beneficiary: string,
  ): Promise<void> {
    const depositIntentObj = await this.depositIntentRepository.get(
      messageHash,
    );
    if (depositIntentObj === null) {
      const depositIntent = new DepositIntent(
        messageHash,
        Utils.toChecksumAddress(valueTokenAddress),
        new BigNumber(amount),
        Utils.toChecksumAddress(beneficiary),
      );
      await this.depositIntentRepository.save(depositIntent);
      Logger.debug(`DeclaredDepositIntentsHandler::saved deposit intent ${depositIntent}`);
    } else {
      Logger.warn(`DeclaredDepositIntentsHandler:: Deposit intent already exists: ${messageHash}`);
    }
  }

  /**
   * Checks if value token address needs to be facilitated.
   *
   * @param valueTokenAddress Value token address.
   */
  private isTokenSupported(valueTokenAddress: string): boolean {
    return (this.supportedTokens.size === 0 || this.supportedTokens.has(valueTokenAddress));
  }
}
