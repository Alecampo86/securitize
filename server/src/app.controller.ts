/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  async getHello(@Res() res: Response): Promise<void> {
    res.sendFile(join(process.cwd(), 'public', 'index.html'));
  }
}
