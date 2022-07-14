import {
  getAuth,
  fetchSignInMethodsForEmail,
  EmailAuthProvider,
  linkWithCredential,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// firebase config

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpmSHkJBlxwAwlr2EG_iIUCB7pXvKVJd4",
  authDomain: "passwordless-login-d41e6.firebaseapp.com",
  projectId: "passwordless-login-d41e6",
  storageBucket: "passwordless-login-d41e6.appspot.com",
  messagingSenderId: "866915814748",
  appId: "1:866915814748:web:ececff7ee57ce358904599",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

chrome.runtime.onMessage.addListener((message, tabId, resp) => {
  resp({ a: "true" });
  console.log(message);

  if (message.text) {
    let email = message.text;

    const actionCodeSettings = {
      // URL you want to redirect back to. The domain (www.example.com) for this
      // URL must be in the authorized domains list in the Firebase Console.
      url: "https://www.example.com/finishSignUp?cartId=1234",
      // This must be true.
      handleCodeInApp: true,
      iOS: {
        bundleId: "com.example.ios",
      },
      android: {
        packageName: "com.example.android",
        installApp: true,
        minimumVersion: "12",
      },
      dynamicLinkDomain: "example.page.link",
    };

    // main function that send eamil link to server

    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", email);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });

    // // sign with mail

    // // Confirm the link is a sign-in with email link.

    // if (isSignInWithEmailLink(auth, window.location.href)) {
    //   // Additional state parameters can also be passed via URL.
    //   // This can be used to continue the user's intended action before triggering
    //   // the sign-in operation.
    //   // Get the email if available. This should be available if the user completes
    //   // the flow on the same device where they started it.

    //   // The client SDK will parse the code from the link for you.
    //   signInWithEmailLink(auth, email, window.location.href)
    //     .then((result) => {
    //       // Clear email from storage.
    //       window.localStorage.removeItem("emailForSignIn");
    //       // You can access the new user via result.user
    //       // Additional user info profile not available via:
    //       // result.additionalUserInfo.profile == null
    //       // You can check if the user is new or existing:
    //       // result.additionalUserInfo.isNewUser
    //     })
    //     .catch((error) => {
    //       // Some error occurred, you can inspect the code: error.code
    //       // Common errors could be invalid email and invalid or expired OTPs.
    //     });
    // }

    // // after email send

    // // Construct the email link credential from the current URL.
    // const credential = EmailAuthProvider.credentialWithLink(
    //   email,
    //   window.location.href
    // );

    // // Link the credential to the current user.

    // linkWithCredential(auth.currentUser, credential)
    //   .then((usercred) => {
    //     // The provider is now successfully linked.
    //     // The phone user can now sign in with their phone number or email.
    //   })
    //   .catch((error) => {
    //     // Some error occurred.
    //   });

    // // Fetch email and pass

    // // After asking the user for their email.

    // fetchSignInMethodsForEmail(auth, email)
    //   .then((signInMethods) => {
    //     // This returns the same array as fetchProvidersForEmail but for email
    //     // provider identified by 'password' string, signInMethods would contain 2
    //     // different strings:
    //     // 'emailLink' if the user previously signed in with an email/link
    //     // 'password' if the user has a password.
    //     // A user could have both.
    //     if (
    //       signInMethods.indexOf(
    //         EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD
    //       ) != -1
    //     ) {
    //       // User can sign in with email/password.
    //     }
    //     if (
    //       signInMethods.indexOf(EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD) !=
    //       -1
    //     ) {
    //       // User can sign in with email/link.
    //     }
    //   })
    //   .catch((error) => {
    //     // Some error occurred, you can inspect the code: error.code
    //   });

    console.log(document.body);
    document.body.style.backgroundColor = "red";
    document.body.style.color = "white";
  }
});
