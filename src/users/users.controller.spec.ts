import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';

describe('UsersController', () => {
  let controller: UsersController;
  const mockUsersService = {
    create: jest.fn((createUserDto) => {
      return {
        id: Date.now(),
        authStrategy: expect.any(String),
        ...createUserDto,
      };
    }),
    update: jest.fn().mockImplementation((id, updateUserDto) => ({
      id,
      ...updateUserDto,
    })),
    findAll: jest.fn(() => {
      return [
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
      ];
    }),
    findOne: jest.fn().mockImplementation((id) => {
      return {
        id,
        username: expect.any(String),
        password: expect.any(String),
        createdAt: expect.any(Date),
        authStrategy: expect.any(String),
        profile: expect.any(Object),
        posts: expect.any(Array),
        groups: expect.any(Array),
      };
    }),
    remove: jest.fn().mockImplementation((id) => {
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          ttl: 5,
          max: 100,
        }),
      ],
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUsersService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    const createUserDto = {
      username: 'ajpirez',
      password: '123',
      createdAt: new Date(),
    };
    const result = controller.create(createUserDto);
    expect(result).toEqual({
      id: expect.any(Number),
      ...createUserDto,
      authStrategy: expect.any(String),
    });

    expect(mockUsersService.create).toHaveBeenCalled();
    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });
  it('should update a user', async () => {
    const updateUserDto = {
      username: 'ajpirez',
      password: '123',
      createdAt: new Date(),
    };
    const result = await controller.update(17, updateUserDto);

    expect(result).toEqual({
      id: 17,
      ...updateUserDto,
    });

    expect(mockUsersService.update).toHaveBeenCalled();
  });

  it('should find all user', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([
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

    expect(mockUsersService.findAll).toHaveBeenCalled();
  });

  it('should find one user by Id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual({
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

  it('should delete one user by Id', async () => {
    const result = await controller.remove(1);
    expect(result).toBeNull();
  });
});
