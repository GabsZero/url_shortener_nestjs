/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateShortUrlDto } from './createShortUrl.dto';

@Controller()
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) { }

  @Get(":url_shortened")
  redirectToUrl(@Param() params: any): string {
    return params.url_shortened;
  }

  @Post("short_url")
  saveShortUrl(@Body() createShortUrlDto: CreateShortUrlDto): string {
    this.redirectsService.createShortUrl(createShortUrlDto.url)

    return "success!"
  }
}
