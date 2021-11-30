import { Test, TestingModule } from '@nestjs/testing';

import { BadRequestError } from 'lib-nest/src';

import { UserRepository } from '$/db/repositories/user.repository';
import { UserProfileResponse, UserRegistrationResponse } from '$/dto';
import { UserService } from '$/user/user.service';

import { eventMock, userMock, userRegistrationRequestMock } from '#/utils/fixtures';
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

  describe('delete', () => {
    test('should allow a user to delete their account', async () => {
      await service.delete(userMock.uuid);
      expect(userMockRepo.delete).toHaveBeenCalledWith(userMock.uuid);
    });
  });

  describe('profile', () => {
    test('should allow a user to retrieve their profile (with events)', async () => {
      const result = await service.profile(userMock.uuid);
      expect(result).toMatchObject(new UserProfileResponse({ ...userMock, events: [eventMock] }));
      expect(userMockRepo.findByUuidOrFail).toHaveBeenCalledWith(userMock.uuid);
    });

    test('should allow a user to retrieve their profile (without events)', async () => {
      userMockRepo.findByUuidOrFail?.mockResolvedValueOnce(userMock);
      const result = await service.profile(userMock.uuid);
      expect(result).toMatchObject(
        new UserProfileResponse({ uuid: userMock.uuid, email: userMock.email }),
      );
      expect(userMockRepo.findByUuidOrFail).toHaveBeenCalledWith(userMock.uuid);
    });
  });

  describe('register', () => {
    test('should allow a user to register', async () => {
      const { email, password } = userRegistrationRequestMock;
      const result = await service.register(email, password);
      expect(result).toMatchObject(new UserRegistrationResponse({ ...userMock, events: [] }));
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
