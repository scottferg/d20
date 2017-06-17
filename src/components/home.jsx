import React from "react";

import {connect} from "react-redux";

import {Title} from "./common";
import Portrait from "./portrait";

import {db, auth} from "./app"

import {
    receiveCharacterList,
    characterListRequested,
    characterSelected,
} from "../actions/character";

const fetchCharacterList = () => {
    return function(dispatch) {
        dispatch(characterListRequested());

        var userId = auth.currentUser.uid;
        return db 
            .ref("/users/" + userId + "/characters")
            .once("value")
            .then(snapshot => dispatch(receiveCharacterList(snapshot.val())));
    };
}

class HomeComponent extends React.Component {
    onCharacterSelect(route) {
        this.props.dispatch(characterSelected());
        this.props.history.push(route);
    }

    render() {
        if (this.props.list !== undefined) {
            var that = this;
            var characterList = Object.keys(this.props.list).map(function(key) {
                var character = that.props.list[key];

                var route = "/character/" + key.toLowerCase();

                return (
                    <li
                        key={key}
                        className="loader-container"
                        onClick={() => that.onCharacterSelect(route)}>
                        <Portrait character={character} />
                    </li>
                );
            });

            return (
                <div id="home">
                    <Title />
                    <ul id="character-list">
                        {characterList}
                    </ul>
                </div>
            );
        } else {
            this.props.dispatch(fetchCharacterList());
            return null;
        }
    }
}

export const Home = connect((s, p) => {
    return {list: s.characterReducer.list};
})(HomeComponent);
