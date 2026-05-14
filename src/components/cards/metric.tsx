import { View, Text } from "react-native";

export function Metric({ label, value, inverse = false }: { label: string; value: string; inverse?: boolean }) {
  return (
    <View className="flex-1">
      <Text className={`text-xs font-semibold uppercase tracking-wide ${inverse ? 'text-teal-100' : 'text-slate-400'}`}>
        {label}
      </Text>
      <Text className={`mt-1 text-base font-extrabold ${inverse ? 'text-white' : 'text-slate-950'}`}>{value}</Text>
    </View>
  )
}