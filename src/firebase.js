//IMPORTS
import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


//FIREBASE-CONFIGS
let firebaseConfig = {
    apiKey: "AIzaSyBr4qwG8pkxfnzm9JbDuG0lIzzsw8jFvts",
    authDomain: "cursoreact-4a8ba.firebaseapp.com",
    databaseURL: "https://cursoreact-4a8ba.firebaseio.com",
    projectId: "cursoreact-4a8ba",
    storageBucket: "cursoreact-4a8ba.appspot.com",
    messagingSenderId: "943035584852",
    appId: "1:943035584852:web:dc7889148c00ac1041f8c1",
    measurementId: "G-MEZZXH5JGM"
};

//FIREBASE FUNCTIONS
class Firebase {

    //Initialize Firebase
    constructor(){
        app.initializeApp(firebaseConfig);

        //when cal for app it will be "app.database()" and permite that be acess for the other locals
        this.app = app.database();

        this.storage = app.storage();

    }

    //User login
    login(email, password){
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    //User logout
    logout(){
        return app.auth().signOut();
    }

    //Register a new user. How can have delay, async and await make he wait this requisition.
    async register(nome, email, password){
        await app.auth().createUserWithEmailAndPassword(email, password)
    
        const uid = app.auth().currentUser.uid;
        
        //new user register
        return app.database().ref('usuarios').child(uid).set({
            nome: nome
        })
    }

    //Check connection.
    isInitialized(){
        return new Promise(resolve =>{
            app.auth().onAuthStateChanged(resolve);
        });
    }

    //Check if is logged in
    getCurrent(){
        return app.auth().currentUser && app.auth().currentUser.email
    }

    //Return Uid
    getCurrentUid(){
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    //Catch user
    async getUserName(callback){
        if(!app.auth().currentUser){
            return null;
        }

        const uid = app.auth().currentUser.uid;
        await app.database().ref('usuarios').child(uid)
            .once('value').then(callback);
    }

    deletePost(e){
        const key = e;
        app.database().ref(`posts/${key}`).remove();
    }

    
}

export default new Firebase();
