import ThemeSwitcher from '@/components/common/ThemeSwitcher'
import { useTheme } from '@/context/theme.context'
import useUser from '@/hooks/fetch/useUser'
import useUserData from '@/hooks/useUserData'
import { fontSizes, IsAndroid, IsHaveNotch, IsIPAD } from '@/themes/app.constant'
import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import * as WebBrowser from 'expo-web-browser'
import React from 'react'
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { scale, verticalScale } from 'react-native-size-matters'

const profileOptions = [
  {
    icon: 'book-outline',
    title: 'Enrolled Courses',
    subTitle: 'Explore your all enrolled courses',
    onPress: () => {}
  },
  {
    icon: 'leaderboard',
    title: 'Course Leaderboard',
    subTitle: `Let's see your position in Leaderboard`,
    onPress: () => {}
  },
  {
    icon: 'message-alert-outline',
    title: 'My Tickets',
    subTitle: `Explore your all support tickets`,
    onPress: () => {
      router.push('/(routes)/my-tickets')
    }
  },
  {
    icon: 'support',
    title: 'Support Center',
    subTitle: `Explore our fastest support center`,
    onPress: () => {
      router.push('/(routes)/support-center')
    }
  },
  {
    icon: 'notifications',
    title: 'Notifications',
    subTitle: `Explore the important notifications`,
    onPress: () => {
      router.push('/(routes)/notification')
    }
  },
  {
    icon: 'settings-sharp',
    title: 'Settings',
    subTitle: `Control the app as per your preferences`,
    onPress: () => {
      router.push('/(routes)/settings')
    }
  },
  {
    icon: 'policy',
    title: 'Privacy & Policy',
    subTitle: `Explore our privacy and policy`,
    onPress: async () =>
      await WebBrowser.openBrowserAsync('https://www.becodemy.com/privacy-policy')
  },
  {
    icon: 'logout',
    title: 'Log Out',
    subTitle: `Logging out from your account`,
    onPress: () => {}
  }
]

export default function ProfileScreen() {
  const logoutHandler = async () => {
    await SecureStore.deleteItemAsync('accessToken')
    router.push('/(routes)/onboarding')
  }

  const { theme } = useTheme()
  const { user, loader } = useUser()
  const { name, email, avatar } = useUserData()

  return (
    <View className={`flex-1 ${theme.dark ? 'bg-[#101010]' : 'bg-[#f5f5f5]'}`}>
      <LinearGradient
        colors={theme.dark ? ['#121121', '#3c43485c', '#121121'] : ['#6248ff', '#8673fc']}
        start={theme.dark ? { x: 1, y: 1 } : { x: 0, y: 1 }}
        end={theme.dark ? { x: 0, y: 1 } : { x: 0, y: 0 }}
        style={styles.header}
      >
        <StatusBar barStyle={!theme.dark ? 'dark-content' : 'light-content'} />
        <SafeAreaView style={{ paddingTop: IsAndroid ? verticalScale(20) : 0 }}>
          <View style={styles.headerContent}>
            <Text style={styles.headerTitle}>Profile</Text>
            <View>
              <ThemeSwitcher />
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* Profile wrapper */}
      <View
        style={[
          styles.profileWrapper,
          {
            backgroundColor: theme.dark ? '#121121' : '#fff',
            shadowOpacity: theme.dark ? 0.12 : 0.25
          }
        ]}
      >
        <View className='flex-row'>
          {avatar && (
            <Image
              source={{ uri: avatar }}
              style={styles.profileImage}
            />
          )}
          <View style={styles.profileTextContainer}>
            <Text
              style={[
                styles.profileName,
                {
                  color: theme.dark ? '#fff' : '#000'
                }
              ]}
            >
              {name}
            </Text>
            <Text style={styles.profileTitle}>{email}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <LinearGradient
            style={styles.statBox}
            colors={['#01ced3', '#0185f7']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>{user?.orders?.length}</Text>
            <Text style={styles.statLabel}>Enrolled</Text>
          </LinearGradient>
          <LinearGradient
            style={styles.statBox}
            colors={['#BF6FF8', '#3C1BE9']}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Profile options */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ padding: scale(20) }}
      >
        {profileOptions.map((item, index) => {
          let IconComponent
          if ([1, 6, 7].includes(index)) {
            IconComponent = MaterialIcons
          } else if (index === 2) {
            IconComponent = MaterialCommunityIcons
          } else if (index === 3) {
            IconComponent = FontAwesome
          } else {
            IconComponent = Ionicons
          }

          return (
            <Pressable
              key={index}
              className='flex-row items-center justify-between'
              style={{ marginBottom: verticalScale(20) }}
              onPress={() => {
                if (index === profileOptions.length - 1) {
                  logoutHandler()
                } else {
                  item.onPress()
                }
              }}
            >
              <View className='flex-row items-center'>
                <View
                  className='justify-center items-center border-[#e2ddff]'
                  style={{
                    width: scale(38),
                    height: scale(38),
                    borderRadius: scale(10),
                    borderWidth: 1
                  }}
                >
                  <IconComponent
                    name={item.icon as any}
                    size={scale(21)}
                    color={theme.dark ? '#fff' : '#0047AB'}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      marginLeft: scale(10),
                      fontSize: fontSizes.FONT22,
                      fontFamily: 'Poppins_400Regular',
                      color: theme?.dark ? '#fff' : '#000'
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      marginLeft: scale(10),
                      fontSize: fontSizes.FONT15,
                      fontFamily: 'Poppins_400Regular',
                      color: theme?.dark ? '#fff' : '#000',
                      opacity: 0.6
                    }}
                  >
                    {item.subTitle}
                  </Text>
                </View>
              </View>
            </Pressable>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: verticalScale(180),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
    padding: scale(20)
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: fontSizes.FONT28,
    color: '#fff',
    fontFamily: 'Poppins_500Medium'
  },
  profileWrapper: {
    width: scale(320),
    backgroundColor: '#fff',
    height: IsAndroid
      ? verticalScale(155)
      : !IsHaveNotch
        ? verticalScale(175)
        : IsIPAD
          ? verticalScale(185)
          : verticalScale(155),
    marginTop: verticalScale(-90),
    alignSelf: 'center',
    borderRadius: scale(20),
    padding: scale(15),
    zIndex: 10,
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  profileImage: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    marginBottom: verticalScale(10)
  },
  profileTextContainer: {
    marginBottom: verticalScale(10),
    marginLeft: scale(10)
  },
  profileName: {
    fontSize: fontSizes.FONT22,
    fontFamily: 'Poppins_500Medium',
    color: '#000'
  },
  profileTitle: {
    fontSize: fontSizes.FONT17,
    fontFamily: 'Poppins_400Regular',
    color: '#8a8a8a',
    width: scale(230),
    overflow: 'hidden'
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: verticalScale(10)
  },
  statBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: scale(120),
    height: verticalScale(62),
    borderRadius: scale(10),
    color: '#fff'
  },
  statNumber: {
    fontSize: fontSizes.FONT25,
    fontFamily: 'Poppins_700Bold',
    color: '#fff'
  },
  statLabel: {
    fontSize: fontSizes.FONT20,
    fontFamily: 'Poppins_400Regular',
    color: '#fff'
  }
})
