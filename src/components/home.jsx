import React from "react";

import {connect} from "react-redux";

import RefreshIndicator from "material-ui/RefreshIndicator";

import {Title} from "./common";
import Portrait from "./portrait";
import CreateCharacter from "./createCharacter";

import {
    characterSelected,
    toggleCreateCharacterDialog,
    fetchCharacterList,
} from "../actions/character";

class HomeComponent extends React.Component {
    onCharacterSelect(route) {
        this.props.dispatch(characterSelected());
        this.props.history.push(route);
    }

    componentDidMount() {
        this.props.dispatch(fetchCharacterList());
    }

    render() {
        if (this.props.isLoading) {
            const style = {
                container: {
                    position: "relative",
                    margin: "auto",
                },
            };

            return (
                <div id="home">
                    <Title />
                    <div className="loading-spinner">
                        <RefreshIndicator
                            size={50}
                            left={0}
                            top={0}
                            loadingColor="#005453"
                            status="loading"
                            style={style.container}
                        />
                    </div>
                </div>
            );
        } else {
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
                    <a
                        onClick={() => {
                            this.props.dispatch(
                                toggleCreateCharacterDialog(true),
                            );
                        }}>
                        Create
                    </a>
                    <ul id="character-list">
                        {characterList}
                    </ul>
                    <CreateCharacter />
                </div>
            );
        }
    }
}

export const Home = connect((s, p) => {
    return {
        list: s.characterReducer.list,
        isLoading: s.characterReducer.isLoading,
    };
})(HomeComponent);
