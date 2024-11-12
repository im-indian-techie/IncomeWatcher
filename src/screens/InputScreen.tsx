import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../constants/colors'
import CustomToolBar from '../components/CustomToolBar'
import { Dropdown } from 'react-native-element-dropdown'
import DateTimePicker from '@react-native-community/datetimepicker';
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { addItem, AddItems, clearMessage, FetchItems } from '../redux/incomeSlice'
import Toast from 'react-native-toast-message'
import Utils from '../Utils'
import crashlytics from '@react-native-firebase/crashlytics';

const InputScreen = () => {
    const [value, setValue] = useState('');
    const options = [{ item: 'Travel' }, { item: 'Food' }, { item: 'Entertainment' }, { item: 'Shopping' }]
    const [dateTime, setDateTime] = useState(new Date())
    const [showPicker, isShowPicker] = useState(false)
    const [amount, setAmount] = useState('')
    const dispatch: AppDispatch = useDispatch();
    const { income, loading, get_message, add_message } = useSelector((state: RootState) => state.income);

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || dateTime; // Use selected date or current date
            setDateTime(currentDate); // Update state with the selected date
        }
        isShowPicker(false); // Hide the picker after selection
    };
    const formatDate = (date:Date) => {
        const d = new Date(date);
        const day = ('0' + d.getDate()).slice(-2); // Get the day and add leading zero if needed
        const month = ('0' + (d.getMonth() + 1)).slice(-2); // Months are zero-based, so add 1 and add leading zero
        const year = d.getFullYear().toString().slice(-2); // Get the last two digits of the year
      
        return `${day}-${month}-${year}`;
      }
   
    useEffect(() => {
       
     if(add_message)
        {
            new Utils().showToast(add_message,'success');
            setTimeout(()=>{
                dispatch(clearMessage());
            },2000)
        }   
        
        
    }, [add_message])


    useEffect(() => {
        getData();

    }, [])
    const insertData = () => {
        if(value==='')
        {
            new Utils().showToast('Please select type','error');
        }
        else if(amount==='')
        {
            new Utils().showToast('Please enter amount','error');
        }
        else
        {
            const date = formatDate(dateTime);
        
            dispatch(AddItems(value, date, Number.parseInt(amount)));
            // crashlytics().crash();
        }
       
    }
    const getData = () => {
        dispatch(FetchItems());
    }
    return (
        <View style={styles.container}>
           
            <View style={{ padding: 20 }}>
                <Dropdown data={options} labelField="item" style={styles.Dropdown} placeholderStyle={styles.placeHolder}
                    valueField="item" placeholder='Select Type' search searchPlaceholder='Search..' value={value} onChange={item => setValue(item.item)} />
                <Text style={{ marginTop: 10 }}>Select Date</Text>
                <TouchableOpacity onPress={() => {
                    isShowPicker(true)
                }} style={styles.Dropdown}>

                    <Text style={{ color: colors.black }}>{formatDate(dateTime)}</Text>


                </TouchableOpacity>
                {
                    showPicker && (<DateTimePicker value={dateTime} onChange={handleDateChange} mode='date' />)
                }
                <View style={{
                    marginTop: 10,
                    padding: 12,
                    borderWidth: 2,
                    borderColor: colors.primaryColor,
                    borderRadius: 20,
                    height: 80
                }}>
                    <TextInput style={{ textAlign: 'center', fontSize: 20, color: colors.black }} placeholder='Enter Amount' value={amount} onChangeText={setAmount} keyboardType='numeric' />
                </View>
                <TouchableOpacity onPress={() => {
                    insertData();
                }} style={{ backgroundColor: colors.primaryColor, marginTop: 20, height: 50, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: colors.black, textAlign: 'center' }}>Submit</Text>
                </TouchableOpacity>
                {/* {income && income.length > 0 ? (  // Conditionally render only if income exists and has data
                    <Text style={{ color: colors.black, marginTop: 20 }}>Amount: {income[0].amount}</Text>
                ) : (
                    <Text style={{ color: colors.black, marginTop: 20 }}>No income data available</Text>
                )} */}
            </View>

        </View>
    )
}

export default InputScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },

    Dropdown: {
        padding: 12,
        borderWidth: 2,
        borderColor: colors.primaryColor,
        borderRadius: 20
    },
    placeHolder: {
        fontSize: 15,
        color: colors.black
    }
})