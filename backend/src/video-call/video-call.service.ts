import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { JoinRoomDto } from './dto/join-room.dto';
import { Peer } from './interfaces/peer.interface';

@Injectable()
export class VideoCallService {
  private rooms: Map<string, Peer[]> = new Map();

  createRoom(createRoomDto: CreateRoomDto): { id: string; peers: Peer[] } {
    const roomId = this.generateRoomId();
    this.rooms.set(roomId, []);
    return { id: roomId, peers: [] };
  }

  joinRoom(joinRoomDto: JoinRoomDto): { id: string; peers: Peer[] } {
    const { roomId, peer } = joinRoomDto;
    const peers = this.rooms.get(roomId) || [];
    peers.push(peer);
    this.rooms.set(roomId, peers);
    return { id: roomId, peers };
  }

  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 15);
  }
}
