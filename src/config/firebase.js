import { initializeApp } from "firebase/app";

// Notification
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// Notification

//Google Auth
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithCredential,
} from "firebase/auth";
import { toast } from "react-toastify";
//Google Auth

const firebaseConfig = {
  apiKey: "AIzaSyA6DAIkeofTjm_uqWxk6sVm071pGsSj7wY",
  authDomain: "zambet-web-notification.firebaseapp.com",
  projectId: "zambet-web-notification",
  storageBucket: "zambet-web-notification.appspot.com",
  messagingSenderId: "225480844315",
  appId: "1:225480844315:web:75e54ad9da72325af244be",
};

const firebaseApp = initializeApp(firebaseConfig, "firebase-zambet-web-notif");

// Notification
const messaging = getMessaging(firebaseApp);
export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BMspOg3wn_r2ldCG61PBRV0yvn2lbhIwxnzjx87HNqWzrEU7QVsGnuN8gwRAEJGlN_Y98oXxauziSPx0YqQX83M",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
        return currentToken;
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
        return null;
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("onMessageListener", payload);
      toast.info(payload?.data?.body);
      resolve(payload);
    });
  });
// Notification

export const auth = getAuth(firebaseApp);

// Google Auth
const providerGoogle = new GoogleAuthProvider().addScope("email");

export const signInWithGoogle = async () => {
  let responseFromGoogle;
  await signInWithPopup(auth, providerGoogle)
    .then((result) => {
      responseFromGoogle = result;
      console.log("googel", result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const accessToken = result.accessToken;
      const providerId = result.providerId;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("providerId", providerId);
    })
    .catch((error) => {
      console.log(error);
    });

  return responseFromGoogle;
};
//Google Auth

// Facebook Auth

const providerFacebook = new FacebookAuthProvider().addScope("email");

export const signInWithFacebook = async () => {
  let responseFromFacebook;
  await signInWithPopup(auth, providerFacebook)
    .then((result) => {
      responseFromFacebook = result;
      console.log("facebook", result);
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
      const accessToken = result.accessToken;
      const providerId = result.providerId;

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("providerId", providerId);

      // // The signed-in user info.
      // const user = result.user;

      // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // const credential = FacebookAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;

      // ...
      return result;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log(error);
      // if (
      //   error.email &&
      //   error.credential &&
      //   error.code === "auth/account-exists-with-different-credential"
      // ) {
      //   //providers returns this array -> ["google.com"]
      //   // You need to sign in the user to that google account
      //   // with the same email.
      //   // In a browser you can call:
      //   let provider = new GoogleAuthProvider();
      //   provider.setCustomParameters({ login_hint: error.email });
      //   signInWithPopup(provider);
      //   // If you have your own mechanism to get that token, you get it
      //   // for that Google email user and sign in
      //   // signInWithCredential(googleCred)
      //   //   .then((user) => {
      //   //     // You can now link the pending credential from the first
      //   //     // error.
      //   //     user.linkWithCredential(error.credential);
      //   //   })
      //   //   .catch((error) => console.log(error));
      // }
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = FacebookAuthProvider.credentialFromError(error);

      // ...
    });

  return responseFromFacebook;
};

// Facebook Auth
