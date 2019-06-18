import ContractEntityHandler from './ContractEntityHandler';
import StakeRequest from '../models/StakeRequest';

export default class StakeRequestedHandler extends ContractEntityHandler<StakeRequest> {
  /**
   * This method parse stakeRequest transaction and returns stakeRequest model object.
   * @param transaction Transaction object.
   */
  public parse = (transaction: any): StakeRequest => {
    const {
      gasLimit,
      gateway,
      staker,
      gasPrice,
      id,
      nonce,
      beneficiary,
      amount,
      stakeRequestHash,
    } = transaction;
    return new StakeRequest(
      id,
      amount,
      beneficiary,
      gasPrice,
      gasLimit,
      nonce,
      staker,
      gateway,
      stakeRequestHash,
    );
  };

  /**
   * This method defines action on receiving stake request model.
   * @param stakeRequest instance of StakeRequest model .
   */
  public handle = (stakeRequest: StakeRequest): void => {

    // stakeRequestRepository.save(stakeRequest);
    // stakeRequestService.reactTo(stakeRequest);
  };
}
