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


import Facilitator from './Facilitator';
import Handlers from './handlers/Handlers';
import Repositories from './repositories/Repositories';
import Services from './services/Services';
import Subscriptions from './subscriptions/Subscriptions';
import TransactionHandler from './TransactionHandler';
import { Config } from './Config/Config';
import ContractEntity, { EntityType } from '../common/models/ContractEntity';
import { EntityTypes } from './Constants';

export default class Container {
  /**
   * This instantiate all the dependencies.
   * @param config Config object/
   * @return Promise that resolves to facilitator instance.
   */
  public static async create(
    config: Config,

  ): Promise<Facilitator> {
    const repositories = await Repositories.create(config.facilitator.database.path);
    const handler = Handlers.create(
      repositories,
      config.facilitator.auxChainId,
      config.gatewayAddresses.eip20GatewayAddress,
      config.gatewayAddresses.eip20CoGatewayAddress,
    );
    const transactionHandler = new TransactionHandler(
      handler,
      repositories,
    );
    const configOriginChain = config.facilitator.originChain;
    const configAuxChainId = config.facilitator.auxChainId;
    const subscriptions = await Subscriptions.create(
      transactionHandler,
      repositories,
      config.facilitator.chains[configOriginChain].subGraphWs,
      config.facilitator.chains[configOriginChain].subGraphRpc,
      config.facilitator.chains[configAuxChainId].subGraphWs,
      config.facilitator.chains[configAuxChainId].subGraphRpc,
    );

    const services = Services.create(repositories, config);

    repositories.attach(services);

    ContractEntity.setValidEntityTypes(EntityTypes);

    return new Facilitator(subscriptions.originSubscriber, subscriptions.auxiliarySubscriber);
  }
}
