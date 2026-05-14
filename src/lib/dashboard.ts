import { ProposalStatus } from "../types"

export const proposals: {
  title: string
  vault: string
  amount: string
  approvals: string
  status: ProposalStatus
  eta: string
}[] = [
  {
    title: 'Send USDC to payroll',
    vault: 'Operations',
    amount: '$12,400',
    approvals: '2/3',
    status: 'Ready',
    eta: 'Expires in 8h',
  },
  {
    title: 'Swap SOL to USDC',
    vault: 'Treasury',
    amount: '$28,000',
    approvals: '2/5',
    status: 'Pending',
    eta: 'Needs 1 more',
  },
  {
    title: 'Grant round payment',
    vault: 'Grants',
    amount: '$6,800',
    approvals: '1/4',
    status: 'Draft',
    eta: 'Reviewing',
  },
]

export const signers = [
  { name: 'Merdikim', address: '8mH4...2aQp', role: 'Admin', status: 'Active' },
  { name: 'Finance Lead', address: '4Rsk...9pLm', role: 'Signer', status: 'Active' },
  { name: 'Ops Desk', address: 'G7p1...xK2d', role: 'Signer', status: 'Pending' },
  { name: 'Advisor', address: '2Lq9...nV81', role: 'Viewer', status: 'Active' },
]

export const activity = [
  { action: 'Proposal approved', detail: 'Payroll payment reached threshold', time: '12 min ago' },
  { action: 'Signer invited', detail: 'Ops Desk was added to Operations', time: '1h ago' },
  { action: 'Vault funded', detail: 'Treasury received 120 SOL', time: 'Yesterday' },
  { action: 'Policy changed', detail: 'Grants threshold updated to 2 of 4', time: 'Apr 28' },
]
