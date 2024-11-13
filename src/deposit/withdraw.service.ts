import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as contractAbi from '../../contractABIs.json'; // ABI of the contract

@Injectable()
export class WithdrawService {
  private provider: ethers.providers.JsonRpcProvider;
  private contract: ethers.Contract;
  private wallet: ethers.Wallet;

  constructor() {
    // Set up the provider (e.g., Infura, Alchemy, or local node)
    this.provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);

    // Set up the wallet (private key should be securely stored)
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY, this.provider);

    // Initialize the contract
    this.contract = new ethers.Contract(
      process.env.CONTRACT_ADDRESS,
      contractAbi,
      this.wallet,
    );
  }

  async withdraw(amount: ethers.BigNumber, receiver: string): Promise<ethers.providers.TransactionResponse> {
    try {
      // Call the withdraw function from the contract
      const tx = await this.contract.withdraw(amount, receiver);

      // Wait for the transaction to be mined (optional)
      await tx.wait();

      console.log('Withdrawal successful:', tx.hash);
      return tx;
    } catch (error) {
      console.error('Withdrawal failed:', error);
      throw new Error('Failed to withdraw funds');
    }
  }
}
