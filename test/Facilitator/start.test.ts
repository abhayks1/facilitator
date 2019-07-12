import sinon from 'sinon';

import { Config, DBConfig, FacilitatorConfig } from '../../src/Config';
import Facilitator from '../../src/Facilitator';
import GraphClient from '../../src/GraphClient';
import HandlerFactory from '../../src/handlers/HandlerFactory';
import Repositories from '../../src/repositories/Repositories';
import Subscriber from '../../src/Subscriber';
import assert from '../test_utils/assert';
import SpyAssert from '../test_utils/SpyAssert';

describe('Facilitator.start()', (): void => {
  it('should start facilitation', async (): Promise<void> => {
    const handlerFactoryStub = sinon.replace(
      HandlerFactory,
      'get',
      sinon.fake.resolves(true),
    );
    const mockGraphClient = sinon.createStubInstance(GraphClient);
    const fakeRepositories = 'fakeRepositories';
    const repositoriesSpy = sinon.replace(
      Repositories,
      'create',
      sinon.fake.resolves(fakeRepositories),
    );
    const graphClientSpy = sinon.replace(
      GraphClient,
      'getClient',
      sinon.fake.returns(mockGraphClient),
    );
    const subscribeStub = sinon.stub(Subscriber.prototype, 'subscribe');
    const subGraphDetails = Facilitator.getSubscriptionDetails();

    const fakePath = 'SomePath';
    const database = sinon.createStubInstance(DBConfig);
    database.path = fakePath;
    const facilitatorStub = sinon.fake(FacilitatorConfig) as any;
    facilitatorStub.database = database;
    const configStub = sinon.createStubInstance(Config);
    configStub.facilitator = facilitatorStub;

    const facilitator = new Facilitator(configStub);
    await facilitator.start();

    SpyAssert.assert(
      handlerFactoryStub,
      1,
      [[fakeRepositories]],
    );

    SpyAssert.assert(repositoriesSpy, 1, [[fakePath]]);

    SpyAssert.assert(
      graphClientSpy,
      4,
      [
        ['http', subGraphDetails.origin.httpSubGraphEndPoint],
        ['ws', subGraphDetails.origin.wsSubGraphEndPoint],
        ['http', subGraphDetails.auxiliary.httpSubGraphEndPoint],
        ['ws', subGraphDetails.auxiliary.wsSubGraphEndPoint],
      ],
    );

    assert.strictEqual(
      2,
      subscribeStub.callCount,
      'Subscribe must be called twice',
    );

    subscribeStub.restore();
    sinon.restore();
  });
});
