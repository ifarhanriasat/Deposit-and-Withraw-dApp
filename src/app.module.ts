import { Module } from '@nestjs/common';
import { DepositService } from './deposit/deposit.service';
import { WithdrawService } from './deposit/withdraw.service';
import { WithdrawController } from './deposit/withdraw.controller';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })],
  providers: [DepositService, WithdrawService],
  controllers: [WithdrawController],

})
export class AppModule {}
