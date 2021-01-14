import React, { useState } from "react";
import "./App.css";
import { UserProvider } from "./User";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import PrivateRoute from "./components/PrivateRoute";

import Navigation from "./components/Navigation";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Quests from "./pages/Quests";
import Items from "./pages/Items";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        divider: "rgba(255, 255, 255, 0.12)",
        primary: {
            main: "#2196f3",
            contrastText: "#fff",
        },
        secondary: {
            main: "#f50057",
            contrastText: "#fff",
        },
    },
});

function App() {
    const [navbar, setNavbar] = useState(false);
    return (
        <UserProvider>
            <ThemeProvider theme={theme}>
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
}
export default App;
