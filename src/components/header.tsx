import { View, Text, Pressable } from "react-native"

export default function Header({
  connectedAddress = '',
  isConnected = true,
  onConnect = () => console.log('connect'),
  onDisconnect = () => console.log('disconnect'),
}: {
  connectedAddress?: string
  isConnected?: boolean
  onConnect?: () => void
  onDisconnect?: () => void
}) {
  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between gap-3">
        <View className="min-w-0 flex-1">
          <Text className="mt-1 text-3xl font-extrabold tracking-tight text-slate-950" numberOfLines={1}>
            Zebra
          </Text>
        </View>
        <Pressable
          onPress={isConnected ? onDisconnect : onConnect}
          className={`shrink-0 rounded-full px-4 py-3 ${isConnected ? 'bg-slate-900' : 'bg-teal-600'}`}
        >
          <Text className="text-sm font-bold text-white">{isConnected ? 'Disconnect' : 'Connect'}</Text>
        </Pressable>
      </View>

      <View className="mt-5 rounded-2xl border border-teal-100 bg-white p-2">
        <View className="flex-row items-center gap-3">
          <View className="min-w-0 flex-1">
            <Text className="mt-1 text-base font-bold text-slate-900" numberOfLines={1}>
              {connectedAddress}
            </Text>
          </View>
          <View className="shrink-0 rounded-full bg-teal-50 p-1">
            <Text className="text-xs font-bold text-teal-700">Devnet</Text>
          </View>
        </View>
      </View>
    </View>
  )
}