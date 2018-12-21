// Authentication module

export const config = {
    apiKey: "AIzaSyDf42wJH19HjKFgtBVhUhBy-79nifWVNRU",
    authDomain: "rtds-server.firebaseapp.com",
    databaseURL: "https://rtds-server.firebaseio.com",
    projectId: "rtds-server",
    storageBucket: "rtds-server.appspot.com",
    messagingSenderId: "1091630761256"
};

export const init = () => {
    firebase.initializeApp(config);
};