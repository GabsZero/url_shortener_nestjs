/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RedirectsController } from './redirects/redirects.controller';
import { RedirectsService } from './redirects/redirects.service';

@Module({
  imports: [],
  controllers: [RedirectsController],
  providers: [RedirectsService],
})
export class ModulesModule { }
