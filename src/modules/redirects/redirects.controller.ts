/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';
import { RedirectsService } from './redirects.service';

@Controller(":url_shortened")
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) { }

  @Get()
  getHello(): string {
    return "maoe";
  }
}
