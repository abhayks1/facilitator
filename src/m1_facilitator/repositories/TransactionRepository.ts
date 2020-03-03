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

import {
  DataTypes, Model, InitOptions,
} from 'sequelize';
import assert from 'assert';
import BigNumber from 'bignumber.js';
import Subject from '../../common/observer/Subject';
import Transaction from '../models/Transaction';
import Utils from '../../common/Utils';

/**
 * An interface, that represents an each row of TransactionRepository.
 */
class TransactionModel extends Model {
  public readonly fromAddress!: string;

  public readonly toAddress!: string;

  public readonly encodedData!: string;

  public readonly gasPrice!: BigNumber;

  public readonly gas!: BigNumber;

  public readonly id!: BigNumber;

  public readonly transactionHash!: string;

  public readonly nonce!: BigNumber;

  public readonly createdAt!: Date;

  public readonly updatedAt!: Date;
}

/**
 * Stores instance of Transaction.
 *
 * Class enables creation, update and retrieval of Transaction objects.
 * On construction it initializes underlying sequelize model.
 */
export default class TransactionRepository extends Subject<Transaction> {
  /* Public Functions */

  public constructor(initOptions: InitOptions) {
    super();

    TransactionModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fromAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        toAddress: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        encodedData: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        gasPrice: {
          type: DataTypes.DECIMAL(78),
          allowNull: false,
        },
        gas: {
          type: DataTypes.DECIMAL(78),
          allowNull: true,
        },
        transactionHash: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        nonce: {
          type: DataTypes.DECIMAL(78),
          allowNull: true,
        },
      },
      {
        ...initOptions,
        modelName: 'Transaction',
        tableName: 'transactions',
      },
    );
  }

  /**
   * Create/update transaction model in database.
   *
   * @param transaction Transaction model object.
   */
  public async enqueue(transaction: Transaction): Promise<Transaction> {
    let savedTransaction: Transaction | null;
    if (transaction.id && transaction.id.gt(0)) {
      const definedOwnProps: string[] = Utils.getDefinedOwnProps(transaction);
      await TransactionModel.update(
        transaction,
        {
          where: {
            id: transaction.id.toNumber(),
          },
          fields: definedOwnProps,
        },
      );
      savedTransaction = await this.get(
        transaction.id,
      );
    } else {
      savedTransaction = this.convertToTransaction(await TransactionModel.create(
        transaction,
      ));
    }

    assert(
      savedTransaction !== null,
      `Updated transaction record not found for id: ${transaction.id}`,
    );

    return savedTransaction as Transaction;
  }

  /**
   * Fetches transaction based on id.
   *
   * @param id Unique auto increment transaction id.
   */
  public async get(id: BigNumber): Promise<Transaction | null> {
    const transactionModel = await TransactionModel.findOne({
      where: {
        id: id.toNumber(),
      },
    });

    if (transactionModel === null) {
      return null;
    }

    return this.convertToTransaction(transactionModel);
  }

  /**
   * Dequeues transaction based on FIFO logic.
   * Dequeue logic:
   * - Ordering of Transaction is done by id in ascending order
   * - Transaction hash is null
   */
  public async dequeue(): Promise<Transaction | null> {
    const transactionModel = await TransactionModel.findOne({
      where: {
        transactionHash: null,
      },
      order: [
        ['id', 'ASC'],
      ],
    });

    if (transactionModel === null) {
      return null;
    }

    return this.convertToTransaction(transactionModel);
  }


  /** Private Functions */

  // eslint-disable-next-line class-methods-use-this
  private convertToTransaction(transactionModel: TransactionModel): Transaction {
    return new Transaction(
      transactionModel.fromAddress,
      transactionModel.toAddress,
      transactionModel.encodedData,
      transactionModel.gasPrice ? new BigNumber(transactionModel.gasPrice) : transactionModel.gasPrice,
      transactionModel.gas ? new BigNumber(transactionModel.gas) : transactionModel.gas,
      transactionModel.id ? new BigNumber(transactionModel.id) : transactionModel.id,
      transactionModel.transactionHash,
      transactionModel.nonce ? new BigNumber(transactionModel.nonce) : transactionModel.nonce,
      transactionModel.createdAt,
      transactionModel.updatedAt,
    );
  }
}