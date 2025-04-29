import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VideoCallModule } from './video-call/video-call.module';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    AuthModule,
    VideoCallModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
