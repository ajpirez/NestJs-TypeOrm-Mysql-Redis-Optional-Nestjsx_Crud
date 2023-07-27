import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User.entity';
import { Profile } from '../typeorm/entities/Profile.entity';
import { Post } from '../typeorm/entities/Post.entity';
import { Group } from '../typeorm/entities/group.entity';
import { RedisCacheModule } from '../redis/redis.module';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    RedisCacheModule,
    CacheModule.register({
      ttl: 5,
      max: 100,
    }),
    TypeOrmModule.forFeature([User, Profile, Post, Group]),
  ],

  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class UsersModule {}
