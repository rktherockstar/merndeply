import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  let FirstnameInputRef = useRef();
  let LastnameInputRef = useRef();
  let EmailInputRef = useRef();
  let PasswordInputRef = useRef();
  let mobileNoInputRef = useRef();
  let profilePicInputRef = useRef();
  let ageInputRef = useRef();
  let [profilePicPath, setProfilePicPath] = useState("./images/OIP.jpg");

  let onSignUpUsingJson = async () => {
    try {
      let dataToSend = {
        fn: FirstnameInputRef.current.value,
        ln: LastnameInputRef.current.value,
        age: ageInputRef.current.value,
        email: EmailInputRef.current.value,
        password: PasswordInputRef.current.value,
        mobile: mobileNoInputRef.current.value,
        profilePic: profilePicInputRef.current.value,
      };

      let JSONDataToSend = JSON.stringify(dataToSend);

      let myHeader = new Headers();
      myHeader.append("Content-Type", "application/json");

      let reqOptions = {
        method: "POST",
        body: JSONDataToSend,
        headers: myHeader,
      };

      let response = await fetch(`${window.location.origin}/signup`, reqOptions);
      let responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  let onSignUpUsingURLE = async () => {
    try {
      let myHeader = new Headers();
      myHeader.append("Content-type", "application/x-www-form-urlencoded");

      let dataToSend = new URLSearchParams();
      dataToSend.append("fn", FirstnameInputRef.current.value);
      dataToSend.append("ln", LastnameInputRef.current.value);
      dataToSend.append("age", ageInputRef.current.value);
      dataToSend.append("email", EmailInputRef.current.value);
      dataToSend.append("password", PasswordInputRef.current.value);
      dataToSend.append("mobileNo", mobileNoInputRef.current.value);
      dataToSend.append("profilePic", profilePicInputRef.current.value);

      let reqOptions = {
        method: "POST",
        headers: myHeader,
        body: dataToSend,
      };

      let JSONData = await fetch(`${window.location.origin}/signup`, reqOptions);
      let JSOData = await JSONData.json();
      console.log(JSOData);
    } catch (error) {
      console.error("Error during signup using URL encoding:", error);
    }
  };

  let onSignUpUsingFD = async () => {
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
        method: "POST",
        body: dataToSend,
      };

      let JSONData = await fetch(`${window.location.origin}/signup`, reqOptions);
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
      <form>
        <h2>Sign up</h2>
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
          <input ref={EmailInputRef}></input>
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
        
          <button type='button' onClick={() => { onSignUpUsingFD(); }}>Sign up (FormData)</button>
        </div>
      </form>
      <br />
      <Link to="/">Login</Link>
    </div>
  );
}

export default Signup;
