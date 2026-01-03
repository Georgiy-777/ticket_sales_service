import { ApiProperty } from '@nestjs/swagger';

export class HealthResponse {
  @ApiProperty({
    example: 'ok',
  })
  public status: string;
  @ApiProperty({
    example: '2026-01-03T00:40:14.888Z',
  })
  public timestamp: string;
}
