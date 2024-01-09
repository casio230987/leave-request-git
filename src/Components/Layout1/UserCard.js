import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import { useState } from "react";
import CustomLink from "../Core/CustomLink";
import { useContext } from "react";
import { CoreDataContext } from "../../Context/LeaveRequestContext";
import { useGoogleLogin } from "@react-oauth/google";
function UserInfo({ userData }) {

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
      console.log(JSON.stringify(r));
      let newCoreData = coreData;
      newCoreData.jwt = r.result.jwt;
      newCoreData.userData = r.result.user_info;
      coreDataDispatch({
        type:'update',
        coreData: newCoreData
      });
     });
     
    },
    onError: () => {
      // Handle login errors here
      console.error('Google login failed');
    },
    flow: 'auth-code',
  });

  if (userData == null) {
   return (<div className="mb-2 float-end">
      <Button onClick={() => googleLogin()}>Sign In</Button>
    </div>);
  } else {
    return <>
      <div className="mb-2 float-end">
        <Dropdown as={ButtonGroup} size="lg">
          <Button
           
            variant="primary"
          >
            {userData.full_name} ({userData.email})
          </Button>
          <Dropdown.Toggle
            split
            variant="primary"
            id="dropdown-split-basic"
          />
          <Dropdown.Menu>
            <Dropdown.Item eventKey="1">
              <CustomLink href="/MyProfile" activeClassName="abc">My Profile</CustomLink>
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              My Activity
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              My Approval
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="4" onClick={()=>{
       coreDataDispatch({
        type:'update',
        coreData: null
      });}}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div></>
  }



}
export default UserInfo;