import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/repositories/prisma.service';
import { DateTime, Duration } from "luxon";
import { CreateCustomShortUrlDto } from './createCustomShortUrl';

@Injectable()
export class RedirectsService {
  shortUrlLength: number = 7

  constructor(private prisma: PrismaService) { }

  async getOriginalUrl(shortened_url: string): Promise<string> {
    const redirect = await this.prisma.redirects.findFirst({
      where: {
        shortened_url: shortened_url
      }
    })

    console.log(redirect.original_url)
    if (redirect) return redirect.original_url

    return "http://mail.google.com"
  }

  async createShortUrl(url: string): Promise<string> {
    let shortened_url = this.createRandomUrl(this.shortUrlLength)
    let exist: boolean = true

    const urlExists = await this.prisma.redirects.count({
      where: {
        original_url: url
      }
    }) > 0

    if (urlExists) throw new BadRequestException("Url already exists")

    while (exist) {
      shortened_url = this.createRandomUrl(this.shortUrlLength)
      exist = await this.prisma.redirects.count({
        where: {
          shortened_url: shortened_url
        },
      }) > 0
    }



    const expire_at = DateTime.local().plus(Duration.fromObject({ minutes: 30 }))
    await this.prisma.redirects.create({
      data: {
        original_url: url,
        shortened_url: shortened_url,
        redirects_count: 0,
        expire_at: expire_at
      }
    })

    return shortened_url
  }

  async createCustomShortUrl(createCustomUrlDto: CreateCustomShortUrlDto): Promise<string> {
    const urlExists = await this.prisma.redirects.count({
      where: {
        shortened_url: createCustomUrlDto.short
      }
    }) > 0

    if (urlExists) throw new BadRequestException("Short is already in use")

    const expire_at = DateTime.local().plus(Duration.fromObject({ days: 7 }))

    await this.prisma.redirects.create({
      data: {
        original_url: createCustomUrlDto.url,
        shortened_url: createCustomUrlDto.short,
        redirects_count: 0,
        expire_at: expire_at
      }
    })

    return createCustomUrlDto.short
  }

  createRandomUrl(length: number) {
    let randomUrl = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      randomUrl += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return randomUrl;
  }
}
