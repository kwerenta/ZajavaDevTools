import React, { useState } from 'react'
import './App.css'
import Navigation from './components/Navigation'
import Dashboard from './pages/Dashboard'
import Quests from './pages/Quests'
import Items from './pages/Items'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'
import { useAuthState } from 'react-firebase-hooks/auth'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyADA8VtWr2tp0er8247c0dP1Maq-AyY4pU",
    authDomain: "zajavacraft.firebaseapp.com",
    projectId: "zajavacraft",
    storageBucket: "zajavacraft.appspot.com",
    messagingSenderId: "1016401049889",
    appId: "1:1016401049889:web:ae8529958a83319ccce660",
    measurementId: "G-3ERQ1E9ELZ"
  })
} else {
  firebase.app();
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore();
const analytics = firebase.analytics();

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    divider: 'rgba(255, 255, 255, 0.12)',
    primary: {
      main: '#2196f3',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#fff',
    },
  },
});

function App() {

  const [user] = useAuthState(auth);
  const [screen, setScreen] = useState("Pulpit");
  function activeScreen() {
    switch (screen) {
      case "Pulpit":
        return <Dashboard user={user} db={db} />
      case "Zadania":
        return <Quests db={db} user={user} />
      case "Przedmioty":
        return <Items />
      default:
        return "Błąd krytyczny!"
    }
  }

  function logOut() {
    auth.signOut();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {
          !user ?
            <section className="loggedOut">
              <Button variant="contained" color="primary" size="large" onClick={() => auth.signInWithPopup(provider)}>Zaloguj się przez konto Google</Button>
            </section>
            :
            <main className="loggedIn">
              <Navigation logOut={logOut} setScreen={setScreen} />
              {activeScreen()}
            </main>
        }
      </div>
    </ThemeProvider>
  );
}

export default App;
