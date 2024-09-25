import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class SocketService implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log('Connected');
    }

    handleDisconnect(client: Socket) {
        console.log('Disconected');
    }

    @SubscribeMessage('join-room')
    handleJoinRoom(client: Socket, roomId: string) {
        client.join(roomId);
    }

    @SubscribeMessage('server-path')
    handleEvent(@MessageBody() dto: any, @ConnectedSocket() client: Socket) {
        const res = { dto };
        this.server.to(dto.roomId).emit('client-path', res);
    }
}
