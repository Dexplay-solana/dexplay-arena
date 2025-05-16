use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7");

#[program]
pub mod nft_staking {
    use super::*;

    pub fn initialize_nft_stake(
        ctx: Context<InitializeNftStake>,
        _bump: u8,
    ) -> Result<()> {
        let stake = &mut ctx.accounts.stake_data;
        stake.nft_mint = ctx.accounts.nft_mint.key();
        stake.owner = ctx.accounts.owner.key();
        stake.staked_amount = 0;
        Ok(())
    }

    pub fn stake_tokens(
        ctx: Context<StakeTokens>,
        amount: u64,
    ) -> Result<()> {
        let stake_data = &mut ctx.accounts.stake_data;

        // Transfer tokens from user to vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.user_token_account.to_account_info(),
                    to: ctx.accounts.vault_account.to_account_info(),
                    authority: ctx.accounts.owner.to_account_info(),
                },
            ),
            amount,
        )?;

        stake_data.staked_amount += amount;
        Ok(())
    }

    pub fn unstake_tokens(
        ctx: Context<StakeTokens>,
        amount: u64,
    ) -> Result<()> {
        let stake_data = &mut ctx.accounts.stake_data;

        require!(
            stake_data.staked_amount >= amount,
            StakingError::InsufficientStakedAmount
        );

        // Transfer tokens back to user
        let seeds = &[
            b"vault",
            stake_data.nft_mint.as_ref(),
            &[ctx.bumps.get("vault_account").unwrap().clone()],
        ];
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.vault_account.to_account_info(),
                    to: ctx.accounts.user_token_account.to_account_info(),
                    authority: ctx.accounts.vault_account.to_account_info(),
                },
                &[&seeds[..]],
            ),
            amount,
        )?;

        stake_data.staked_amount -= amount;
        Ok(())
    }
}
