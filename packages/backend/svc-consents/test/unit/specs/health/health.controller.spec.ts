import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '$/health/health.controller';

describe('Health Controller', () => {
  let module: TestingModule;
  let controller: HealthController;
  const response = { status: 'OK' };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();
    controller = module.get<HealthController>(HealthController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should return status ok', () => {
    expect(controller.getHealth()).toEqual(response);
  });

  afterAll(async () => {
    await module.close();
  });
});
