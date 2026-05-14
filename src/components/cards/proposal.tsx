import { View, Text } from "react-native";
import { ProposalStatus } from "../../types";
import { Metric } from "./metric";

export function ProposalCard({ proposal }: { proposal: { title: string; vault: string; amount: string; approvals: string; status: ProposalStatus; eta: string } }) {
  const statusStyles: Record<ProposalStatus, { container: string; text: string }> = {
    Ready: { container: 'bg-teal-50', text: 'text-teal-700' },
    Pending: { container: 'bg-amber-50', text: 'text-amber-700' },
    Draft: { container: 'bg-slate-100', text: 'text-slate-600' },
  }
  const statusStyle = statusStyles[proposal.status]

  return (
    <View className="rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-base font-extrabold text-slate-950">{proposal.title}</Text>
          <Text className="mt-1 text-sm text-slate-500">{proposal.vault}</Text>
        </View>
        <View className={`shrink-0 rounded-full px-3 py-1 ${statusStyle.container}`}>
          <Text className={`text-xs font-extrabold ${statusStyle.text}`}>{proposal.status}</Text>
        </View>
      </View>
      <View className="mt-4 flex-row gap-3">
        <Metric label="Amount" value={proposal.amount} />
        <Metric label="Approvals" value={proposal.approvals} />
        <Metric label="Status" value={proposal.eta} />
      </View>
    </View>
  )
}