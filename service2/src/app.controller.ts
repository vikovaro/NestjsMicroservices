import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern('message_from_service1')
    async handleMessage(data: MessageDto) {
        console.log('Получено сообщение в Service2:', data);
        return 'Сообщение успешно получено service2.';
    }

    @EventPattern('message_from_service1')
    async handleEmitMessage(data: MessageDto) {
        console.log('Получено сообщение в Service2:', data);
    }
}
