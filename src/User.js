import React from 'react'
import { auth } from './firebaseApp'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from './firebaseApp'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {

    const [currentUser] = useAuthState(auth);
    const usersRef = currentUser && db.collection('users').doc(currentUser.uid);
    const [userData] = useDocumentDataOnce(usersRef, { idField: 'id' });

    return (
        <UserContext.Provider
            value={{ currentUser, userData }}
        >
            {children}
        </UserContext.Provider>
    )

}