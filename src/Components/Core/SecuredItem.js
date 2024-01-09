import React from 'react'

import { Redirect, Route } from 'react-router-dom'
import SignInNotice from '../Pages/SingInNotice';

const SecuredItem = (probs) => {

  // Add your own authentication on the below line.
  const accessGranted = probs.accessGranted;
  if(accessGranted)
    return <>{probs.children}</>;
  return <SignInNotice/>
}

export default SecuredItem