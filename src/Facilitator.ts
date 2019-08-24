import Subscriber from './subscriptions/Subscriber';
import Logger from './Logger';

/**
 * The class defines properties and behavior of a facilitator.
 */
export default class Facilitator {
  private originSubscriber: Subscriber;

  private auxiliarySubscriber: Subscriber;

  /**
   * @param originSubscriber Origin subscriber instance.
   * @param auxiliarySubscriber Auxiliary subscriber instance.
   */
  public constructor(originSubscriber: Subscriber, auxiliarySubscriber: Subscriber) {
    this.originSubscriber = originSubscriber;
    this.auxiliarySubscriber = auxiliarySubscriber;
  }

  /** Starts the facilitator by subscribing to subscription queries. */
  public async start(): Promise<void> {
    this.subscribeToSubGraphs();
    const subscriptionRestartTime = 15*60*1000; // 15 minutes
    setInterval(() => this.restartSubscription(), subscriptionRestartTime);
  }

  /**
   * Stops the facilitator and unsubscribe to query subscriptions.
   * This function should be called on signint or control-c.
   */
  public async stop(): Promise<void> {
    this.unsubscribeToSubGraphs();
  }

  private async restartSubscription() {
    this.unsubscribeToSubGraphs();
    this.subscribeToSubGraphs()
  }

  private async subscribeToSubGraphs() {
    Logger.info('Starting subscription to block chain events');
    await this.originSubscriber.subscribe();
    Logger.info('Subscription to origin block chain is done');
    await this.auxiliarySubscriber.subscribe();
    Logger.info('Subscription to auxiliary block chain is done');
  }

  private async unsubscribeToSubGraphs(){
    Logger.info('Stopping subscription to block chain events');
    await this.originSubscriber.unsubscribe();
    Logger.info('Unsubscribed to origin block chain.');
    await this.auxiliarySubscriber.unsubscribe();
    Logger.info('Unsubscribed to auxiliary block chain.');
  }
}
