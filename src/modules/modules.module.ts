/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RedirectsController } from './redirects/redirects.controller';
import { RedirectsService } from './redirects/redirects.service';
import { PrismaService } from 'src/infrastructure/repositories/prisma.service';

@Module({
  imports: [],
  controllers: [RedirectsController],
  providers: [RedirectsService, PrismaService],
})
export class ModulesModule { }
