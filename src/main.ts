import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  // start the grpc server
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'hero',
        protoPath: join(__dirname, 'hero/hero.proto'),
        url: 'localhost:50051',
      },
    },
  );
  app.listen();

  // start the http server
  const webApp = await NestFactory.create(AppModule);
  await webApp.listen(3000);
}
bootstrap();
