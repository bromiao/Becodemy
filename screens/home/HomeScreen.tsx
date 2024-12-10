import GradiantText from '@/components/common/GradientText'
import HomeBanner from '@/components/home/HomeBanner'
import WelcomeHeader from '@/components/home/WelcomeHeader'
import { useTheme } from '@/context/theme.context'
import { fontSizes, windowHeight, windowWidth } from '@/themes/app.constant'
import SkeltonLoader from '@/utils/skelton'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

export default function HomeScreen() {
  const { theme } = useTheme()
  const [loading, setLoading] = useState(true)

  return (
    <LinearGradient
      colors={theme.dark ? ['#180D41', '#2A2D32', '#131313'] : ['#fff', '#f7f7f7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        flex: 1,
        backgroundColor: theme.dark ? '#101010' : '#fff'
      }}
    >
      <WelcomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HomeBanner />
        <View
          style={{
            marginHorizontal: windowWidth(20),
            marginTop: verticalScale(-25)
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              marginTop: windowHeight(5)
            }}
          >
            <Text
              style={{
                fontSize: fontSizes.FONT35,
                fontFamily: 'Poppins_500Medium',
                color: theme.dark ? '#fff' : '#000'
              }}
            >
              Popular
            </Text>
            <GradiantText
              text='Courses'
              styles={{
                fontSize: fontSizes.FONT35,
                fontFamily: 'Poppins_500Medium',
                paddingLeft: scale(5)
              }}
            />
          </View>
          <View className='flex-row items-center'>
            <View
              style={{
                backgroundColor: '#12bb70',
                width: windowWidth(15),
                height: windowWidth(15),
                borderRadius: 100
              }}
            />
            <Text
              style={{
                fontFamily: 'Poppins_400Regular',
                fontSize: fontSizes.FONT18,
                paddingLeft: windowWidth(5),
                color: theme.dark ? '#fff' : '#000'
              }}
            >
              Our comprehensive project based courses
            </Text>
          </View>
        </View>
        {loading ? (
          <>
            <SkeltonLoader />
            <SkeltonLoader />
          </>
        ) : (
          <View></View>
        )}
      </ScrollView>
    </LinearGradient>
  )
}
