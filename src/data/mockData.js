/**
 * Dados mockados do projeto MOVIOCA
 * Extraídos do projeto HTML original
 */

// Dados de usuários/avatares
export const users = {
  currentUser: {
    id: 1,
    name: 'Jonathan',
    role: 'Admin',
    avatar: '/images/avatar/user-1.png',
    email: 'jonathan@movioca.com'
  },
  contacts: [
    { id: 1, name: 'Cameron Williamson', avatar: '/images/avatar/user-1.png' },
    { id: 2, name: 'Ralph Edwards', avatar: '/images/avatar/user-2.png' },
    { id: 3, name: 'Eleanor Pena', avatar: '/images/avatar/user-3.png' },
    { id: 4, name: 'Jane Cooper', avatar: '/images/avatar/user-4.png' },
    { id: 5, name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    { id: 6, name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
  ]
}

// Mensagens
export const messages = [
  {
    id: 1,
    userId: 1,
    name: 'Cameron Williamson',
    avatar: '/images/avatar/user-1.png',
    message: 'Hello?',
    time: '10:13 PM',
    unread: true
  },
  {
    id: 2,
    userId: 2,
    name: 'Ralph Edwards',
    avatar: '/images/avatar/user-2.png',
    message: 'Are you there? interested i this...',
    time: '10:13 PM',
    unread: true
  },
  {
    id: 3,
    userId: 3,
    name: 'Eleanor Pena',
    avatar: '/images/avatar/user-3.png',
    message: 'Interested in this loads?',
    time: '10:13 PM',
    unread: true
  },
  {
    id: 4,
    userId: 4,
    name: 'Jane Cooper',
    avatar: '/images/avatar/user-4.png',
    message: 'Okay...Do we have a deal?',
    time: '10:13 PM',
    unread: true
  }
]

// Notificações
export const notifications = [
  {
    id: 1,
    type: 'discount',
    icon: 'icon-setting-5',
    title: 'Discount available',
    description: 'Morbi sapien massa, ultricies at rhoncus at, ullamcorper nec diam',
    itemClass: 'item-1'
  },
  {
    id: 2,
    type: 'account',
    icon: 'icon-person',
    title: 'Account has been verified',
    description: 'Mauris libero ex, iaculis vitae rhoncus et',
    itemClass: 'item-2'
  },
  {
    id: 3,
    type: 'order',
    icon: 'icon-message-text1',
    title: 'Order shipped successfully',
    description: 'Integer aliquam eros nec sollicitudin sollicitudin',
    itemClass: 'item-3'
  },
  {
    id: 4,
    type: 'pending',
    icon: 'icon-sms-tracking',
    title: 'Order pending',
    orderId: 'ID 305830',
    description: 'Ultricies at rhoncus at ullamcorper',
    itemClass: 'item-4'
  }
]

// Criptomoedas
export const cryptoCoins = [
  {
    id: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    icon: '/images/item/coin-1.png',
    price: 34.57,
    change: '+4%',
    changePeriod: '30 days'
  },
  {
    id: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    icon: '/images/item/coin-2.png',
    price: 54.57,
    change: '+4%',
    changePeriod: '30 days'
  },
  {
    id: 3,
    name: 'Monero',
    symbol: 'XMR',
    icon: '/images/item/coin-3.png',
    price: 14.47,
    change: '+4%',
    changePeriod: '30 days'
  },
  {
    id: 4,
    name: 'Litecoin',
    symbol: 'LTC',
    icon: '/images/item/litecoin.svg',
    price: 34.57,
    change: '+4%',
    changePeriod: '30 days'
  },
  {
    id: 5,
    name: 'Dash Coin',
    symbol: 'DASH',
    icon: '/images/item/dashcoin.svg',
    price: 28.45,
    change: '+2.5%',
    changePeriod: '30 days'
  }
]

// Transações
export const transactions = [
  {
    id: '#124567899654',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Bitcoin', icon: '/images/item/coin-1.png' },
    amount: '$455.00',
    status: 'completed',
    checked: true
  },
  {
    id: '#124567899655',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Ethereum', icon: '/images/item/coin-2.png' },
    amount: '$455.00',
    status: 'completed',
    checked: false
  },
  {
    id: '#124567899656',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Monero', icon: '/images/item/coin-3.png' },
    amount: '$455.00',
    status: 'pending',
    checked: false
  },
  {
    id: '#124567899657',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Bitcoin', icon: '/images/item/coin-1.png' },
    amount: '$455.00',
    status: 'completed',
    checked: false
  },
  {
    id: '#124567899658',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Monero', icon: '/images/item/coin-3.png' },
    amount: '$455.00',
    status: 'canceled',
    checked: false
  },
  {
    id: '#124567899659',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Bitcoin', icon: '/images/item/coin-1.png' },
    amount: '$455.00',
    status: 'completed',
    checked: false
  },
  {
    id: '#124567899660',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Monero', icon: '/images/item/coin-3.png' },
    amount: '$455.00',
    status: 'pending',
    checked: true
  },
  {
    id: '#124567899661',
    date: 'January 24, 2022',
    time: '5.20 PM',
    from: { name: 'Marquezz', avatar: '/images/avatar/user-3.png' },
    to: { name: 'Jarinas Tom', avatar: '/images/avatar/user-4.png' },
    coin: { name: 'Ethereum', icon: '/images/item/coin-2.png' },
    amount: '$455.00',
    status: 'completed',
    checked: false
  }
]

// Dados de ordens de compra/venda
export const sellOrders = [
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
]

export const buyOrders = [
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
  { price: '98.36', amount: '0.25', total: '$147.00' },
]

// Dados de carteiras (wallets)
export const wallets = [
  {
    id: 1,
    type: 'bitcoin',
    name: 'Bitcoin Wallet',
    balance: '2.58462 BTC',
    balanceUsd: '$84,345.12',
    icon: '/images/item/coin-1.png',
    cardBg: 'bg-1'
  },
  {
    id: 2,
    type: 'ethereum',
    name: 'Ethereum Wallet',
    balance: '15.4821 ETH',
    balanceUsd: '$24,156.78',
    icon: '/images/item/coin-2.png',
    cardBg: 'bg-2'
  },
  {
    id: 3,
    type: 'litecoin',
    name: 'Litecoin Wallet',
    balance: '125.847 LTC',
    balanceUsd: '$12,584.32',
    icon: '/images/item/litecoin.svg',
    cardBg: 'bg-3'
  },
  {
    id: 4,
    type: 'monero',
    name: 'Monero Wallet',
    balance: '45.2584 XMR',
    balanceUsd: '$8,456.21',
    icon: '/images/item/coin-3.png',
    cardBg: 'bg-4'
  }
]

// Dados de estatísticas de dashboard
export const dashboardStats = {
  bitcoin: { value: 34, suffix: ',57', change: '+4%', period: '30 days' },
  litecoin: { value: 54, suffix: ',57', change: '+4%', period: '30 days' },
  monero: { value: 14, suffix: ',47', change: '+4%', period: '30 days' },
  peercoin: { value: 34, suffix: ',57', change: '+4%', period: '30 days' }
}

// Dados de gráficos
export const chartData = {
  smallChart1: [20, 50, 27, 100, 30, 80, 100],
  smallChart2: [30, 40, 50, 80, 60, 70, 90],
  smallChart3: [50, 30, 70, 40, 90, 60, 80],
  smallChart4: [20, 60, 40, 80, 50, 70, 100],
  lineChartTwoline: {
    series1: [31, 90, 58, 70, 92, 89, 80],
    series2: [51, 45, -25, 51, 34, 2, 41],
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  },
  marketOverview: {
    buy: '$8,420.50',
    sell: '$8,420.50'
  }
}

// Menu de navegação
export const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'icon-category', path: '/' },
  { 
    id: 'wallet', 
    label: 'My Wallet', 
    icon: 'icon-wallet1', 
    hasChildren: true,
    children: [
      { id: 'my-wallet', label: 'My Wallet', path: '/my-wallet' },
      { id: 'account', label: 'Account', path: '/account' }
    ]
  },
  { id: 'transaction', label: 'Transaction', icon: 'transaction-icon', path: '/transaction' },
  { id: 'crypto', label: 'Crypto', icon: 'icon-dash1', path: '/crypto' },
  { id: 'exchange', label: 'Exchange', icon: 'icon-arrow-swap', path: '/exchange' },
  { id: 'settings', label: 'Settings', icon: 'icon-setting1', path: '/settings' },
  { id: 'component', label: 'Component', icon: 'icon-search-normal', path: '/component' }
]

