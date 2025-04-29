import { Module } from '@nestjs/common';
import { VideoCallGateway } from './video-call.gateway';
import { VideoCallService } from './video-call.service';

@Module({
  providers: [VideoCallGateway, VideoCallService],
})
export class VideoCallModule {}
