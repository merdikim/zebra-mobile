import { View } from 'react-native'

import { DashboardShell, SectionIntro, SettingsRow } from '../../components/dashboard-shell'

export default function Settings() {
  return (
    <DashboardShell activeScreen="settings">
      <View>
        <SectionIntro
          title="Settings"
          description="Set defaults for proposal expiry, notifications, and vault safeguards."
        />
        <SettingsRow label="Default network" value="Solana Devnet" />
        <SettingsRow label="Proposal expiry" value="24 hours" />
        <SettingsRow label="Spending alerts" value="Enabled" />
        <SettingsRow label="Biometric approval" value="Required" />
      </View>
    </DashboardShell>
  )
}
