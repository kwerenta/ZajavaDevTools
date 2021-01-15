import React, { useState } from "react";
import "./App.css";
import { UserProvider } from "./User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoute from "./components/PrivateRoute";

import CssBaseline from "@material-ui/core/CssBaseline";
import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Items from "./pages/Items";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            contrastText: "#fff",
            light: "#63ccff",
            main: "#008ad4",
            dark: "#006ca0",
        },
        secondary: {
            light: "#f73378",
            main: "#f50057",
            dark: "#ab003c",
        },
    },
});

const App = () => {
    const [navbar, setNavbar] = useState(false);
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    {navbar && <Navigation setNavbar={setNavbar} />}
                    <Switch>
                        <Route exact path="/login">
                            <Login setNavbar={setNavbar} />
                        </Route>
                        <PrivateRoute exact path="/quests" component={Quests} />
                        <PrivateRoute exact path="/items" component={Items} />
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <Route path="*">
                            <h1>Błąd! Taka lokalizacja nie istnieje! 404 czy coś</h1>
                        </Route>
                    </Switch>
                </Router>
            </ThemeProvider>
        </UserProvider>
    );
};
export default App;
