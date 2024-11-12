import { View, Text } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message';

export default class Utils {
    showToast = (msg:string,type:string) => {
    Toast.show({
      type: type,
      text1: msg,
      position:'bottom'
    });
  };
}

