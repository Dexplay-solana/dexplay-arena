#[account]
pub struct StakeData {
    pub owner: Pubkey,        // NFT owner
    pub nft_mint: Pubkey,     // NFT being staked on
    pub staked_amount: u64,   // Total tokens staked on this NFT
}
