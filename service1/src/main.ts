import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.startAllMicroservices();
    await app.listen(3001);
    console.log(`Application service 1 start at port 3001`);
}
bootstrap();
