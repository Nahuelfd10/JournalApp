import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import {firebase} from "../firebase/firebase-config";

import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PrivateRoute } from "./PrivateRouter";
import { PublicRoute } from "./PublicRouter";
import { startLoadingNotes } from "../actions/notes";


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);


    useEffect(() => {
        firebase.auth().onAuthStateChanged( async (user) => {

            if (user?.uid) {
                dispatch(login( user.uid, user.displayName ));
                setIsLoggedIn( true );
                dispatch(startLoadingNotes(user.uid));

            } else {
                setIsLoggedIn( false );
            }

            setChecking(false);
            
        } )
    }, [setChecking, setIsLoggedIn])

    if (checking) {
        return(
            <h1> Espere... </h1>
        )
    }



    return (
        <Router>
            <div>
                <Switch>

                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={ isLoggedIn }
                    />

                    <PrivateRoute
                        exact
                        isAuthenticated={ isLoggedIn }
                        path="/"
                        component={JournalScreen}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}