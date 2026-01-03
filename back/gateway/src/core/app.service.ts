import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public health() {
    return {
      status: 'ok',
      timeStamp: new Date().toISOString(),
    };
  }
}
