import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import axios from 'axios'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session'
import { BlurView } from 'expo-blur'
import JWT from 'expo-jwt'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'
import React, { useEffect } from 'react'
import { Image, Platform, Pressable, Text, View } from 'react-native'

export default function AuthModal({
  setModalVisible
}: {
  setModalVisible: (modal: boolean) => void
}) {
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      // webClientId: process.env.EXPO_PUBLIC_ANDROID_GOOGLE_CLIENT_ID
      webClientId: '843990837259-ght5pc3l3s4udfshidfqr1kuv2hhkr54.apps.googleusercontent.com',
      iosClientId: process.env.EXPO_PUBLIC_IOS_GOOGLE_API_KEY,
      offlineAccess: true
    })
  }

  useEffect(() => {
    configureGoogleSignIn()
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices()
      const userInfo = await GoogleSignin.signIn()
      console.log(userInfo)

      await authHandler({
        name: userInfo.user.name!,
        email: userInfo.user.email!,
        avatar: userInfo.user.photo!
      })
    } catch (error) {
      console.error(error)
    }
  }

  const authHandler = async ({
    name,
    email,
    avatar
  }: {
    name: string
    email: string
    avatar: string
  }) => {
    const user = {
      name,
      email,
      avatar
    }
    const token = JWT.encode({ ...user }, process.env.EXPO_PUBLIC_JWT_SECRET_KEY!)
    const res = await axios.post(`${process.env.EXPO_PUBLIC_SERVER_URI}/login`, {
      signedToken: token
    })
    await SecureStore.setItemAsync('accessToken', res.data.accessToken)
    setModalVisible(false)
    router.push('/(tabs)')
  }

  // github auth start
  const githubAuthEndpoints = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: `https://github.com/settings/connections/applications/${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}`
  }
  const [request, response] = useAuthRequest(
    {
      clientId: process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET!,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'myapp'
      })
    },
    githubAuthEndpoints
  )
  const handleGithubLogin = async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      request?.url!,
      makeRedirectUri({ scheme: 'myapp' })
    )

    if (result.type === 'success' && result.url) {
      const urlParams = new URLSearchParams(result.url.split('?')[1])
      const code = urlParams.get('code')
      fetchAccessToken(code!)
    }
  }

  const fetchAccessToken = async (code: string) => {
    const tokenResponse = await fetch(githubAuthEndpoints.tokenEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `client_id=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID}&client_secret=${process.env.EXPO_PUBLIC_GITHUB_CLIENT_SECRET}&code=${code}`
    })
    const tokenData = await tokenResponse.json()
    const accessToken = tokenData.access_token
    if (accessToken) {
      fetchUserInfo(accessToken)
    } else {
      console.error('Error fetching access token:', tokenData)
    }
  }

  const fetchUserInfo = async (token: string) => {
    const userInfoResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const userData = await userInfoResponse.json()
    // console.log(userData)
    await authHandler({
      name: userData.name!,
      email: userData.email!,
      avatar: userData.avatar_url!
    })
  }
  // github auth end

  return (
    <BlurView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
      intensity={Platform.OS === 'ios' ? 50 : 100}
    >
      <Pressable
        style={{
          width: windowWidth(420),
          height: windowHeight(250),
          marginHorizontal: windowWidth(50),
          backgroundColor: '#fff',
          borderRadius: 30,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Text style={{ fontSize: fontSizes.FONT35, fontFamily: 'Poppins_700Bold' }}>
          Join To Becodemy
        </Text>
        <Text
          style={{
            fontSize: fontSizes.FONT17,
            paddingTop: windowHeight(5),
            fontFamily: 'Poppins_300Light'
          }}
        >
          It's easier than your imagination!
        </Text>
        <View
          style={{
            paddingVertical: windowHeight(10),
            flexDirection: 'row',
            gap: windowWidth(20)
          }}
        >
          <Pressable onPress={handleGoogleSignIn}>
            <Image
              source={require('@/assets/images/onboarding/google.png')}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: 'contain'
              }}
            ></Image>
          </Pressable>
          <Pressable onPress={handleGithubLogin}>
            <Image
              source={require('@/assets/images/onboarding/github.png')}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: 'contain'
              }}
            />
          </Pressable>
          <Pressable>
            <Image
              source={require('@/assets/images/onboarding/apple.png')}
              style={{
                width: windowWidth(40),
                height: windowHeight(40),
                resizeMode: 'contain'
              }}
            ></Image>
          </Pressable>
        </View>
      </Pressable>
    </BlurView>
  )
}
