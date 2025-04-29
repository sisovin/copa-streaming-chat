import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { VideoCallService } from './video-call.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway()
export class VideoCallGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('VideoCallGateway');

  constructor(private readonly videoCallService: VideoCallService) {}

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createRoom')
  async handleCreateRoom(client: Socket, payload: CreateRoomDto) {
    const room = await this.videoCallService.createRoom(payload);
    client.join(room.id);
    this.server.to(room.id).emit('roomCreated', room);
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(client: Socket, payload: JoinRoomDto) {
    const room = await this.videoCallService.joinRoom(payload);
    client.join(room.id);
    this.server.to(room.id).emit('roomJoined', room);
  }
}
