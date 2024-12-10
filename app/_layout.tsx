import { ThemeProvider } from '@/context/theme.context'
import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from '@expo-google-fonts/poppins'
import { Stack } from 'expo-router'
import React from 'react'
import '../global.css'

export default function _layout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins_600SemiBold,
    Poppins_300Light,
    Poppins_700Bold,
    Poppins_400Regular,
    Poppins_500Medium
  })

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='index' />
        <Stack.Screen name='(routes)/onboarding/index' />
        <Stack.Screen name='(routes)/notification/index' />
      </Stack>
    </ThemeProvider>
  )
}
