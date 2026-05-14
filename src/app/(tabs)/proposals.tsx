import { View } from 'react-native'

import {
  DashboardShell,
  PrimaryButton,
  SecondaryButton,
  SectionIntro,
} from '../../components/dashboard-shell'
import { ProposalCard } from '../../components/cards/proposal'
import { proposals } from '../../lib/dashboard'

export default function Proposals() {
  return (
    <DashboardShell activeScreen="proposals">
      <View>
        <SectionIntro title="Proposals" description="Review outgoing transactions, policy updates, and signer changes." />
        <View className="mb-4 flex-row gap-3">
          <PrimaryButton label="New Proposal" />
          <SecondaryButton label="Templates" />
        </View>
        <View className="gap-3">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.title} proposal={proposal} />
          ))}
        </View>
      </View>
    </DashboardShell>
  )
}
