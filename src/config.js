import firebase from "firebase";

const config = {
  apiKey: "AIzaSyBApeDFcUMqc_e--HrLRcRf_CAwmdn62yM",
  authDomain: "employees-ac267.firebaseapp.com",
  databaseURL: "https://employees-ac267.firebaseio.com",
  projectId: "employees-ac267",
  storageBucket: "employees-ac267.appspot.com",
  messagingSenderId: "989396073777",
  appId: "1:989396073777:web:31a499fca0a6507a280410"
};
const fire = firebase.initializeApp(config);
export default fire;
