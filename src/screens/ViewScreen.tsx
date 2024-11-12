import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { Table, Row, Rows } from 'react-native-table-component';
import { colors } from '../constants/colors';

const ViewScreen = () => {
  const {income} = useSelector((state:RootState)=> state.income);
  const tableHead=['Date','Type','Amount'];
  const tableData= income.map((data)=>[data.date,data.type,data.amount]);
  return (
    <View style={styles.container}>
       <ScrollView>
        <View style={{margin:12}}>
            <Table borderStyle={{borderWidth:2,borderColor:colors.primaryColor}}>
                <Row data={tableHead} style={styles.head}/>
                <Rows data={tableData} textStyle={styles.text}/> 
            </Table>
        </View>
       </ScrollView>
    </View>
  )
}

export default ViewScreen

const styles = StyleSheet.create({
    container:{
        flex:1,

    },
    head: {
        height: 40,
        backgroundColor: '#f1f8ff',
        color:'black'
      },
      text: {
        
        textAlign: 'center',
      },
})