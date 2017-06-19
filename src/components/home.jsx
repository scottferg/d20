import React from "react";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import RefreshIndicator from "material-ui/RefreshIndicator";

import {Title} from "./common";
import Portrait from "./portrait";
import Player from "../models/player";

import {
    characterSelected,
    fetchCharacterList,
} from "../actions/character";

class HomeComponent extends React.Component {
    onCharacterSelect(character, route) {
        this.props.dispatch(characterSelected(new Player(character)));
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
                        onClick={() => that.onCharacterSelect(character, route)}>
                        <Portrait character={character} />
                    </li>
                );
            });

            return (
                <div id="home">
                    <Title />
                    <Link to="/character/new/race">Create</Link>
                    <ul id="character-list">
                        {characterList}
                    </ul>
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
