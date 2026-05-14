import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { type ReactNode } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from './header'
import { ScreenKey } from '../types'

const screens: { key: ScreenKey; label: string; path: `/${string}` }[] = [
  { key: 'home', label: 'Home', path: '/home' },
  { key: 'signers', label: 'Signers', path: '/signers' },
  { key: 'activity', label: 'Activity', path: '/activity' },
  { key: 'settings', label: 'Settings', path: '/settings' },
]

export function DashboardShell({ activeScreen, children }: { activeScreen: ScreenKey; children: ReactNode }) {
  return (
    <SafeAreaView className="flex-1 bg-slate-50" style={{flex:1}}>
      <ScrollView className="flex-1 bg-slate-50" >
        <StatusBar style="dark" />
        <View className="flex-1">
          <ScrollView
            className="flex-1"
            contentContainerClassName="px-5 pb-32 pt-4"
            showsVerticalScrollIndicator={false}
          >
            <Header />
            <ScreenTabs activeScreen={activeScreen} />
            {children}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function ScreenTabs({ activeScreen }: { activeScreen: ScreenKey }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-5">
      <View className="flex-row justify-between gap-2">
        {screens.map((screen) => {
          const isActive = activeScreen === screen.key
          return (
            <Pressable
              key={screen.key}
              onPress={() => router.push(screen.path)}
              className={`rounded-full border px-4 py-2 ${
                isActive ? 'border-teal-600 bg-teal-600' : 'border-slate-200 bg-white'
              }`}
            >
              <Text className={`text-sm font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>{screen.label}</Text>
            </Pressable>
          )
        })}
      </View>
    </ScrollView>
  )
}

export function SectionIntro({ title, description }: { title: string; description: string }) {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-extrabold tracking-tight text-slate-950">{title}</Text>
      <Text className="mt-2 text-sm leading-6 text-slate-500">{description}</Text>
    </View>
  )
}

export function SectionTitle({ title, actionTrigger, action, }: { title: string; actionTrigger?: string; action?: () => void }) {
  return (
    <View className="mb-3 mt-6 flex-row items-center justify-between">
      <Text className="text-lg font-extrabold text-slate-950">{title}</Text>
      {actionTrigger ? <Pressable onPress={action}><Text className="text-sm font-bold text-teal-700">{actionTrigger}</Text></Pressable> : null}
    </View>
  )
}

export function SettingsRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="mb-3 rounded-2xl border border-slate-200 bg-white p-4">
      <View className="flex-row items-center justify-between gap-4">
        <Text className="min-w-0 flex-1 text-base font-bold text-slate-900">{label}</Text>
        <Text className="max-w-[48%] text-right text-sm font-bold text-teal-700">{value}</Text>
      </View>
    </View>
  )
}

export function PrimaryButton({ label }: { label: string }) {
  return (
    <Pressable className="min-w-0 flex-1 rounded-2xl bg-teal-600 px-4 py-4 active:bg-teal-700">
      <Text className="text-center text-sm font-extrabold text-white">{label}</Text>
    </Pressable>
  )
}

export function SecondaryButton({ label }: { label: string }) {
  return (
    <Pressable className="min-w-0 flex-1 rounded-2xl border border-teal-100 bg-teal-50 px-4 py-4 active:bg-teal-100">
      <Text className="text-center text-sm font-extrabold text-teal-700">{label}</Text>
    </Pressable>
  )
}

