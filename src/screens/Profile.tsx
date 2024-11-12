import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { CameraOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions'

const Profile = () => {
    const [imgUrl,setImgUrl]=useState<string>('https://picsum.photos/seed/picsum/200/300')
    const options:CameraOptions={
        mediaType:'photo'
    }
  const openCamera= async()=>{
    const result = await launchCamera(options);
    console.log(result);
    {
        result.assets && result.assets?.map((data)=>{
            if(data.uri)
            {
                setImgUrl(data.uri)
            }
           
        })
    }
  }  
  const openGallery= async()=>{
    const result = await launchImageLibrary(options);
    console.log(result);
    {
        result.assets && result.assets?.map((data)=>{
            if(data.uri)
            {
                setImgUrl(data.uri)
            }
           
        })
    }
  }  
  const askPermission=()=>{
    request(Platform.OS==='ios'? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result)=>{
       console.log(result)
    });
  }
  return (
    <View style={styles.container}>
      <Image  style={styles.img}source={{uri:imgUrl}}/>
      <TouchableOpacity style={styles.btnContainer} onPress={()=>{
        check(PERMISSIONS.ANDROID.CAMERA).then((result)=>{
            switch(result)
            {
                case RESULTS.GRANTED:
                    console.log('granted');
                    break;
            }
        })
       // askPermission();
      }}>
        <Text style={styles.txtBtn}>Open Camera</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    img:{
       height:200,
       alignSelf:'center',
       width:'90%'
    },
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    btnContainer:{
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center',
        width:100,
        height:40,
        borderRadius:6,
        backgroundColor:'red'
    },
    txtBtn:{

    }
})