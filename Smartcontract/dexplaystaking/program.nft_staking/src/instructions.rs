#[derive(Accounts)]
#[instruction(bump: u8)]
pub struct InitializeNftStake<'info> {
    #[account(
        init,
        payer = owner,
        seeds = [b"stake", nft_mint.key().as_ref()],
        bump,
        space = 8 + 32 + 32 + 8
    )]
    pub stake_data: Account<'info, StakeData>,
    pub nft_mint: Account<'info, Mint>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct StakeTokens<'info> {
    #[account(mut)]
    pub stake_data: Account<'info, StakeData>,
    #[account(mut)]
    pub user_token_account: Account<'info, TokenAccount>,
    #[account(
        mut,
        seeds = [b"vault", stake_data.nft_mint.as_ref()],
        bump
    )]
    pub vault_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub owner: Signer<'info>,
}
