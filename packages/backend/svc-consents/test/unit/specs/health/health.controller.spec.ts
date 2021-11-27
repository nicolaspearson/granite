import { Test, TestingModule } from '@nestjs/testing';

import { HealthController } from '$/health/health.controller';

describe('Health Controller', () => {
  let controller: HealthController;
  const response = { status: 'OK' };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
});
