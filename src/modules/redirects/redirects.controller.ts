/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Redirect, Res } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateShortUrlDto } from './createShortUrl.dto';

@Controller()
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) { }

  @Get(":url_shortened")
  @Redirect("https://nestjs.com")
  async redirectToUrl(@Param() params: any, @Res() res): Promise<string> {
    return res.redirect(await this.redirectsService.getOriginalUrl(params.url_shortened))
  }

  @Post("short_url")
  saveShortUrl(@Body() createShortUrlDto: CreateShortUrlDto): string {
    this.redirectsService.createShortUrl(createShortUrlDto.url)

    return "success!"
  }
}
