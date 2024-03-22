import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

function TopNavigation() {
  let navigate = useNavigate();
  let storeObj = useSelector((store) => store);

  useEffect(() => {
    if (!storeObj.loginReducer.userDetails || !storeObj.loginReducer.userDetails.email) {
      navigate("/");
    }
  }, [storeObj.loginReducer.userDetails, navigate]);

  let onDelete = async () => {
    localStorage.clear();
    let dataToSend = new FormData();
    dataToSend.append("email", storeObj.loginReducer.userDetails.email);
    let reqOptions = {
      method: "DELETE",  
      body: dataToSend,
    };
    let JSONData = await fetch(`${window.location.origin}/deleteProfile`, reqOptions);  
    let JSOData = await JSONData.json();
    if (JSOData.status === 'success') {
      alert(JSOData.msg);
    } else {
      alert(JSOData.msg);
    }
  };
  

  return (
    <nav>
      {storeObj.loginReducer.userDetails && storeObj.loginReducer.userDetails.email && (
        <>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          
          <NavLink to="/editProfile">EditProfile</NavLink>
          <NavLink to="/" onClick={()=>{
            onDelete();
          }}>Delete Profile</NavLink>

          <NavLink to="/" onClick={()=>{
            localStorage.clear();
          }}>Logout</NavLink>
        </>
      )}
    </nav>
  );
}

export default TopNavigation;
