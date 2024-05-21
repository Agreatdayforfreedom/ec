import { Test, TestingModule } from '@nestjs/testing';
import { SagaController } from './saga.controller';

describe('SagaController', () => {
  let controller: SagaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SagaController],
    }).compile();

    controller = module.get<SagaController>(SagaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
