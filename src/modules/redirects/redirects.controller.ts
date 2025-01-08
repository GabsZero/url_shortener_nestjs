/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { RedirectsService } from './redirects.service';
import { CreateShortUrlDto } from './createShortUrl.dto';
import { Response } from 'express';

@Controller()
export class RedirectsController {
  constructor(private readonly redirectsService: RedirectsService) { }

  @Get(":url_shortened")
  async redirectToUrl(@Param() params: any, @Res() res: Response): Promise<void> {

    const url = await this.redirectsService.getOriginalUrl(params.url_shortened)
    res.redirect(url)
  }

  @Post("short_url")
  async saveShortUrl(@Body() createShortUrlDto: CreateShortUrlDto): Promise<any> {
    const shortUrl = await this.redirectsService.createShortUrl(createShortUrlDto.url)
    return {
      message: "Url shortened successfully",
      short_url: shortUrl
    }
  }
}
