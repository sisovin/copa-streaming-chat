import { IsString } from 'class-validator';
import { Peer } from '../interfaces/peer.interface';

export class JoinRoomDto {
  @IsString()
  roomId: string;

  peer: Peer;
}
