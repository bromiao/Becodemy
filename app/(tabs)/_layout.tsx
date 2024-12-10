import { useTheme } from '@/context/theme.context'
import useUser from '@/hooks/fetch/useUser'
import { fontSizes, IsAndroid, IsIOS, IsIPAD } from '@/themes/app.constant'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import { Tabs } from 'expo-router'
import React from 'react'
import { DimensionValue, StyleSheet, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const tabBarIconObj: {
  [key: string]: {
    name: any
    size: number
    width: DimensionValue | undefined
    headerTitle: string
  }
} = {
  index: {
    name: 'home',
    size: moderateScale(24),
    width: IsIPAD ? scale(20) : 'auto',
    headerTitle: ''
  },
  'courses/index': {
    name: 'book-outline',
    size: moderateScale(24),
    width: IsIPAD ? scale(20) : 'auto',
    headerTitle: 'Courses'
  },
  'resources/index': {
    name: 'document-text-outline',
    size: moderateScale(24),
    width: IsIPAD ? scale(20) : 'auto',
    headerTitle: 'Video Lessons'
  },
  'profile/index': {
    name: 'person-outline',
    size: moderateScale(26),
    width: IsIPAD ? scale(20) : 'auto',
    headerTitle: ''
  }
}

const tabBarIcon = (route: string, color: string) => {
  return (
    <Ionicons
      name={tabBarIconObj[route].name}
      size={tabBarIconObj[route].size}
      color={color}
      style={{ width: tabBarIconObj[route].width }}
    ></Ionicons>
  )
}

export default function _layout() {
  const { theme } = useTheme()
  const { loader } = useUser()

  return (
    <Tabs
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, size }) => {
            return tabBarIcon(route.name, color)
          },
          tabBarActiveTintColor: theme.dark ? '#19c964' : '#4A90E2',
          tabBarInactiveTintColor: theme.dark ? '#fff' : '#8e8e93',
          headerShown: ['courses/index', 'resources/index'].includes(route.name),
          headerTitle: tabBarIconObj[route.name].headerTitle,
          headerStyle: {
            color: theme.dark ? '#fff' : '#000',
            textAlign: 'center',
            width: scale(320),
            fontSize: fontSizes.FONT32,
            fontFamily: 'Poppins_400Regular'
          },
          headerBackgroundContainerStyle: {
            backgroundColor: theme.dark ? '#131313' : '#fff',
            shadowColor: theme.dark ? '#fff' : '#000',
            shadowOpacity: theme.dark ? 0.1 : 0.1,
            shadowOffset: { width: 0, height: 1 },
            shadowRadius: 1,
            elevation: 1
          },
          headerBackground: () => (
            <BlurView
              intensity={theme.dark ? 70 : 80}
              style={{
                borderTopLeftRadius: scale(20),
                borderTopRightRadius: scale(20),
                overflow: 'hidden',
                backgroundColor: 'transparent'
              }}
            />
          ),
          tabBarShowLabel: false,
          tabBarStyle: {
            position: IsIOS ? (theme.dark ? 'absolute' : 'static') : 'absolute',
            borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
            borderTopRightRadius: IsAndroid ? 0 : IsIPAD ? scale(20) : scale(35),
            borderTopWidth: 0,
            height: verticalScale(55),
            opacity: loader ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out'
          },
          tabBarBackground: () => {
            return IsIOS && !theme.dark ? (
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: '#fff',
                  borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
                  borderTopRightRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
                  overflow: 'hidden'
                }}
              />
            ) : (
              <BlurView
                style={{
                  ...StyleSheet.absoluteFillObject,
                  borderTopLeftRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
                  borderTopRightRadius: IsAndroid ? 0 : IsIPAD ? scale(25) : scale(35),
                  overflow: 'hidden',
                  backgroundColor: IsAndroid
                    ? theme.dark
                      ? '#131313'
                      : '#fff'
                    : theme.dark
                      ? 'transparent'
                      : '#fff'
                }}
              />
            )
          }
        }
      }}
    >
      <Tabs.Screen name='index' />
      <Tabs.Screen name='courses/index' />
      <Tabs.Screen name='resources/index' />
      <Tabs.Screen name='profile/index' />
    </Tabs>
  )
}
