// src/lib/miniAppsData.ts

export interface MiniApp {
  id: string; 
  name: string;
  description: string;
  iconUrl: string;
  url: string; 
  tags: string[];
  chain: 'Base' | 'Optimism' | 'Degen' | 'Arbitrum' | 'Multi-chain' | 'Other'; 
}

export const miniAppsData: MiniApp[] = [

  // =======================================================================
  // == BASE CHAIN APPS
  // =======================================================================

  {
    id:          'aerodrome-app',
    name:        'Aerodrome',
    description: 'A next-gen AMM serving as Base\'s central liquidity hub.',
    iconUrl:     '/images/aerodrome-logo.png',
    url:         'https://aerodrome.finance/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Base'
  },

  {
    id:          'base-paint-app',
    name:        'Base Paint',
    description: 'A collaborative on-chain pixel art canvas on the Base network.',
    iconUrl:     '/images/base-paint-logo.jpg',
    url:         'https://basepaint.xyz/',
    tags:        ['Art', 'On-chain'],
    chain:       'Base'
  },

  {
    id:          'basescan-app',
    name:        'Basescan',
    description: 'The block explorer for the Base network.',
    iconUrl:     '/images/basescan-logo.png',
    url:         'https://basescan.org/',
    tags:        ['Tools', 'Explorer'],
    chain:       'Base'
  },

  {
    id:          'bountycaster-app',
    name:        'Bountycaster',
    description: 'A platform for creating and discovering bounties on Farcaster.',
    iconUrl:     '/images/bountycaster-logo.jpg',
    url:         'https://www.bountycaster.xyz/',
    tags:        ['Bounties', 'Gigs'],
    chain:       'Base'
  },

  {
    id:          'buidl-app',
    name:        'Buidl',
    description: 'Invest in your favorite Farcaster builders and earn rewards.',
    iconUrl:     '/images/buidl-logo.jpeg',
    url:         'https://buidl.so',
    tags:        ['SocialFi', 'Investing'],
    chain:       'Base'
  },

  {
    id:          'extra-finance-app',
    name:        'Extra Finance',
    description: 'Leveraged yield farming and lending protocol on Optimism & Base.',
    iconUrl:     '/images/extra-finance-logo.png',
    url:         'https://extra.finance/',
    tags:        ['DeFi', 'Yield Farming'],
    chain:       'Base'
  },

  {
    id:          'friend-tech-app',
    name:        'friend.tech',
    description: 'A decentralized social marketplace on the Base network.',
    iconUrl:     '/images/friendtech-logo.png',
    url:         'https://www.friend.tech/',
    tags:        ['SocialFi', 'Social'],
    chain:       'Base'
  },

  {
    id:          'moonwell-app',
    name:        'Moonwell',
    description: 'An open lending and borrowing DeFi protocol on Base.',
    iconUrl:     '/images/moonwell-logo.png',
    url:         'https://moonwell.fi/',
    tags:        ['DeFi', 'Lending'],
    chain:       'Base'
  },

  {
    id:          'parallel-tcg-app',
    name:        'Parallel TCG',
    description: 'A sci-fi trading card game with NFTs on Base.',
    iconUrl:     '/images/parallel-logo.png',
    url:         'https://parallel.life/',
    tags:        ['GameFi', 'NFTs'],
    chain:       'Base'
  },

  {
    id:          'perl-app',
    name:        'Perl',
    description: 'A peer-to-peer prediction market on Farcaster.',
    iconUrl:     '/images/perl-logo.png',
    url:         'https://perl.xyz/',
    tags:        ['Predictions', 'SocialFi'],
    chain:       'Base'
  },

  {
    id:          'poidh-app',
    name:        'poidh',
    description: "poidh: \"pics or it didn't happen\". Onchain social media.",
    iconUrl:     '/152807131.png',
    url:         'https://poidh.xyz/',
    tags:        ['Social', 'On-chain'],
    chain:       'Base'
  },

  {
    id:          'seamless-protocol-app',
    name:        'Seamless',
    description: 'A decentralized, non-custodial liquidity market on Base.',
    iconUrl:     '/images/seamless-logo.png',
    url:         'https://www.seamlessprotocol.com/',
    tags:        ['DeFi', 'Lending'],
    chain:       'Base'
  },

  {
    id:          'seconds-money-app',
    name:        'seconds.money',
    description: 'The social wallet for onchain creators and communities.',
    iconUrl:     '/images/seconds-money-logo.png',
    url:         'https://seconds.money/',
    tags:        ['Wallet', 'Creator Tools'],
    chain:       'Base'
  },

  {
    id:          'unlonely-app',
    name:        'Unlonely',
    description: 'A Web3 streaming platform with interactive and token-gated features.',
    iconUrl:     '/images/unlonely-logo.png',
    url:         'https://unlonely.app/',
    tags:        ['Streaming', 'Video'],
    chain:       'Base'
  },

  // =======================================================================
  // == OPTIMISM CHAIN APPS
  // =======================================================================

  {
    id:          'kwenta-app',
    name:        'Kwenta',
    description: 'A decentralized derivatives trading platform powered by Synthetix.',
    iconUrl:     '/images/kwenta-logo.png',
    url:         'https://kwenta.io/',
    tags:        ['DeFi', 'Perpetuals'],
    chain:       'Optimism'
  },

  {
    id:          'lyra-finance-app',
    name:        'Lyra Finance',
    description: 'A decentralized options trading protocol on Optimism.',
    iconUrl:     '/images/lyra-logo.png',
    url:         'https://www.lyra.finance/',
    tags:        ['DeFi', 'Options'],
    chain:       'Optimism'
  },

  {
    id:          'opepen-app',
    name:        'Opepen',
    description: 'An open-edition art experiment by Jack Butcher, evolving on-chain.',
    iconUrl:     '/images/opepen-logo.jpg',
    url:         'https://opepen.art/',
    tags:        ['Art', 'NFTs', 'Community'],
    chain:       'Optimism'
  },

  {
    id:          'opscan-app',
    name:        'Optimism Scan',
    description: 'The block explorer for the Optimism network.',
    iconUrl:     '/images/optimism-logo.png',
    url:         'https://optimistic.etherscan.io/',
    tags:        ['Tools', 'Explorer'],
    chain:       'Optimism'
  },

  {
    id:          'pooltogether-app',
    name:        'PoolTogether',
    description: 'A crypto-powered savings protocol based on no-loss prizes.',
    iconUrl:     '/images/pooltogether-logo.png',
    url:         'https://pooltogether.com/',
    tags:        ['DeFi', 'Savings', 'GameFi'],
    chain:       'Optimism'
  },

  {
    id:          'quix-app',
    name:        'Quix',
    description: 'The largest NFT marketplace on the Optimism network.',
    iconUrl:     '/images/quix-logo.png',
    url:         'https://quix.io/',
    tags:        ['NFTs', 'Marketplace'],
    chain:       'Optimism'
  },

  {
    id:          'synthetix-app',
    name:        'Synthetix',
    description: 'A derivatives liquidity protocol providing backend for DeFi.',
    iconUrl:     '/images/synthetix-logo.png',
    url:         'https://synthetix.io/',
    tags:        ['DeFi', 'Derivatives'],
    chain:       'Optimism'
  },

  {
    id:          'velodrome-app',
    name:        'Velodrome',
    description: 'A leading trading and liquidity marketplace on the Optimism network.',
    iconUrl:     '/images/velodrome-logo.png',
    url:         'https://velodrome.finance/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Optimism'
  },

  {
    id:          'warpcast-app',
    name:        'Warpcast',
    description: 'The primary client and application for the Farcaster protocol.',
    iconUrl:     '/images/warpcast-logo.png',
    url:         'https://warpcast.com/',
    tags:        ['Social', 'Farcaster'],
    chain:       'Optimism'
  },

  {
    id:          'yup-app',
    name:        'Yup',
    description: 'A social consensus protocol that rewards users for curating content.',
    iconUrl:     '/images/yup-logo.png',
    url:         'https://yup.io/',
    tags:        ['Social', 'Curation'],
    chain:       'Optimism'
  },

  // =======================================================================
  // == DEGEN CHAIN APPS
  // =======================================================================

  {
    id:          'bracket-game-app',
    name:        'Bracket Game',
    description: 'A tournament-style prediction game on Degen Chain.',
    iconUrl:     '/images/bracket-logo.png',
    url:         'https://bracket.game/',
    tags:        ['GameFi', 'Betting'],
    chain:       'Degen'
  },

  {
    id:          'degen-app',
    name:        'Degen',
    description: 'A community token for the Farcaster ecosystem, often used for tipping.',
    iconUrl:     '/images/degen-logo.png',
    url:         'https://degen.tips/',
    tags:        ['Community', 'Token', 'SocialFi'],
    chain:       'Degen'
  },

  {
    id:          'degen-bridge-app',
    name:        'Degen Bridge',
    description: 'Official bridge to move assets to and from Degen Chain.',
    iconUrl:     '/images/degen-logo.png',
    url:         'https://bridge.degen.tips/',
    tags:        ['Bridge', 'Tools'],
    chain:       'Degen'
  },

  {
    id:          'degenscan-app',
    name:        'DegenScan',
    description: 'The official block explorer for the Degen Chain.',
    iconUrl:     '/images/degenscan-logo.png',
    url:         'https://explorer.degen.tips/',
    tags:        ['Tools', 'Explorer'],
    chain:       'Degen'
  },

  {
    id:          'degenswap-app',
    name:        'DegenSwap',
    description: 'The primary decentralized exchange on the Degen L3 chain.',
    iconUrl:     '/images/degenswap-logo.png',
    url:         'https://www.degenswap.com/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Degen'
  },

  {
    id:          'drakula-app',
    name:        'Drakula',
    description: 'A social media app for short-form videos on the Degen chain.',
    iconUrl:     '/images/drakula-logo.png',
    url:         'https://drakula.app/',
    tags:        ['Social', 'Video'],
    chain:       'Degen'
  },

  {
    id:          'ham-app',
    name:        'Ham',
    description: 'A memecoin and community project on Degen and Base.',
    iconUrl:     '/images/ham-logo.png',
    url:         'https://ham.fun/',
    tags:        ['Meme', 'Community'],
    chain:       'Degen'
  },

  {
    id:          'purrpoker-app',
    name:        'Purr.poker',
    description: 'An on-chain poker game built on the Degen chain.',
    iconUrl:     '/images/purrpoker-logo.png',
    url:         'https://purr.poker/',
    tags:        ['GameFi', 'Gambling'],
    chain:       'Degen'
  },

  {
    id:          'towns-app',
    name:        'Towns',
    description: 'A group chat protocol and app, live on Degen Chain.',
    iconUrl:     '/images/towns-logo.png',
    url:         'https://www.towns.com/',
    tags:        ['Social', 'Chat'],
    chain:       'Degen'
  },

  {
    id:          'zora-degen-app',
    name:        'Zora on Degen',
    description: 'Mint and collect NFTs directly on the Degen L3.',
    iconUrl:     '/images/zora-logo.png',
    url:         'https://zora.co/chain/degen',
    tags:        ['NFTs', 'Art'],
    chain:       'Degen'
  },
  
  // =======================================================================
  // == ARBITRUM CHAIN APPS
  // =======================================================================

  {
    id:          'arbiscan-app',
    name:        'Arbiscan',
    description: 'The block explorer for the Arbitrum One network.',
    iconUrl:     '/images/arbiscan-logo.png',
    url:         'https://arbiscan.io/',
    tags:        ['Tools', 'Explorer'],
    chain:       'Arbitrum'
  },

  {
    id:          'camelot-dex-app',
    name:        'Camelot',
    description: 'A community-driven DEX with custom features, native to Arbitrum.',
    iconUrl:     '/images/camelot-logo.png',
    url:         'https://camelot.exchange/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Arbitrum'
  },

  {
    id:          'dopex-app',
    name:        'Dopex',
    description: 'A decentralized options protocol built on Arbitrum.',
    iconUrl:     '/images/dopex-logo.png',
    url:         'https://www.dopex.io/',
    tags:        ['DeFi', 'Options'],
    chain:       'Arbitrum'
  },

  {
    id:          'gains-network-app',
    name:        'Gains Network',
    description: 'A decentralized leveraged trading platform on Arbitrum.',
    iconUrl:     '/images/gains-network-logo.png',
    url:         'https://gains.trade/',
    tags:        ['DeFi', 'Perpetuals'],
    chain:       'Arbitrum'
  },

  {
    id:          'gmx-app',
    name:        'GMX',
    description: 'A decentralized perpetual exchange on Arbitrum and Avalanche.',
    iconUrl:     '/images/gmx-logo.png',
    url:         'https://gmx.io/',
    tags:        ['DeFi', 'DEX', 'Perpetuals'],
    chain:       'Arbitrum'
  },

  {
    id:          'jones-dao-app',
    name:        'Jones DAO',
    description: 'A yield, strategy, and liquidity protocol for options on Arbitrum.',
    iconUrl:     '/images/jones-dao-logo.png',
    url:         'https://www.jonesdao.io/',
    tags:        ['DeFi', 'Options', 'Yield'],
    chain:       'Arbitrum'
  },

  {
    id:          'pendle-app',
    name:        'Pendle',
    description: 'A protocol that enables the trading of future yield.',
    iconUrl:     '/images/pendle-logo.png',
    url:         'https://www.pendle.finance/',
    tags:        ['DeFi', 'Yield'],
    chain:       'Arbitrum'
  },

  {
    id:          'radiant-capital-app',
    name:        'Radiant Capital',
    description: 'An omnichain money market for lending and borrowing.',
    iconUrl:     '/images/radiant-logo.png',
    url:         'https://radiant.capital/',
    tags:        ['DeFi', 'Lending', 'Bridge'],
    chain:       'Arbitrum'
  },

  {
    id:          'sushi-app',
    name:        'Sushi',
    description: 'A community-built, open-source ecosystem of all things DeFi.',
    iconUrl:     '/images/sushi-logo.png',
    url:         'https://www.sushi.com/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Arbitrum'
  },
  
  {
    id:          'treasure-dao-app',
    name:        'Treasure DAO',
    description: 'A decentralized video game console and ecosystem on Arbitrum.',
    iconUrl:     '/images/treasure-logo.png',
    url:         'https://treasure.lol/',
    tags:        ['GameFi', 'DAO', 'NFTs'],
    chain:       'Arbitrum'
  },
  
  // =======================================================================
  // == MULTI-CHAIN APPS
  // =======================================================================

  {
    id:          'aave-app',
    name:        'Aave',
    description: 'A decentralized liquidity protocol for lending and borrowing.',
    iconUrl:     '/images/aave-logo.png',
    url:         'https://aave.com/',
    tags:        ['DeFi', 'Lending'],
    chain:       'Multi-chain'
  },

  {
    id:          'chainlink-app',
    name:        'Chainlink',
    description: 'A decentralized oracle network that powers hybrid smart contracts.',
    iconUrl:     '/images/chainlink-logo.png',
    url:         'https://chain.link/',
    tags:        ['Infrastructure', 'Oracles'],
    chain:       'Multi-chain'
  },

  {
    id:          'coingecko-app',
    name:        'CoinGecko',
    description: 'A comprehensive cryptocurrency data aggregator.',
    iconUrl:     '/images/coingecko-logo.png',
    url:         'https://www.coingecko.com/',
    tags:        ['Tools', 'Analytics', 'Data'],
    chain:       'Multi-chain'
  },

  {
    id:          'coinmarketcap-app',
    name:        'CoinMarketCap',
    description: 'The most referenced price-tracking website for cryptoassets.',
    iconUrl:     '/images/coinmarketcap-logo.png',
    url:         'https://coinmarketcap.com/',
    tags:        ['Tools', 'Analytics', 'Data'],
    chain:       'Multi-chain'
  },

  {
    id:          'debridge-app',
    name:        'deBridge',
    description: 'A cross-chain interoperability and liquidity transfer protocol.',
    iconUrl:     '/images/debridge-logo.png',
    url:         'https://debridge.finance/',
    tags:        ['Infrastructure', 'Bridge', 'DeFi'],
    chain:       'Multi-chain'
  },

  {
    id:          'defillama-app',
    name:        'DeFiLlama',
    description: 'A dashboard tracking Total Value Locked (TVL) across DeFi protocols.',
    iconUrl:     '/images/defillama-logo.png',
    url:         'https://defillama.com/',
    tags:        ['Tools', 'Analytics', 'DeFi'],
    chain:       'Multi-chain'
  },

  {
    id:          'dune-app',
    name:        'Dune',
    description: 'A powerful platform for blockchain analytics by and for the community.',
    iconUrl:     '/images/dune-logo.png',
    url:         'https://dune.com/',
    tags:        ['Tools', 'Analytics'],
    chain:       'Multi-chain'
  },

  {
    id:          'galxe-app',
    name:        'Galxe',
    description: 'A Web3 credential data network for building digital identities.',
    iconUrl:     '/images/galxe-logo.png',
    url:         'https://galxe.com/',
    tags:        ['Identity', 'Community'],
    chain:       'Multi-chain'
  },

  {
    id:          'guild-xyz-app',
    name:        'Guild.xyz',
    description: 'A tool for automated membership management for Web3 communities.',
    iconUrl:     '/images/guild-logo.png',
    url:         'https://guild.xyz/',
    tags:        ['DAO', 'Community', 'Tools'],
    chain:       'Multi-chain'
  },

  {
    id:          'highlight-app',
    name:        'Highlight',
    description: 'A platform for creators to launch generative art and digital collectibles.',
    iconUrl:     '/images/highlight-logo.png',
    url:         'https://highlight.xyz/',
    tags:        ['Art', 'Creator Tools'],
    chain:       'Multi-chain'
  },

  {
    id:          'layerzero-app',
    name:        'LayerZero',
    description: 'An omnichain interoperability protocol for cross-chain messaging.',
    iconUrl:     '/images/layerzero-logo.png',
    url:         'https://layerzero.network/',
    tags:        ['Infrastructure', 'Interoperability'],
    chain:       'Multi-chain'
  },

  {
    id:          'metamask-app',
    name:        'MetaMask',
    description: 'A leading self-custody crypto wallet and gateway to blockchain apps.',
    iconUrl:     '/images/metamask-logo.png',
    url:         'https://metamask.io/',
    tags:        ['Wallet', 'Infrastructure'],
    chain:       'Multi-chain'
  },

  {
    id:          'opensea-app',
    name:        'OpenSea',
    description: 'The largest peer-to-peer marketplace for NFTs.',
    iconUrl:     '/images/opensea-logo.png',
    url:         'https://opensea.io/',
    tags:        ['NFTs', 'Marketplace'],
    chain:       'Multi-chain'
  },

  {
    id:          'paragraph-app',
    name:        'Paragraph',
    description: 'A web3-native newsletter and publishing platform.',
    iconUrl:     '/images/paragraph-logo.jpg',
    url:         'https://paragraph.xyz/',
    tags:        ['Publishing', 'Creator Tools'],
    chain:       'Multi-chain'
  },

  {
    id:          'partydao-app',
    name:        'PartyDAO',
    description: 'A protocol for pooling funds to collectively bid on NFTs.',
    iconUrl:     '/images/party-logo.png',
    url:         'https://www.party.app/',
    tags:        ['DAO', 'NFTs', 'Community'],
    chain:       'Multi-chain'
  },

  {
    id:          'revokecash-app',
    name:        'Revoke.cash',
    description: 'A tool to review and revoke your active token allowances for safety.',
    iconUrl:     '/images/revoke-logo.png',
    url:         'https://revoke.cash/',
    tags:        ['Tools', 'Security'],
    chain:       'Multi-chain'
  },

  {
    id:          'safe-app',
    name:        'Safe',
    description: 'A multi-sig smart contract wallet for securely managing assets.',
    iconUrl:     '/images/safe-logo.png',
    url:         'https://safe.global/',
    tags:        ['Wallet', 'Infrastructure', 'Security'],
    chain:       'Multi-chain'
  },

  {
    id:          'snapshot-app',
    name:        'Snapshot',
    description: 'A decentralized voting system for DAOs and token-based projects.',
    iconUrl:     '/images/snapshot-logo.png',
    url:         'https://snapshot.org/',
    tags:        ['DAO', 'Governance', 'Tools'],
    chain:       'Multi-chain'
  },

  {
    id:          'sound-xyz-app',
    name:        'Sound.xyz',
    description: 'A platform for collecting music as NFTs, directly supporting artists.',
    iconUrl:     '/images/sound-logo.png',
    url:         'https://www.sound.xyz/',
    tags:        ['Music', 'NFTs'],
    chain:       'Multi-chain'
  },

  {
    id:          'tally-app',
    name:        'Tally',
    description: 'A user-friendly interface for DAO governance and voting.',
    iconUrl:     '/images/tally-logo.png',
    url:         'https://www.tally.xyz/',
    tags:        ['DAO', 'Governance', 'Tools'],
    chain:       'Multi-chain'
  },

  {
    id:          'uniswap-app',
    name:        'Uniswap',
    description: 'A decentralized exchange (DEX) for swapping tokens.',
    iconUrl:     '/images/uniswap-logo.png',
    url:         'https://uniswap.org/',
    tags:        ['DeFi', 'DEX'],
    chain:       'Multi-chain'
  },

  {
    id:          'zora-app',
    name:        'Zora',
    description: 'A decentralized protocol to mint, share, and collect NFTs on-chain.',
    iconUrl:     '/images/zora-logo.png',
    url:         'https://zora.co',
    tags:        ['NFTs', 'Art', 'Protocol'],
    chain:       'Multi-chain'
  },

  // =======================================================================
  // == OTHER CHAINS / CATEGORIES (e.g., Blast, Mainnet)
  // =======================================================================

  {
    id:          'blur-io-app',
    name:        'Blur',
    description: 'An NFT marketplace for pro traders, focusing on speed and liquidity.',
    iconUrl:     '/images/blur-logo.png',
    url:         'https://blur.io/',
    tags:        ['NFTs', 'Marketplace'],
    chain:       'Other'
  },

  {
    id:          'charmverse-app',
    name:        'Charmverse',
    description: 'An all-in-one workspace for web3 communities and DAOs.',
    iconUrl:     '/images/charmverse-logo.png',
    url:         'https://charmverse.io/',
    tags:        ['DAO', 'Tools', 'Productivity'],
    chain:       'Other'
  },

  {
    id:          'curve-finance-app',
    name:        'Curve Finance',
    description: 'A decentralized exchange optimized for stablecoin trading.',
    iconUrl:     '/images/curve-logo.png',
    url:         'https://curve.fi/',
    tags:        ['DeFi', 'DEX', 'Stablecoin'],
    chain:       'Other'
  },

  {
    id:          'ens-app',
    name:        'ENS',
    description: 'Decentralized naming for wallets, websites, & more on Ethereum.',
    iconUrl:     '/images/ens-logo.png',
    url:         'https://ens.domains/',
    tags:        ['Identity', 'Infrastructure'],
    chain:       'Other'
  },

  {
    id:          'etherscan-app',
    name:        'Etherscan',
    description: 'The primary block explorer for the Ethereum Mainnet.',
    iconUrl:     '/images/etherscan-logo.png',
    url:         'https://etherscan.io/',
    tags:        ['Tools', 'Explorer'],
    chain:       'Other'
  },

  {
    id:          'fantasy-top-app',
    name:        'Fantasy Top',
    description: 'The crypto fantasy game for Crypto Twitter influencers on Blast.',
    iconUrl:     '/images/fantasy-top-logo.png',
    url:         'https://www.fantasy.top/',
    tags:        ['GameFi', 'Social'],
    chain:       'Other'
  },

  {
    id:          'lido-finance-app',
    name:        'Lido Finance',
    description: 'A liquid staking solution for ETH and other PoS assets.',
    iconUrl:     '/images/lido-logo.png',
    url:         'https://lido.fi/',
    tags:        ['DeFi', 'Staking'],
    chain:       'Other'
  },

  {
    id:          'makerdao-app',
    name:        'MakerDAO',
    description: 'A decentralized credit platform that supports the DAI stablecoin.',
    iconUrl:     '/images/makerdao-logo.png',
    url:         'https://makerdao.com/',
    tags:        ['DeFi', 'Stablecoin', 'DAO'],
    chain:       'Other'
  },

  {
    id:          'nounspace-app',
    name:        'Nounspace',
    description: 'A community client for Nouns DAO and its many forks.',
    iconUrl:     '/images/nounspace-logo.png',
    url:         'https://noun.space/',
    tags:        ['DAO', 'Community'],
    chain:       'Other'
  },

  {
    id:          'pudgy-penguins-app',
    name:        'Pudgy Penguins',
    description: 'A collection of 8,888 NFTs focused on brand building and community.',
    iconUrl:     '/images/pudgy-penguins-logo.png',
    url:         'https://www.pudgypenguins.com/',
    tags:        ['NFTs', 'Community'],
    chain:       'Other'
  },

];
