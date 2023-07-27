import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User.entity';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => {
      return {
        ...dto,
        createdAt: expect.any(Date),
      };
    }),
    save: jest.fn().mockImplementation((user) =>
      Promise.resolve({
        id: Date.now(),
        authStrategy: expect.any(String),
        ...user,
      }),
    ),
    find: jest.fn().mockImplementation(() => {
      return Promise.resolve([
        {
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(Date),
          authStrategy: expect.any(String),
          profile: expect.any(Object),
          posts: expect.any(Array),
          groups: expect.any(Array),
        },
        {
          id: expect.any(Number),
          username: expect.any(String),
          password: expect.any(String),
          createdAt: expect.any(Date),
          authStrategy: expect.any(String),
          profile: expect.any(Object),
          posts: expect.any(Array),
          groups: expect.any(Array),
        },
      ]);
    }),
    findOneBy: jest.fn().mockImplementation(({ id }) => {
      return Promise.resolve({
        id,
        username: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(Date),
        authStrategy: expect.any(String),
        profile: expect.any(Object),
        posts: expect.any(Array),
        groups: expect.any(Array),
      });
    }),
    update: jest.fn().mockImplementation((id, dto) => {
      return Promise.resolve({
        id,
        dto,
      });
    }),
    delete: jest.fn().mockImplementation((id) => {
      return null;
    }),
  };

  const mockCacheManager = {
    set: jest.fn(),
    get: jest.fn(),
    del: jest.fn(),
    reset: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    expect(
      await service.create({
        username: 'ajpirez',
        password: '123',
      }),
    ).toEqual({
      id: expect.any(Number),
      authStrategy: expect.any(String),
      username: 'ajpirez',
      password: '123',
      createdAt: expect.any(Date),
    });
  });

  it('should return all users', async () => {
    const response = await service.findAll();
    expect(response).toEqual([
      {
        id: expect.any(Number),
        username: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(Date),
        authStrategy: expect.any(String),
        profile: expect.any(Object),
        posts: expect.any(Array),
        groups: expect.any(Array),
      },
      {
        id: expect.any(Number),
        username: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(Date),
        authStrategy: expect.any(String),
        profile: expect.any(Object),
        posts: expect.any(Array),
        groups: expect.any(Array),
      },
    ]);
  });

  it('should return one user by id', async () => {
    const response = await service.findOne(1);
    expect(response).toEqual({
      id: 1,
      username: expect.any(String),
      password: expect.any(String),
      createdAt: expect.any(Date),
      authStrategy: expect.any(String),
      profile: expect.any(Object),
      posts: expect.any(Array),
      groups: expect.any(Array),
    });
  });

  it('should update one user by id', async () => {
    const response = await service.update(1, {
      username: 'ajpirez',
      password: '123',
    });
    expect(response).toEqual({
      id: 1,
      username: 'ajpirez',
      password: '123',
      createdAt: expect.any(Date),
      authStrategy: expect.any(String),
      profile: expect.any(Object),
      posts: expect.any(Array),
      groups: expect.any(Array),
    });
  });

  it('should delete one user by id', async () => {
    const response = await service.remove(1);
    expect(response).toBeNull();
  });
});
