import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../src/typeorm/entities/User.entity';
import { UsersModule } from '../src/users/users.module';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  const mockUserRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(mockUserRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('GET /users', () => {
    it('should return an array of users', async () => {
      return request(app.getHttpServer()).get('/users').expect(200);
    });
  });
});
