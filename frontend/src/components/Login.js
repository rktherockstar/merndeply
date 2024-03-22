import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';


function Login() {
  let EmailInputRef = useRef();
  let PasswordInputRef = useRef();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(()=>{
    validateToken();

  },[])

  let validateLogin = async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",EmailInputRef.current.value);
    dataToSend.append("password",PasswordInputRef.current.value);
    let reqOptions = {
      method:"POST",
      body:dataToSend,
    }

    let JSONData = await  fetch(`${window.location.origin}/login`,reqOptions);
    let JSOData = await JSONData.json();
    if(JSOData.status === "failure"){
      alert(JSOData.msg);
    }
    else{
      localStorage.setItem("token",JSOData.data.token);

      dispatch({type:"login",data:JSOData.data})
      navigate("/home");
    }
    console.log(JSOData);
  }

  let validateCredentials = ()=>{
   return async()=>{
    let dataToSend = new FormData();
    dataToSend.append("email",EmailInputRef.current.value);
    dataToSend.append("password",PasswordInputRef.current.value);
    let reqOptions = {
      method:"POST",
      body:dataToSend,
    }

    let JSONData = await  fetch(`${window.location.origin}/login`,reqOptions);
    let JSOData = await JSONData.json();
    if(JSOData.status === "failure"){
      alert(JSOData.msg);
    }
    else{
      localStorage.setItem("token",JSOData.data.token);

      dispatch({type:"login",data:JSOData.data})
      navigate("/home");
    }
    console.log(JSOData);
   }
  }
  let validateToken = async()=>{

    if(localStorage.getItem("token")){
      let dataToSend = new FormData();
      dataToSend.append("token",localStorage.getItem("token"));
  
      let reqOptions = {
        method:"POST",
        body:dataToSend,
      }
      let JSONData = await fetch(`${window.location.origin}/loginWithToken`,reqOptions);
  
      let JSOData = await JSONData.json();
      if(JSOData.status === "failure"){
        alert(JSOData.msg);
      }
      else{
       
  
        dispatch({type:"login",data:JSOData.data})
        navigate("/home");
      }
      console.log(JSOData);
    }
   
  }
  return (
    <div className='App'>
      <form>
       <h2>Login</h2>
       <div>
       <label>Email</label>
       <input ref={EmailInputRef}></input>
       </div>
       <div>
       <label>Password</label>
       <input ref={PasswordInputRef}></input>
       </div>
       <div>
        <button type='button' onClick={()=>{
          //validateLogin();
          dispatch(validateCredentials());
        }}>
          Login
        </button>
       </div>
      </form>
      <br />
      <Link to="/signup">Sign up</Link>
    </div>
  );
}

export default Login;
