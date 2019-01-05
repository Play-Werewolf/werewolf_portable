// Authentication module

export const config = {
    apiKey: "censored",
    authDomain: "wait-what.firebaseapp.com",
    databaseURL: "https://wait-what.firebaseio.com",
    projectId: "wait-what",
    storageBucket: "wait-what.appspot.com",
    messagingSenderId: "censored"
};

export const init = () => {
    firebase.initializeApp(config);
};