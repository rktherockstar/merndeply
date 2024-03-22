import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import TopNavigation from './TopNavigation';
import { useSelector } from 'react-redux';

function EditProfile() {
    let FirstnameInputRef = useRef();
    let LastnameInputRef = useRef();
    let EmailInputRef = useRef();
    let PasswordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();
    let ageInputRef = useRef();
    let [profilePicPath, setProfilePicPath] = useState("./images/OIP.jpg");
  
  let storeObj = useSelector((store)=>{
    return store;
  })

  useEffect(() => {
    FirstnameInputRef.current.value = storeObj.loginReducer.userDetails.firstName;
    LastnameInputRef.current.value = storeObj.loginReducer.userDetails.lastName;
    ageInputRef.current.value = storeObj.loginReducer.userDetails.age;
    EmailInputRef.current.value = storeObj.loginReducer.userDetails.email;
   
  
    mobileNoInputRef.current.value = storeObj.loginReducer.userDetails.mobileNo;
    let profilePicPath = `${window.location.origin}/${storeObj.loginReducer.userDetails.profilePic}`;
    setProfilePicPath(profilePicPath);
  }, []);
  
  
    let onUpdateProfile = async () => {
      try {
        let dataToSend = new FormData();
        dataToSend.append("fn", FirstnameInputRef.current.value);
        dataToSend.append("ln", LastnameInputRef.current.value);
        dataToSend.append("age", ageInputRef.current.value);
        dataToSend.append("email", EmailInputRef.current.value);
        dataToSend.append("password", PasswordInputRef.current.value);
        dataToSend.append("mobileNo", mobileNoInputRef.current.value);
  
        for (let i = 0; i < profilePicInputRef.current.files.length; i++) {
          dataToSend.append("profilePic", profilePicInputRef.current.files[i]);
        }
  
        let reqOptions = {
          method: "PUT",
          body: dataToSend,
        };
  
        let JSONData = await fetch(`${window.location.origin}/updateProfile`, reqOptions);
        let JSOData = await JSONData.json();
        if(JSOData.status == "success"){
          alert(JSOData.msg);
        }
        console.log(JSOData);
      } catch (error) {
        console.error("Error during signup using FormData:", error);
      }
    };
  
  return (
    <div className='App'>
        <TopNavigation/>
      <form>
        <h2>EditProfile</h2>
        <div>
          <label>Firstname</label>
          <input ref={FirstnameInputRef}></input>
        </div>
        <div>
          <label>Lastname</label>
          <input ref={LastnameInputRef}></input>
        </div>
        <div>
          <label>Age</label>
          <input ref={ageInputRef}></input>
        </div>
        <div>
          <label>Email</label>
          <input ref={EmailInputRef} readOnly></input>
        </div>
        <div>
          <label>Password</label>
          <input ref={PasswordInputRef}></input>
        </div>
        <div>
          <label>Mobile No.</label>
          <input ref={mobileNoInputRef}></input>
        </div>
        <div>
          <label>Profile pic</label>
          <input
            ref={profilePicInputRef}
            type='file'
            onChange={(e) => {
              let selectedImagePath = URL.createObjectURL(e.target.files[0]);
              setProfilePicPath(selectedImagePath);
            }}
          ></input>
          <br></br>
          <img
            src={profilePicPath}
            className='profilePicPreview'
            alt='Profile Preview'
          ></img>
        </div>

        <div>
        
          <button type='button' onClick={() => { onUpdateProfile(); }}>update</button>
        </div>
      </form>
      <br />
      <Link to="/">Login</Link>
    </div>
  );
  
}

export default EditProfile