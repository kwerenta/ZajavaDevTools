import React, { useContext, useEffect } from "react";
import '../App.css'
import { withRouter, Redirect } from "react-router";

import { provider, auth } from '../firebaseApp'
import { UserContext } from "../User"
import Button from '@material-ui/core/Button'
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const Login = (props) => {

    const { state } = useLocation();

    const handleLogin = () => {
        auth.signInWithPopup(provider);
    }

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser) {
            props.setNavbar(true);
        }
    }, [currentUser])

    if (currentUser) {
        return <Redirect to={state?.from || '/'} />;
    }

    return (
        <div>
            <section className="loggedOut">
                <Button variant="contained" color="primary" size="large" onClick={handleLogin}>Zaloguj się przez konto Google</Button>
            </section>
        </div>
    );
};

export default withRouter(Login);