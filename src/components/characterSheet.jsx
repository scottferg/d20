import React from "react";
import ReactResizeDetector from "react-resize-detector";

import RefreshIndicator from "material-ui/RefreshIndicator";

import {connect} from "react-redux";

import AbilityScores from "./abilityScores";
import Background from "./background";
import Combat from "./combat";
import ClassSpells from "./classSpells";
import Equipment from "./equipment";
import Portrait from "./portrait";
import Skills from "./skills";
import Spells from "./spells";
import Status from "./status";

import Player from "../models/player";

const receiveCharacter = (name, json) => {
    return {
        type: "GET_CHARACTER_SUCCESS",
        isLoading: false,
        character: new Player(json),
    };
};

const characterRequested = () => {
    return {
        type: "CHARACTER_REQUESTED",
        isLoading: true,
        selected: false,
    };
};

export function fetchCharacter(name) {
    return function(dispatch) {
        dispatch(characterRequested());

        var url = "/c/" + name;

        if (window.location.href.includes("localhost")) {
            url = "http://localhost:8080" + url;
        } else if (window.location.href.includes("192.")) {
            url = "http://192.168.86.185:8080" + url;
        }

        return fetch(url)
            .then(response => response.json())
            .then(json => dispatch(receiveCharacter(name, json)));
    };
}

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        isLoading: state.characterReducer.isLoading,
        selected: state.characterReducer.selected,
    };
};

class CharacterSheetComponent extends React.Component {
    // TODO: This is janky as shit
    shouldLoad() {
        // If the loader should be shown or if a character needs to be loaded
        // this traps direct linking to a character and initial load when using
        // the app
        if (
            this.props.selected ||
            this.props.isLoading ||
            this.props.character === undefined
        ) {
            return true;
        }

        // If a character has been selected before this will do a compare of
        // the route name and character name. Super fucking janky.
        if (this.props.character !== undefined && this.props.character.name.toLowerCase() !== this.props.match.params.name) {
            return true
        }

        return false;
    }

    render() {
        console.log(this.props);
        if (this.shouldLoad()) {
            console.log("loader");
            const style = {
                container: {
                    position: "relative",
                    margin: "auto",
                },
            };

            // If we're not currently requesting the character, request it
            if (!this.props.isLoading) {
                console.log("requesting");
                this.props.dispatch(
                    fetchCharacter(this.props.match.params.name),
                );
            }

            return (
                <div id="loading-indicator">
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor="#005453"
                        status="loading"
                        style={style.container}
                    />
                </div>
            );
        } else {
            return (
                <div className="character-sheet-container">
                    <div className="character-sheet">
                        <div id="left-container">
                            <Portrait character={this.props.character} />
                            <Status cls="mobile-status" />
                            <Combat character={this.props.character} />
                            <Equipment character={this.props.character} />
                        </div>
                        <div id="right-container">
                            <Status cls="desktop-status" />
                            <AbilityScores character={this.props.character} />
                            <Skills character={this.props.character} />
                        </div>
                    </div>
                    <div className="lower-sheet character-sheet">
                        <ClassSpells character={this.props.character} />
                        <Spells character={this.props.character} />
                    </div>
                    <div className="lower-sheet character-sheet">
                        <Background character={this.props.character} />
                    </div>
                    <ReactResizeDetector
                        handleWidth
                        handleHeight
                        onResize={this._onResize.bind(this)}
                    />
                </div>
            );
        }
    }

    _onResize(args) {
        console.log(args);
    }
}

const CharacterSheet = connect(mapStateToProps)(CharacterSheetComponent);

export default CharacterSheet;
