import { Test, TestingModule } from '@nestjs/testing';

import { UserRepository } from '$/db/repositories/user.repository';
import { UserRegistrationResponse } from '$/dto';
import { BadRequestError } from '$/error';
import { UserService } from '$/user/user.service';

import { userMock, userRegistrationRequestMock } from '#/utils/fixtures';
import { userMockRepo } from '#/utils/mocks/repo.mock';

describe('User Service', () => {
  let module: TestingModule;
  let service: UserService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [{ provide: UserRepository, useValue: userMockRepo }, UserService],
    }).compile();
    service = module.get<UserService>(UserService);
  });

  beforeEach(jest.clearAllMocks);

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('register', () => {
    test('should allow a user to register', async () => {
      const { email, password } = userRegistrationRequestMock;
      const result = await service.register(email, password);
      expect(result).toMatchObject(new UserRegistrationResponse({ ...userMock, consents: [] }));
      expect(userMockRepo.create).toHaveBeenCalledWith({ email, password });
    });

    test("throws when the user's email address already exists", async () => {
      userMockRepo.create?.mockRejectedValueOnce(new Error());
      const { email, password } = userRegistrationRequestMock;
      await expect(service.register(email, password)).rejects.toThrowError(BadRequestError);
      expect(userMockRepo.create).toHaveBeenCalledWith({ email, password });
    });
  });

  afterAll(async () => {
    await module.close();
  });
});
