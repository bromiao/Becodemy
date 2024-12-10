const IS_DEV = process.env.APP_VARIANT === 'development'
const IS_PREVIEW = process.env.APP_VARIANT === 'preview'

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return 'com.philipbill0077.Becodemy.dev'
  }

  if (IS_PREVIEW) {
    return 'com.philipbill0077.Becodemy.preview'
  }

  return 'com.philipbill0077.Becodemy'
}

const getAppName = () => {
  if (IS_DEV) {
    return 'Becodemy (Dev)'
  }

  if (IS_PREVIEW) {
    return 'Becodemy (Preview)'
  }

  return 'Becodemy'
}

export default {
  expo: {
    name: getAppName(),
    slug: 'Becodemy',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff'
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: getUniqueIdentifier()
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff'
      },
      package: getUniqueIdentifier(),
      googleServicesFile: './google-services.json'
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: [
      'expo-router',
      'expo-secure-store',
      [
        '@react-native-google-signin/google-signin',
        {
          iosUrlScheme: 'com.googleusercontent.apps.843990837259-f1e06hjor2n930f82ta52953ntev4db0'
        }
      ]
    ],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '5e51f1ad-154a-4ca5-8dad-c840d8be7302'
      }
    }
  }
}
