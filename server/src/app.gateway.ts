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
import {
  CargoPlacement,
  SuggestedCargoPlacement,
} from './cargoPlacement/cargoPlacement.model';
import { CargoQueueItem } from './cargoQueue/cargoQueue.model';
import { Settings } from './settings/settings.model';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger: Logger = new Logger('AppGateway');

  @WebSocketServer() webSocketServer: Server;

  afterInit(server: Server) {
    this.logger.log('WebSocketGateway initialized');
  }

  handleConnection(client: Socket, ...args: any[]) {
    // console.log('connected client: ', client);
    this.logger.log(`Client ${client.id} connected.`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected.`);
  }

  // @SubscribeMessage('msgToServer')
  // handleMessage(client: Socket, text: string): WsResponse<string> {
  //   return { event: 'msgToClient', data: text };

  //   // this sends to same client that initiate the message

  //   // Same as client.emit('msgToClient', text);
  // }

  pushCargoPlacements(cargoPlacements: CargoPlacement[], voyageId: string) {
    if (!voyageId) {
      this.logger.error('voyageId not provided to pushCargoPlacements');
      return;
    }
    this.webSocketServer.emit(`cargoPlacements___${voyageId}`, cargoPlacements);
  }

  pushCargoQueueToClients(cargoQueueItems: CargoQueueItem[], voyageId: string) {
    if (!voyageId) {
      this.logger.error('voyageId not provided to pushCargoQueueToClients');
      return;
    }
    this.webSocketServer.emit(
      `cargoQueueUpdated___${voyageId}`,
      cargoQueueItems,
    );
  }

  pushSettingsToClients(settings: Settings) {
    // TODO: This needs to be rebuilt so that it only sends the settings to a user on the specific vessel
    this.webSocketServer.emit(
      `settingsUpdated___${settings.vesselId}`,
      settings,
    );
  }

  pushSuggestedCargoPlacementToClients(
    suggestedCargoPlacement: SuggestedCargoPlacement,
    voyageId: string,
  ) {
    this.webSocketServer.emit(
      `suggestedCargoPlacementUpdated__${voyageId}`,
      suggestedCargoPlacement,
    );
  }
}
