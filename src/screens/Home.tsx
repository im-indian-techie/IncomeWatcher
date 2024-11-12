import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import InputScreen from './InputScreen'
import ViewScreen from './ViewScreen'
import CustomToolBar from '../components/CustomToolBar'

const Home = () => {
    const Tab=createBottomTabNavigator();
  return (
    
       <Tab.Navigator screenOptions={{header:(props)=><CustomToolBar title={'Income Watcher'} backPress={function (): void {
           throw new Error('Function not implemented.')
       } }/>}}>
        <Tab.Screen name='Input' component={InputScreen}/>
        <Tab.Screen name='View' component={ViewScreen}/>
       </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})