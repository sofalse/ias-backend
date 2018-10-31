import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { UserModule } from '../src/user/user.module';
import { AppModule } from '../src/app.module';
import { hash } from 'bcrypt';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule, UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', async () => {
    const expectedOutput = {
      username: 'andrzej',
      password: await hash('admin', 6),
      email: 'admin@admin.com',
      roles: null,
    };

    const res = await request(app.getHttpServer())
      .post('/user')
      .send({
        data: {
          username: 'andrzej',
          password: 'admin',
          email: 'admin@admin.com',
        },
      })
      .expect(201);

    expect(Object.keys(res.body).sort()).toEqual(
      [
        'username',
        'roles',
        'id',
        'password',
        'email',
        'createdAt',
        'updatedAt',
      ].sort(),
    );
  });
});
