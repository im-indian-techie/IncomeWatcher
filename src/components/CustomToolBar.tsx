import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constants/colors'
import AntDesign from 'react-native-vector-icons/AntDesign'
interface ToolBarProps{
  title:string,
  backPress:()=>void

}

const CustomToolBar:React.FC<ToolBarProps> = ({title,backPress}) => {
  return (
   <View style={styles.container}>
    {/* <AntDesign name={'leftcircle'} size={30} /> */}
    <Text style={styles.title}>{title}</Text>
   </View>
  )
}

export default CustomToolBar

const styles = StyleSheet.create({
  container:{
    height:50,
    flexDirection:'row',
    backgroundColor:colors.primaryColor,
    paddingLeft:10,
    alignItems:'center'
  },
  title:{
    color:colors.black,
    marginLeft:10,
    fontSize:20
  }
})