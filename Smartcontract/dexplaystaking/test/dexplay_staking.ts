import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { DexplayStaking } from "../target/types/dexplay_staking";
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { assert } from "chai";

describe("dexplay_staking", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.DexplayStaking as Program<DexplayStaking>;

  let user = provider.wallet;
  let mint = null;
  let userTokenAccount = null;
  let vaultTokenAccount = null;
  let stakeInfo = null;
  let vaultPda = null;
  let vaultBump = null;

  it("Initialize stake test environment", async () => {
    // 1. Create a mint for fake game token
    mint = await createMint(
      provider.connection,
      user.payer,
      user.publicKey,
      null,
      6
    );

    // 2. Create associated token accounts for user
    userTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      user.payer,
      mint,
      user.publicKey
    );

    // 3. Mint tokens to user
    await mintTo(
      provider.connection,
      user.payer,
      mint,
      userTokenAccount.address,
      user.publicKey,
      1_000_000
    );

    // 4. Derive vault PDA
    [vaultPda, vaultBump] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("vault"), mint.toBuffer()],
      program.programId
    );

    // 5. Derive stake info account PDA
    const [stakeInfoPda] = await anchor.web3.PublicKey.findProgramAddress(
      [Buffer.from("stake"), user.publicKey.toBuffer(), mint.toBuffer()],
      program.programId
    );
    stakeInfo = stakeInfoPda;

    // 6. Airdrop some SOL
    const sig = await provider.connection.requestAirdrop(user.publicKey, 1e9);
    await provider.connection.confirmTransaction(sig);
  });

  it("Stake tokens", async () => {
    vaultTokenAccount = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      user.payer,
      mint,
      vaultPda,
      true
    );

    await program.methods
      .stake(new anchor.BN(500_000))
      .accounts({
        stakeInfo,
        user: user.publicKey,
        stakeToken: userTokenAccount.address,
        vaultToken: vaultTokenAccount.address,
        vault: vaultPda,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
        rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      })
      .signers([])
      .rpc();

    const acc = await program.account.stakeInfo.fetch(stakeInfo);
    assert.equal(acc.amount.toString(), "500000");
    assert.equal(acc.owner.toBase58(), user.publicKey.toBase58());
  });

  it("Unstake tokens", async () => {
    const userTokenAgain = await getOrCreateAssociatedTokenAccount(
      provider.connection,
      user.payer,
      mint,
      user.publicKey
    );

    await program.methods
      .unstake()
      .accounts({
        stakeInfo,
        user: user.publicKey,
        userToken: userTokenAgain.address,
        vaultToken: vaultTokenAccount.address,
        vault: vaultPda,
        tokenProgram: TOKEN_PROGRAM_ID,
      })
      .rpc();

    const acc = await program.account.stakeInfo.fetch(stakeInfo);
    assert.equal(acc.amount.toString(), "0");
  });
});
