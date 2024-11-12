import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createTable, getDbConnection } from "../db/database"

interface Income{
    id:number,
    type:string,
    date:string,
    amount:number
}

interface IncomeState{
    income:Income[],
    loading:boolean,
    get_message:string
    add_message:string
}

const initialState:IncomeState={
    income:[],
    loading:false,
    get_message:'',
    add_message:''
}

const incomeSlice=createSlice(
    {
        name:'income',
        initialState,
        reducers:
        {
            addItem:(state,action:PayloadAction<Income>)=>{
                state.loading=true;
                state.add_message = '';
               state.income.push(action.payload);
               state.loading=false;
               state.add_message='Item added successfully'
            },
            getItems:(state,action:PayloadAction<Income[]>)=>{
               state.loading=true; 
               state.income=action.payload;
               state.loading=false;
               state.get_message='success'
            },
            clearMessage:(state)=>{
                state.add_message='';
            }
        }
    }
)

export const {addItem,getItems,clearMessage}=incomeSlice.actions;
export default incomeSlice.reducer;

export const FetchItems=()=>async(dispatch: any)=>{
   const db= await getDbConnection();
   await createTable(db);
   const result= await (await db).executeSql('SELECT * FROM INCOME');
   console.log('data',result);
   const income:Income[]=[]
   result.forEach((r) => {
    for (let i = 0; i < r.rows.length; i++) {
        income.push(r.rows.item(i));
    }
  });
  console.log('income',income);
  dispatch(getItems(income));
}

export const AddItems=(type:string,date:string,amount:number)=>async(dispatch:any)=>{
  const db= await getDbConnection();
  await db.executeSql('INSERT INTO INCOME (type,date,amount) VALUES  (?,?,?)',[type,date,amount]);
  // Fetch the last inserted row ID
  const result = await db.executeSql('SELECT last_insert_rowid() as id');
    
  if (result.length > 0 && result[0].rows.length > 0) {
    const newId = result[0].rows.item(0).id;  // Ensure accessing the correct row/item

    // Dispatch addItem with the new record including the ID from the database
    dispatch(addItem({ id: newId, type, date, amount }));
  }

  FetchItems();
}

