import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongoDBModule } from '@app/common';
import { AuthorsResolver } from './resolver/author.resolver';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req, res }) => ({ req, res }),
      sortSchema: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
        CLIENT_URI1: Joi.string().required(),
        CLIENT_URI2: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        MAIL_SERVICE: Joi.string().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.string().required(),
        MAIL_EMAIL: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        VERIFY_TOKEN_TIME: Joi.string().required(),
        HASH_SALT: Joi.string().required(),
        COOKIE_EXPIRATION: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        MONGODB_PASS: Joi.string().required(),
        MONGODB_NAME: Joi.string().required(),
        FIREBASE_API_KEY: Joi.string().required(),
        FIREBASE_PROJECT_ID: Joi.string().required(),
        FIREBASE_STORAGE_BUCKET: Joi.string().required(),
      }),
    }),
    MongoDBModule,
  ],
  controllers: [],
  providers: [AuthorsResolver],
})
export class AppModule {}
