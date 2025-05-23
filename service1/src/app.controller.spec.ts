import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';
import { of, throwError } from 'rxjs';

describe('AppController', () => {
    let appController: AppController;
    let client: ClientProxy;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                AppService,
                {
                    provide: 'TEST_SERVICE',
                    useValue: {
                        send: jest
                            .fn()
                            .mockImplementation(() => of('Сообщение успешно получено service2.')),
                    },
                },
            ],
        }).compile();

        appController = module.get<AppController>(AppController);
        client = module.get<ClientProxy>('TEST_SERVICE');
    });

    describe('POST /send-message', () => {
        it('should send message and return response', async () => {
            const testMessage: MessageDto = { message: 'test message' };
            const response = await appController.sendMessage(testMessage);

            expect(client.send).toHaveBeenCalledWith('message_from_service1', {
                message: 'test message',
            });

            const result = await new Promise((resolve) => {
                response.subscribe((value) => resolve(value));
            });

            expect(result).toBe('Сообщение успешно получено service2.');
        });
    });
});
