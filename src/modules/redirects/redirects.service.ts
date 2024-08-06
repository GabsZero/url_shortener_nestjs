import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/repositories/prisma.service';

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

    return redirect.original_url
  }

  async createShortUrl(url: string) {
    let shortened_url = this.createRandomUrl(this.shortUrlLength)
    let exist: boolean = true
    while (exist) {
      shortened_url = this.createRandomUrl(this.shortUrlLength)
      exist = await this.prisma.redirects.count({
        where: {
          shortened_url: shortened_url
        }
      }) > 0
    }

    await this.prisma.redirects.create({
      data: {
        original_url: url,
        shortened_url: shortened_url,
        redirects_count: 0

      }
    })
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
