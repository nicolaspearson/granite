import User from '$/db/entities/user.entity';

export const userFixtures: User[] = [
  {
    uuid: '343c6ac5-2b72-4c41-a9eb-28f5ae49af80' as Uuid,
    email: 'john.doe@example.com' as Email,
    password: 'secret',
    createdAt: new Date(),
  },
];
