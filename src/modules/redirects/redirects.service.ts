import { Injectable } from '@nestjs/common';

@Injectable()
export class RedirectsService {
  getHello(): string {
    return 'Hello World!';
  }
}
