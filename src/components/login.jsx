import React from "react";

import GoogleButton from "react-google-button";
import {Title} from "./common";
import {auth, provider} from "./app"

export class Login extends React.Component {
    onLoginClick() {
        auth.signInWithRedirect(provider);
    }

    render() {
        return (
            <div id="home">
                <Title />
                <div className="login-button">
                    <GoogleButton onClick={this.onLoginClick} />
                </div>
            </div>
        );
    }
}
