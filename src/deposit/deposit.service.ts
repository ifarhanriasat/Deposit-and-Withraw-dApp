import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractAbi from '../../contractABIs.json'; 


@Injectable()
export class DepositService implements OnModuleInit {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;

  // contract address
  private readonly contractAddress = process.env.CONTRACT_ADDRESS;
  
  

  constructor() {
    // Connect to Binance Smart Chain mainnet or testnet
    this.provider = new ethers.providers.WebSocketProvider(process.env.RPC_URL);
    this.contract = new ethers.Contract(this.contractAddress, contractAbi, this.provider);
  }

  async onModuleInit() {
    console.log('Listening for events...');

    // Listen for the 'DepositMade' event and handle it
    this.contract.on('LuckyHandDeposit', (from, amount, uniqueId, event) => {
      console.log(`Deposit received from: ${from}`);
      console.log(`Amount: ${ethers.utils.formatEther(amount)}`);
      console.log(`Unique ID: ${uniqueId}`);
      console.log(`Transaction Hash: ${event.transactionHash}`);
    });

    // // Listen for the 'DepositMade' event and handle it
    this.contract.on('LuckyHandWithdrawal', (to, amount, uniqueId, event) => {
      console.log(`Withdraw to: ${to}`);
      console.log(`Amount: ${ethers.utils.formatEther(amount)}`);
      console.log(`Unique ID: ${uniqueId}`);
      console.log(`Transaction Hash: ${event.transactionHash}`);
    });
  }
}
