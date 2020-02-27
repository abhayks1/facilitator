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

import * as web3utils from 'web3-utils';
import BigNumber from 'bignumber.js';

import Repositories
  from '../../../../src/m1_facilitator/repositories/Repositories';
import ConfirmDepositIntentsHandler
  from '../../../../src/m1_facilitator/handlers/ConfirmDepositIntentsHandler';
import Message, {
  MessageStatus,
  MessageType,
} from '../../../../src/m1_facilitator/models/Message';
import MessageRepository
  from '../../../../src/m1_facilitator/repositories/MessageRepository';
import assert from '../../../test_utils/assert';
import GatewayRepository
  from '../../../../src/m1_facilitator/repositories/GatewayRepository';
import Gateway, { GatewayType } from '../../../../src/m1_facilitator/models/Gateway';

describe('ConfirmDepositIntentsHandler::handle', (): void => {
  let messageRepository: MessageRepository;
  let gatewayRepository: GatewayRepository;
  let confirmDepositIntentsHandler: ConfirmDepositIntentsHandler;

  beforeEach(async (): Promise<void> => {
    const repositories = await Repositories.create();
    ({ messageRepository, gatewayRepository } = repositories);
    confirmDepositIntentsHandler = new ConfirmDepositIntentsHandler(
      messageRepository,
      gatewayRepository,
    );
  });

  it('should change target status to declared for existing message', async (): Promise<void> => {
    const messageHash = web3utils.sha3('1');

    const existingMessage = new Message(
      messageHash,
      MessageType.Deposit,
      MessageStatus.Declared,
      MessageStatus.Undeclared,
      '0x0000000000000000000000000000000000000001',
    );

    await messageRepository.save(existingMessage);

    const confirmDepositIntentRecord = {
      messageHash,
      contractAddress: '0x0000000000000000000000000000000000000001',
    };

    await confirmDepositIntentsHandler.handle([confirmDepositIntentRecord]);

    const message = await messageRepository.get(messageHash);

    assert.strictEqual(
      message && message.targetStatus,
      MessageStatus.Declared,
      'Target status should be declared',
    );
  });

  it('should create a message with target status declared if'
    + ' message does not exists', async (): Promise<void> => {
    const messageHash = web3utils.sha3('1');

    const confirmDepositIntentRecord = {
      messageHash,
      contractAddress: '0x0000000000000000000000000000000000000001',
    };

    await gatewayRepository.save(
      new Gateway(
        Gateway.getGlobalAddress(confirmDepositIntentRecord.contractAddress),
        Gateway.getGlobalAddress('0x0000000000000000000000000000000000000001'),
        GatewayType.ERC20,
        '0x0000000000000000000000000000000000000003',
        new BigNumber(0),
      ),
    );
    await confirmDepositIntentsHandler.handle([confirmDepositIntentRecord]);

    const message = await messageRepository.get(messageHash);

    assert.strictEqual(
      message && message.targetStatus,
      MessageStatus.Declared,
      'Target status should be declared',
    );
  });

  it('should handle multiple records', async (): Promise<void> => {
    const existingMessages = [
      new Message(
        web3utils.sha3('1'),
        MessageType.Deposit,
        MessageStatus.Declared,
        MessageStatus.Undeclared,
        '0x0000000000000000000000000000000000000001',
      ),
      new Message(
        web3utils.sha3('2'),
        MessageType.Deposit,
        MessageStatus.Declared,
        MessageStatus.Undeclared,
        '0x0000000000000000000000000000000000000001',
      ),
    ];

    await messageRepository.save(existingMessages[0]);
    await messageRepository.save(existingMessages[1]);

    const confirmDepositIntentRecords = [
      {
        messageHash: web3utils.sha3('1'),
        contractAddress: '0x0000000000000000000000000000000000000001',
      },
      {
        messageHash: web3utils.sha3('2'),
        contractAddress: '0x0000000000000000000000000000000000000001',
      },
    ];

    await confirmDepositIntentsHandler.handle(confirmDepositIntentRecords);

    const message1 = await messageRepository.get(existingMessages[0].messageHash);

    assert.strictEqual(
      message1 && message1.targetStatus,
      MessageStatus.Declared,
      'Target status should be declared',
    );

    const message2 = await messageRepository.get(existingMessages[1].messageHash);

    assert.strictEqual(
      message2 && message2.targetStatus,
      MessageStatus.Declared,
      'Target status should be declared',
    );
  });
});
