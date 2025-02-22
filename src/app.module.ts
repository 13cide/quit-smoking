import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChallengesModule } from './challenges/challenges.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirestoreModule } from './firestore/firestore.modules';

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
  providers: [AppService],
})
export class AppModule {}
