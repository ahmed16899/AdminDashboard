import React from 'react';
import Form from './Form';
import Table from './Table';
import {useState} from 'react';
import { useSelector , useDispatch} from 'react-redux';
import {counterActions} from '../store/index.js'
const Home = () => {
    /*const counter = useSelector(state=>state.userData.userData)
    const dispatch = useDispatch ();
    const increment = () =>{
      //dispatch({type:'increment' , amount:5})
      dispatch(counterActions.increment(5))
    }
    const decrement = () =>{
      //dispatch({type:'decrement'})
    }*/
    const [users, setUsers] = useState([
        {
          name:"a",
        email:"d",
        phone:"s",
        }
      ]);
      const addStudent = (user)=>
      {
        users.push(user)
        setUsers(()=>{
          //console.log(user)
    
          return[ ...users ]
    
        })
        //console.log(users)
      }
    return (
        <>
     

         <Form addStudent={addStudent}/>
         <Table users={users}/>
        </>
    );
};

export default Home;