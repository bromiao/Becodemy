import { Redirect } from 'expo-router'
import * as SecureStore from 'expo-secure-store'
import React, { useEffect, useState } from 'react'

export default function Index() {
  const [loggedInUser, setLoggedInUser] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const subscription = async () => {
      try {
        const token = await SecureStore.getItem('token')
        setLoggedInUser(!!token)
      } catch (error) {
        console.error('Error fetching token:', error)
      } finally {
        setLoading(false)
      }
    }
    subscription()
  }, [])

  return (
    <>
      {!loading && (
        <Redirect href={loggedInUser ? '/(tabs)' : ('/(routes)/onboarding' as any)}></Redirect>
      )}
    </>
  )
}
