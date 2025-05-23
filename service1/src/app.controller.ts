import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        @Inject('TEST_SERVICE') private readonly client: ClientProxy,
    ) {}

    @Post('emit-message')
    async emitMessage(@Body() data: MessageDto) {
        this.client.emit('message_from_service1', { message: data.message });
        return 'Сообщение успешно отправлено.';
    }

    @Post('send-message')
    async sendMessage(@Body() data: MessageDto) {
        return this.client.send('message_from_service1', { message: data.message });
    }
}
