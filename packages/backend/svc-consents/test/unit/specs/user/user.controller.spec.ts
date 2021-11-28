import { Test, TestingModule } from '@nestjs/testing';

import { UserController } from '$/user/user.controller';
import { UserService } from '$/user/user.service';

import { userRegistrationRequestMock, userRegistrationResponseMock } from '#/utils/fixtures';
import { userMockService } from '#/utils/mocks/service.mock';

describe('User Controller', () => {
  let module: TestingModule;
  let controller: UserController;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: userMockService }],
    }).compile();
    controller = module.get<UserController>(UserController);
  });

  beforeEach(jest.clearAllMocks);

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    test('should allow a user to register', async () => {
      const { email, password } = userRegistrationRequestMock;
      const result = await controller.register(userRegistrationRequestMock);
      expect(result).toMatchObject(userRegistrationResponseMock);
      expect(userMockService.register).toHaveBeenCalledWith(email, password);
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
