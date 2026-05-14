export type Multisig = {
  name: string
  value: string
  threshold: string
  assets: string
  risk: 'Low' | 'Medium' | 'High'
}

export const multisigs: Multisig[] = [
  { name: 'Treasury', value: '$248,420', threshold: '3 of 5', assets: 'USDC, SOL', risk: 'Low' },
  { name: 'Operations', value: '$42,860', threshold: '2 of 3', assets: 'USDC', risk: 'Medium' },
  { name: 'Grants', value: '$18,240', threshold: '2 of 4', assets: 'SOL, BONK', risk: 'Low' },
]

export function getMultisigsForWallet(address?: string) {
  if (!address) return []

  return multisigs
}
