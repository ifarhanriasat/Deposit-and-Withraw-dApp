import { Controller, Post, Body } from '@nestjs/common';
import { WithdrawService } from './withdraw.service';
import { ethers } from 'ethers';

@Controller('withdraw')
export class WithdrawController {
  constructor(private readonly withdrawService: WithdrawService) {}

  @Post()
  async withdraw(@Body('amount') amount: string, @Body('receiver') receiver: string) {
    const amountInWei = ethers.utils.parseUnits(amount, 18); // Adjust for USDT decimals if necessary
    return this.withdrawService.withdraw(amountInWei, receiver);
  }
}