import { Connection, PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, web3, BN } from '@coral-xyz/anchor';
import idl from '../idl/hoop_protocol.json'; // Place your IDL here after building the program

// TODO: Replace with your actual deployed Program ID from Solana Playground or anchor deploy
const PROGRAM_ID = new PublicKey("HoopProtocol1111111111111111111111111111111");

export const getProgram = (connection: Connection, wallet: any) => {
  const provider = new AnchorProvider(connection, wallet, AnchorProvider.defaultOptions());
  return new Program(idl as any, PROGRAM_ID, provider);
};

export const registerValidator = async (program: Program) => {
  // Call the register_validator instruction
  const tx = await program.methods
    .registerValidator()
    .rpc();
  return tx;
};

export const createVerificationTask = async (
  program: Program,
  taskId: string,
  description: string,
  usdcFee: number,
  requiredReputation: number
) => {
  const tx = await program.methods
    .createVerificationTask(taskId, description, new BN(usdcFee), new BN(requiredReputation))
    .rpc();
  return tx;
};

// Add more helper functions for claim_task, submit_task_attestation, etc. as needed
