import LeaveRequestList from '../Pages/LeaveRequestList';
import { Reducer, useEffect } from 'react';
import { useReducer } from 'react';
import { LeaveRequestContextDispatchContext } from '../../Context/LeaveRequestContext';
import { CoreDataContext } from '../../Context/LeaveRequestContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import About from '../Pages/About';
import Home from '../Pages/Home';
import MyProfile from '../Pages/MyProfile';
import SignIn from '../Pages/SignIn';
import SecuredItem from '../Core/SecuredItem';
import { Navigate } from 'react-router-dom';
import {
  BrowserRouter as Router,

  Route, Routes,
  Link
} from "react-router-dom";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css"


let nextId = 3;
const initialRequest = [
  { id: 0, text: '2023: From 18-Dec to 20-Dec', done: true },
  { id: 1, text: '2024: From 03-Jan to 05-Jan', done: false },
  { id: 2, text: '2024: From 23-Feb to 28-Feb', done: false }
];

function App() {

  function requestReducer(requests, action) {
    switch (action.type) {
      case 'added': {
        return [...requests, {
          id: action.id,
          text: action.text,
          done: false
        }];
      }
      case 'changed': {
        /*  return requests.map(t => {
            if (t.id === action.request.id) {
              return action.request;
            } else {
              return t;
            }
          });*/

        var x = [...requests]
        for (var i = 0; i < x.length; i++) {
          if (x[i].id == action.request.id) {
            x[i].text = action.request.text;
          }
        }
        return x;
      }
      case 'deleted': {
        return requests.filter(t => t.id !== action.id);
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

  var dummyData = [];


  const [requests, dispatch] = useReducer(
    requestReducer,
    dummyData
  );

  function handleChangeRequest(request) {
    dispatch({
      type: 'changed',
      request: request
    });
  }

  function handleDeleteRequest(request) {
    dispatch({
      type: 'deleted',
      id: request.id
    });
  }

  const defaultCoreData =  {
    userData: null,
    portal: 'Service Management',
  };
  




  function coreDataReducer(originalCoreData, action) {
    // alert('in dispath');
    let newCoreData = {
      ...originalCoreData
    };
    switch (action.type) {
      case 'update': {
        if(action.coreData == null){
          // Set default values
          // Default value for Core Data
          newCoreData = defaultCoreData;
        } else {
          newCoreData = {...action.coreData};
        }
        
        break;
        //return action.coreData
      }
      case 'update_user_info': {
        // localStorage.setItem('user_info',action.userData);
        newCoreData.userData = action.userData? {...action.userData}:null;        
        break;
       // return newCoreData;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
    //Now store it as persistance data like a user session
    let newCoreDataStr = JSON.stringify(newCoreData);
    localStorage.setItem('coreData', newCoreDataStr);
    return newCoreData;
  
  }


  

  const [coreData, coreDataDispatch] = useReducer(
    coreDataReducer,
    defaultCoreData
  );

//[] : onLoad
  useEffect(() => {
    for (var i = 0; i < 9999; i++) {
      dummyData.push({
        id: i,
        text: "test_" + i,
        done: false
      })
    }

    let LSCoreData = null;
    let LSCoreDataStr = localStorage.getItem('coreData');
    if(LSCoreDataStr != null){
      LSCoreData = JSON.parse(LSCoreDataStr);
    }
    coreDataDispatch({
      type:"update",
      coreData:LSCoreData
    });
      
  
  }, []);


  return (
    <GoogleOAuthProvider clientId="876193607297-vod1j9np1oatnk9ghlrl2hblg47i3nu8.apps.googleusercontent.com">
      <LeaveRequestContextDispatchContext.Provider value={{ requests, dispatch }}>
        <CoreDataContext.Provider value={{ coreData, coreDataDispatch }}>
          <Router>
            <Routes>
              <Route path="/about" element={<About a="123" b="456"><span>xyz</span></About>} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/leaverequestlist" element={<SecuredItem accessGranted={!!coreData.userData}><LeaveRequestList /></SecuredItem>} />
              <Route path="/" element={<Home />} />
              <Route path="/MyProfile" element={<SecuredItem accessGranted={!!coreData.userData}><MyProfile /></SecuredItem>} />
              <Route path='*' element={<Navigate to='/' />} />
            </Routes></Router></CoreDataContext.Provider>
      </LeaveRequestContextDispatchContext.Provider>
    </GoogleOAuthProvider>

  );
}

export default App;

