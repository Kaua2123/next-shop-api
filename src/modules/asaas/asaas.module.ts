import { Module } from '@nestjs/common';
import { AsaasService } from './asaas.service';
import { AsaasController } from './asaas.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AsaasController],
  providers: [AsaasService],
})
export class AsaasModule {}
