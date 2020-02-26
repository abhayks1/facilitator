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


export const ORIGIN_GAS_PRICE = '0x2540BE400'; // 10 Gwei
export const AUXILIARY_GAS_PRICE = '0x3B9ACA00'; // 1 Gwei
export const MESSAGE_BOX_OFFSET = '7';
export const SUBSCRIPTION_RESTART_DURATION = 10 * 60 * 1000;
export const MAX_VALUE = 999999999999999999999999999999999999999999999999999999999999999999999999999999;
export const EntityTypes = {
  StateRootAvailables: 'stateRootAvailables',
  GatewayProvens: 'gatewayProvens',
  // Stake & Mint entities
  StakeRequesteds: 'stakeRequesteds',
  StakeIntentDeclareds: 'stakeIntentDeclareds',
  StakeIntentConfirmeds: 'stakeIntentConfirmeds',
  StakeProgresseds: 'stakeProgresseds',
  MintProgresseds: 'mintProgresseds',
  // Redeem & Unstake entities
  RedeemRequesteds: 'redeemRequesteds',
  RedeemIntentDeclareds: 'redeemIntentDeclareds',
  RedeemIntentConfirmeds: 'redeemIntentConfirmeds',
  RedeemProgresseds: 'redeemProgresseds',
  UnstakeProgresseds: 'unstakeProgresseds',
};

// export enum EntityTypesEnum {
//   StateRootAvailables = 'stateRootAvailables',
//   GatewayProvens = 'gatewayProvens',
//   // Stake & Mint entities
//   StakeRequesteds = 'stakeRequesteds',
//   StakeIntentDeclareds = 'stakeIntentDeclareds',
//   StakeIntentConfirmeds = 'stakeIntentConfirmeds',
//   StakeProgresseds = 'stakeProgresseds',
//   MintProgresseds = 'mintProgresseds',
//   // Redeem & Unstake entities
//   RedeemRequesteds = 'redeemRequesteds',
//   RedeemIntentDeclareds = 'redeemIntentDeclareds',
//   RedeemIntentConfirmeds = 'redeemIntentConfirmeds',
//   RedeemProgresseds = 'redeemProgresseds',
//   UnstakeProgresseds = 'unstakeProgresseds',
// }
