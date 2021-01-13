import React, { useContext } from "react"
import { Route, Redirect } from "react-router-dom"
import { UserContext } from "../User"

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
    const { currentUser } = useContext(UserContext);
    return (
        <Route
            {...rest}
            render={routeProps =>
                currentUser ? (
                    <RouteComponent {...routeProps} />
                ) : (
                        <Redirect to={{ pathname: '/login', state: { from: routeProps.location } }} />
                    )
            }
        />
    );
};


export default PrivateRoute