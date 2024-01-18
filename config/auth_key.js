if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const firebaseConfig = {
  apiKey: process.env.FB_apiKey,
  authDomain: process.env.FB_authDomain,
  projectId: process.env.FB_projectId,
  storageBucket: process.env.FB_storageBucket,
  messagingSenderId: process.env.FB_messagingSenderId,
  appId: process.env.FB_appId,
  measurementId: process.env.FB_measurementId
}

module.exports = {firebaseConfig}