// User dropdown menu items
export const userMenuItems = [
  { label: 'Account', path: '/account' },
  { label: 'Inbox', path: '#', badge: 27 },
  { label: 'Transaction', path: '/transaction' },
  { label: 'Setting', path: '/settings' },
  { label: 'Crypto', path: '/crypto' },
  { label: 'Log out', path: '/sign-in' }
]

// Dados da tabela Crypto
export const cryptoTableData = [
  {
    id: 1,
    rank: 1,
    name: 'Bitcoin',
    symbol: 'BTC',
    price: '56,291.55',
    change: '+2.45%',
    volume: '220,083,007,631',
    img: '/images/item/coin-1.png',
    trend: 'up',
    chartColor: '#EDAF4B', 
    chartData: [10, 20, 15, 25, 18, 22, 16, 25, 20, 28, 22]
  },
  {
    id: 2,
    rank: 2,
    name: 'Ethereum',
    symbol: 'ETH',
    price: '1,811.48',
    change: '+2.54%',
    volume: '120,083,007,631',
    img: '/images/item/coin-2.png',
    trend: 'up',
    chartColor: '#6B7FA5',
    chartData: [15, 10, 20, 15, 25, 18, 15, 10, 20, 15, 25]
  },
  {
    id: 3,
    rank: 3,
    name: 'Cardano',
    symbol: 'ADA',
    price: '1.14',
    change: '-1.32%',
    volume: '20,083,007,631',
    img: '/images/item/coin-3.png',
    trend: 'down',
    chartColor: '#FD7972',
    chartData: [25, 18, 20, 12, 15, 10, 18, 15, 12, 10, 14]
  },
  {
    id: 4,
    rank: 4,
    name: 'Binance Coin',
    symbol: 'BNB',
    price: '304.12',
    change: '+1.05%',
    volume: '5,083,007,631',
    img: '/images/item/bitcoin.png',
    trend: 'up',
    chartColor: '#F0B90B',
    chartData: [12, 18, 14, 22, 19, 24, 18, 22, 16, 25, 20]
  },
  {
    id: 5,
    rank: 5,
    name: 'Tether',
    symbol: 'USDT',
    price: '1.00',
    change: '0.01%',
    volume: '60,083,007,631',
    img: '/images/item/dashcoin.png',
    trend: 'up',
    chartColor: '#26A17B',
    chartData: [10, 10, 11, 10, 10, 11, 10, 10, 11, 10, 10]
  },
  {
    id: 6,
    rank: 6,
    name: 'XRP',
    symbol: 'XRP',
    price: '0.45',
    change: '-3.15%',
    volume: '2,083,007,631',
    img: '/images/item/coin-1.png',
    trend: 'down',
    chartColor: '#FD7972',
    chartData: [22, 18, 16, 12, 14, 10, 12, 15, 10, 8, 12]
  },
  {
    id: 7,
    rank: 7,
    name: 'Solana',
    symbol: 'SOL',
    price: '34.12',
    change: '+5.45%',
    volume: '1,083,007,631',
    img: '/images/item/coin-2.png',
    trend: 'up',
    chartColor: '#9945FF',
    chartData: [10, 15, 18, 25, 22, 28, 24, 30, 26, 32, 28]
  },
  {
    id: 8,
    rank: 8,
    name: 'Polkadot',
    symbol: 'DOT',
    price: '16.48',
    change: '-0.54%',
    volume: '883,007,631',
    img: '/images/item/coin-3.png',
    trend: 'down',
    chartColor: '#E6007A',
    chartData: [18, 16, 15, 14, 15, 13, 16, 14, 12, 14, 13]
  },
  {
    id: 9,
    rank: 9,
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: '0.07',
    change: '+1.20%',
    volume: '583,007,631',
    img: '/images/item/bitcoin.png',
    trend: 'up',
    chartColor: '#BA9F33',
    chartData: [12, 14, 13, 16, 15, 18, 16, 19, 17, 20, 18]
  }
]
