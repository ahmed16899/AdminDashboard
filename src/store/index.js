import {createStore} from 'redux'
import {createSlice , configureStore} from '@reduxjs/toolkit'
const initialState =  {}
const counterSlice = createSlice({
    name:'userData',
    initialState,
    reducers:{
        increment(state , action){
            //state.userData = state.counter + action.payload
            state.userData = {...action.payload}
            console.log(   state.userData)

        }
    }
},
/*{
name:'isAuth',
initialState:false,
reducers:{
    auth(state , action){
        //state.userData = state.counter + action.payload
        state.isAuth = action.payload
        //console.log(   state.userData)

    }
}
},*/

)

const initialAuthState={}
const authSlice = createSlice(  
{
name:'isAuth',
initialState:initialAuthState,
reducers:{
    login(state){
        //state.userData = state.counter + action.payload
        state.isAuth = true
        //console.log(   state.userData)

    },
    logout(state){
        //state.userData = state.counter + action.payload
        state.isAuth = false
        //console.log(   state.userData)

    }
}
},

)
/*const counterReducer = (state = {counter:0},action) =>{
    if(action.type === 'increment')
    {
        return{
            counter:state.counter +action.amount
        }
    }
    if(action.type === 'decrement')
    {
        return{
            counter:state.counter -1
        }
    }
    return state
}*/
//const store = createStore(counterReducer);
//const store = createStore(counterSlice.reducer);

const store = configureStore({
    reducer:{userData:counterSlice.reducer , isAuth:authSlice.reducer},
});

/*const store = configureStore({
    reducer:counterSlice.reducer
});*/
export const counterActions = counterSlice.actions
export const authActions = authSlice.actions

export default store
 