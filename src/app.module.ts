import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.modules';
import { FirebaseApp } from './firestore/FirebaseApp';
import { PreAuthMiddleware } from './middleware/preauth.middleware';

@Module({
  imports: [
    UsersModule,
    ChallengesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    FirestoreModule.forRoot({
      imports: [ConfigModule],
      useFactory: (ConfigService: ConfigService) => ({
        keyFilename: ConfigService.get<string>('SA_KEY'),
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [AppService, FirebaseApp],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PreAuthMiddleware).forRoutes({path: 'users/*', method: RequestMethod.GET});
  }
  
}
