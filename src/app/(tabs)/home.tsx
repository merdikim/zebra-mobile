import { Text, View } from 'react-native'
import { DashboardShell, SectionTitle } from '../../components/dashboard-shell'
import { proposals } from '../../lib/dashboard'
import { Metric } from '../../components/cards/metric'
import { ProposalCard } from '../../components/cards/proposal'
import { useState } from 'react'

export default function Home() {
  const [showAllProposals, setShowAllProposals] = useState(false)
  const selectedProposals = showAllProposals ? proposals : proposals.filter(proposal => proposal.status === 'Pending')
  const proposalTitle = showAllProposals ? `All (${selectedProposals.length})` : `Needs Attention (${selectedProposals.length})`
  const proposalAction = showAllProposals ? 'Needs Attention' : 'View all'

  const toggleProposals = () => {
    setShowAllProposals((current) => !current)
  }

  return (
    <DashboardShell activeScreen="home">
      <View>
        <View className="rounded-3xl bg-teal-600 p-5">
          <Text className="text-sm font-semibold text-teal-100">Assets Value</Text>
          <Text className="mt-2 text-3xl font-extrabold tracking-tight text-white" adjustsFontSizeToFit numberOfLines={1}>
            $309,520
          </Text>
          <View className="mt-5 flex-row gap-3">
            <Metric label="Signers" value="5" inverse />
            <Metric label="Pending" value="2" inverse />
            <Metric label="Total" value="10" inverse />
          </View>
        </View>

        <SectionTitle title={proposalTitle} actionTrigger={proposalAction} action={toggleProposals} />
        <View className="gap-3">
          {selectedProposals.map((proposal) => (
            <ProposalCard key={proposal.title} proposal={proposal} />
          ))}
        </View>
      </View>
    </DashboardShell>
  )
}
