import Layout1 from "../Layout1/Layout1";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";

function About(probs){
    return (<Layout1>  
      This is about page
        </Layout1>);

}

<GoogleOAuthProvider clientId="876193607297-vod1j9np1oatnk9ghlrl2hblg47i3nu8.apps.googleusercontent.com">
        <GoogleLogin />
      
        </GoogleOAuthProvider>;

<GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;

export default About;