import User from '$/db/entities/user.entity';

export const userFixtures: User[] = [
  {
    uuid: '343c6ac5-2b72-4c41-a9eb-28f5ae49af80' as Uuid,
    firstName: 'Steve',
    lastName: 'Rogers',
    emailAddress: 'steve.rogers@avengers.com',
    password: 'secret',
    createdAt: new Date(),
  },
];
