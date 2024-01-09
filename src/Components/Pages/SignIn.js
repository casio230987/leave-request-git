import React, { useContext } from 'react';
import Layout1 from '../Layout1/Layout1';
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useGoogleOAuth } from '@react-oauth/google';
import { CoreDataContext } from '../../Context/LeaveRequestContext';
function SignIn() {
  const {coreData,coreDataDispatch} = useContext(CoreDataContext);
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // Send the authorization code to the backend server
     console.log(JSON.stringify(codeResponse));
     const response = fetch("https://queenslandraildev.service-now.com/api/queen/reactauth/auth",
     {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body:JSON.stringify(
        {
          gg_code:codeResponse.code
        }
      )
     }).then(response => response.json()).then(r  => {
      coreDataDispatch({
        type:'update_user_info',
        userData: r.result.user_info
      });
     });
     
    },
    onError: () => {
      // Handle login errors here
      console.error('Google login failed');
    },
    flow: 'auth-code',
  });

  return (<Layout1>
    <button onClick={() => googleLogin()}>
      Sign in with Google
    </button>
    <button onClick={()=>{
       coreDataDispatch({
        type:'update',
        userData: null
      });
    }}>Sign out</button>
 
    </Layout1>
  );

}

export default SignIn;