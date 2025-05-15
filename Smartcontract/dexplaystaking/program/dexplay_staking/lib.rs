use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Token, Mint, Transfer};

declare_id!("oQPnhXAbLbMuKHESaGrbXT17CyvWCpLyERSJA9HCYd7");

#[program]
pub mod dexplay_staking {
    use super::*;

    pub fn initialize_pool(ctx: Context<InitializePool>) -> Result<()> {
        Ok(())
    }

    pub fn stake(ctx: Context<Stake>, amount: u64) -> Result<()> {
        let stake_info = &mut ctx.accounts.stake_info;
        stake_info.owner = ctx.accounts.user.key();
        stake_info.token_mint = ctx.accounts.stake_token.mint;
        stake_info.amount += amount;

        let cpi_accounts = Transfer {
            from: ctx.accounts.stake_token.to_account_info(),
            to: ctx.accounts.vault_token.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }

    pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        let stake_info = &mut ctx.accounts.stake_info;
        let amount = stake_info.amount;
        require!(amount > 0, CustomError::NothingStaked);

        stake_info.amount = 0;

        let seeds = &[b"vault".as_ref(), stake_info.token_mint.as_ref(), &[ctx.accounts.vault_bump]];
        let signer = &[&seeds[..]];

        let cpi_accounts = Transfer {
            from: ctx.accounts.vault_token.to_account_info(),
            to: ctx.accounts.user_token.to_account_info(),
            authority: ctx.accounts.vault.to_account_info(),
        };
        let cpi_ctx = CpiContext::new_with_signer(ctx.accounts.token_program.to_account_info(), cpi_accounts, signer);
        token::transfer(cpi_ctx, amount)?;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializePool {}

#[derive(Accounts)]
pub struct Stake<'info> {
    #[account(init_if_needed, payer = user, space = 8 + 32 + 32 + 8, seeds = [b"stake", user.key().as_ref(), stake_token.mint.as_ref()], bump)]
    pub stake_info: Account<'info, StakeInfo>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub stake_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"vault", stake_token.mint.as_ref()],
        bump,
    )]
    pub vault_token: Account<'info, TokenAccount>,

    /// CHECK: PDA
    #[account(
        seeds = [b"vault", stake_token.mint.as_ref()],
        bump,
    )]
    pub vault: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut, has_one = owner)]
    pub stake_info: Account<'info, StakeInfo>,

    #[account(mut)]
    pub user: Signer<'info>,

    #[account(mut)]
    pub user_token: Account<'info, TokenAccount>,

    #[account(
        mut,
        seeds = [b"vault", stake_info.token_mint.as_ref()],
        bump,
    )]
    pub vault_token: Account<'info, TokenAccount>,

    /// CHECK: PDA
    #[account(
        seeds = [b"vault", stake_info.token_mint.as_ref()],
        bump,
    )]
    pub vault: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
}

#[account]
pub struct StakeInfo {
    pub owner: Pubkey,
    pub token_mint: Pubkey,
    pub amount: u64,
}

#[error_code]
pub enum CustomError {
    #[msg("Nothing staked to withdraw.")]
    NothingStaked,
}
