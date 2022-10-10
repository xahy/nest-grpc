import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { Controller, Get } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AppService } from './app.service';
import { Hero } from './hero/interfaces/hero';
import { HeroById } from './hero/interfaces/hero-by-id';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @GrpcMethod('HeroesService', 'FindOne')
  findOne(
    data: HeroById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ): Hero {
    const items = [
      { id: 1, name: 'John' },
      { id: 2, name: 'Doe' },
    ];

    console.log('data', data);
    return items.find(({ id }) => id === data.id);
  }
}
