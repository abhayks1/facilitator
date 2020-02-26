// Copyright 2019 OpenST Ltd.
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
//
// ----------------------------------------------------------------------------


import BigNumber from 'bignumber.js';

import Comparable from '../../m0_facilitator/observer/Comparable';

/**
 * Represents ContractEntity model object.
 */
export default class ContractEntity extends Comparable<ContractEntity> {
  public contractAddress: string;

  public entityType: string;

  public timestamp: BigNumber;

  public createdAt?: Date;

  public updatedAt?: Date;

  public static validEntityTypes: Record<string, string>;

  // public static validEnumEntityTypes = new Set<EntityTypesEnum>();

  /**
   * Constructor to set fields of Contract Entities model.
   * @param contractAddress Address of the contract.
   * @param entityType Type of the entity.
   * @param timestamp Last updated time in secs.
   * @param createdAt Time at which record is created.
   * @param updatedAt Time at which record is updated.
   */
  public constructor(
    contractAddress: string,
    entityType: string,
    timestamp: BigNumber,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    super();
    this.contractAddress = contractAddress;
    this.entityType = ContractEntity.validEntityTypes[entityType];
    this.timestamp = timestamp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Compares ContractEntity objects.
   * @param other ContractEntity object which is to be compared.
   * @returns `0` if the objects are same, 1 if new object is greater and -1 if new object
   *          is lesser.
   */
  public compareTo(other: ContractEntity): number {
    const currentKey = this.contractAddress.concat(this.entityType);
    const specifiedKey = other.contractAddress.concat(other.entityType);

    if (currentKey > specifiedKey) {
      return 1;
    }

    if (currentKey < specifiedKey) {
      return -1;
    }

    return 0;
  }

  public static setValidEntityTypes(validEntityTypes: Record<string, string>): void {
    this.validEntityTypes = validEntityTypes;
  }
}
