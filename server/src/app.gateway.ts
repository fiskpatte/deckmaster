import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WsResponse,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { CargoPlacement } from './cargoPlacement/cargoPlacement.model';
import { CargoQueueItem } from './cargoQueue/cargoQueue.model';
import { Settings } from './settings/settings.model';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() webSocketServer: Server;

  afterInit(server: Server) {
    this.logger.log('Initialized!');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected.`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, text: string): WsResponse<string> {
    return { event: 'msgToClient', data: text };

    // this sends to same client that initiate the message

    // Same as client.emit('msgToClient', text);
  }

  pushCargoPlacementToClients(cargoPlacement: CargoPlacement) {
    this.webSocketServer.emit('newCargoPlacement', cargoPlacement);
  }

  pushCargoPlacements(cargoPlacements: CargoPlacement[]) {
    this.webSocketServer.emit('cargoPlacements', cargoPlacements);
  }

  pushCargoQueueToClients(cargoQueueItems: CargoQueueItem[]) {
    this.webSocketServer.emit('cargoQueueUpdated', cargoQueueItems);
  }

  pushSettingsToClients(settings: Settings) {
    this.webSocketServer.emit('settingsUpdated', settings);
  }
}
