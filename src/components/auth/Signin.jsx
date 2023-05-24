import React, { useEffect } from 'react';
import '../../index.css';
import { useState } from 'react';
import axios from "axios";
import { environment } from '../../api';
import { useToasts } from 'react-toast-notifications'
import { useSelector , useDispatch} from 'react-redux';
import {counterActions , authActions} from '../../store/index.js'
//import { useHistory } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();

  const [credential, setcredential] = useState('');
  const [validatecredential, setvalidatecredential] = useState(false);
  const [iscredentialTouched, setIscredentialTouched] = useState(false);
  const { addToast } = useToasts()
  const userData = useSelector(state=>state.userData.userData)
  const isAuth = useSelector(state=>state.isAuth.isAuth)

  const dispatch = useDispatch ();
  const [password, setPassword] = useState('');
  const [validatePassword, setvalidatePassword] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  console.log( userData, 'dataaaaa')
  //console.log(  Object.prototype.hasOwnProperty.call(userData,'_id'))
  console.log(isAuth, 'dataaaaa')

  useEffect(() => {
    if (isAuth ) {
        navigate('/admin/viewusers');
    }
},[isAuth])

  const changcredential = (e) => {
    setcredential(e.target.value)
    validatcredential(e.target.value)
  }

  const changePassword = (e) => {
    setPassword(e.target.value)
    validatePasswordFun(e.target.value)
  }

  const handlecredentialBlur = () => {
    setIscredentialTouched(true);
    //validatcredential(credential)
    //console.log(iscredentialTouched)
  };

  const handlePasswordBlur = () => {
    setIsPasswordTouched(true);
    //validatcredential(credential)
    //console.log(iscredentialTouched)
  };

  const validatcredential = (mail) => {
    if (mail.length > 4) {
      setvalidatecredential(true)
    }
    else {
      setvalidatecredential(false)

    }
  }

  const validatePasswordFun = (password) => {
    if (password.length > 4) {
      setvalidatePassword(true)
    }
    else {
      setvalidatePassword(false)
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(credential, password)
    axios.post(`${environment.ApiUrl}/signin`, { credential, password }).then((response) => {
      //console.log(response.data)
      if(response.data.message==="user signed in successfully")
      {
        addToast('Sign in Successfully', {
          appearance: 'success',
          autoDismiss: true,
        })
        dispatch(counterActions.increment(response.data.user))
        dispatch(authActions.login())
        
        navigate('/admin/viewusers');
      }
      else
      {
        
        addToast(response.data, {
          appearance: 'error',
          autoDismiss: true,
        })
      }
      
    });
  };

  return (
    <div className="section-bg-light p-5">
      <form onSubmit={handleSubmit} className="w-50 mx-auto py-5 ">
        <h2 className="text-center cH2">Sign In </h2>
        <label className="my-2" >credential </label>
        <input id="credential" className="form-control" type="text" value={credential} onChange={changcredential} onBlur={handlecredentialBlur} />
        {!validatecredential && iscredentialTouched &&
          <div className="alert alert-danger mt-2">
            <p className="m-0">Password must be more than 8 chars</p>
          </div>}
        <label htmlFor="password" className="my-2">Password</label>
        <input id="password" className="form-control" type="password" value={password} onChange={changePassword} onBlur={handlePasswordBlur} />
        {!validatePassword && isPasswordTouched &&
          <div className="alert alert-danger mt-2">
            <p className="m-0">Password must be more than 8 chars</p>
          </div>}

        <div className="text-center">
          <button className="btnCustomeStyle mt-5" disabled={!validatecredential || !validatePassword}>Sign In </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;