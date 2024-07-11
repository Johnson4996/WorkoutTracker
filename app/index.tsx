import React, { useEffect } from "react"
import { SplashScreen } from "expo-router"
import { Redirect } from "expo-router"
import {initDatabase} from "../utils/database.js"

export default function Index() {
const [databaseInitialized, setDatabaseInitialized] = React.useState(false)

useEffect(() => {
  const databaseSetUp = async () => {
    try{
      await SplashScreen.preventAutoHideAsync()
      await initDatabase()
      setDatabaseInitialized(true)
      await SplashScreen.hideAsync()
    } catch (error) {
      console.log("Error initializing database:", error)
    }
  }

  databaseSetUp()

}, [])

if (!databaseInitialized) {
  return null
}
  return <Redirect href="/(tabs)" />
}