import React from 'react';
import {useState} from 'react';

const Form = ({addStudent}) => {
    //const [users, setUsers] = useState([]);
    const [user, setUser] = useState({
      name:"",
    email:"",
    phone:"",
    });

    const changeHandler = (e)=>
    {
        setUser((oldState) => {
          return { ...oldState, [e.target.name]: e.target.value }
        })
      
    }
    const submitHandler = (e)=>
    {
      e.preventDefault();
      console.log(user)
      addStudent(user)
    }
    return (
        <div>
        <form style={styles.form}>
        <label style={styles.label}>
          Name
          <input name='name' type="text" value={user.name} style={styles.input} onChange={changeHandler}/>
        </label>
        <label style={styles.label}>
          Email
          <input name='email' type="text" value={user.email} style={styles.input}  onChange={changeHandler}/>
        </label>
        <label style={styles.label}>
          Phone
          <input name='phone' type="text" value={user.phone} style={styles.input}  onChange={changeHandler}/>
        </label>
        <button onClick={submitHandler} type="submit" style={styles.button}>
          Submit
        </button>
      </form>   
        </div>
    );

    
};
const styles = {
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f2f2f2',
      borderRadius: '5px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
    label: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '10px',
      width: '100%',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: '#fff',
      cursor: 'pointer',
      marginTop: '20px',
      boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
    },
  };
  
export default Form;