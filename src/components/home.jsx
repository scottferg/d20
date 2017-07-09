import React from "react";

import {connect} from "react-redux";

import {Menu, MainButton, ChildButton} from "react-mfb";

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

    onNewClick() {
        this.props.history.push("/character/new/race");
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
            var characterList = Object.keys({...this.props.list}).map(function(key) {
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
                    <ul id="character-list">
                        {characterList}
                    </ul>
                    <Menu effect="slidein-spring" method="click" position="br">
                        <MainButton
                            iconResting="mdi mdi-plus mdi-24px icon"
                            iconActive="mdi mdi-close mdi-24px icon"
                        />
                        <ChildButton
                            icon="mdi mdi-pencil mdi-24px icon"
                            label="Create Character"
                            onClick={() => { this.onNewClick() }}
                        />
                    </Menu>
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
