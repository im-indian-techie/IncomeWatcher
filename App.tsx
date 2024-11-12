import { Alert, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { Provider } from 'react-redux';
import store from './src/redux/store';
import InputScreen from './src/screens/InputScreen';
import Profile from './src/screens/Profile';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ViewScreen from './src/screens/ViewScreen';
import Home from './src/screens/Home';
import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';


const App = () => {
  const Stack=createNativeStackNavigator();
  // Create notification channel
  const getFCMToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log(token);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFCMToken();

    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
        }
      });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
    crashlytics().setUserId('1');
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
         <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name='Home' component={Home}/>
         </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </Provider>
    
  );
}

export default App

const styles = StyleSheet.create({})