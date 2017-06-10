import React from 'react';
import ReactResizeDetector from 'react-resize-detector';

import { connect } from 'react-redux'

import AbilityScores from './abilityScores'
import Background from './background'
import Combat from './combat'
import ClassSpells from './classSpells'
import Equipment from './equipment'
import Portrait from './portrait'
import Skills from './skills'
import Spells from './spells'
import Status from './status'

import Player from '../models/player'

const setCharacter = (character) => {
    return {
        type: 'SET_CHARACTER',
        character: character,
    } 
}

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character
    }
}

class CharacterSheetView extends React.Component {
    constructor() {
        super();
        this.state = {
            character: null,
        };

        var url = "/character"

        if (window.location.href.includes("localhost")) {
            url = "http://localhost:8080" + url
        } else if (window.location.href.includes("192.")) {
            url = "http://192.168.86.185:8080" + url
        }

        var req = new Request(url);
        var that = this;

        fetch(req).then(function(resp) {
            return resp.json().then(function(json) {
                var character = new Player(json);

                that.setState({character: character});
                that.props.dispatch(setCharacter(character));
            });
        });
    }

    render() {
        if (this.state.character) {
            return (
                <div>
                    <div className="character-sheet">
                        <div id="left-container">
                            <Portrait character={this.state.character} />
                            <Status cls="mobile-status" />
                            <Combat character={this.state.character} />
                            <Equipment character={this.state.character} />
                        </div>
                        <div id="right-container">
                            <Status cls="desktop-status" />
                            <AbilityScores character={this.state.character} />
                            <Skills character={this.state.character} />
                        </div>
                    </div>
                    <div className="character-sheet lower-sheet">
                        <ClassSpells character={this.state.character} />
                        <Spells character={this.state.character} />
                    </div>
                    <div className="character-sheet lower-sheet">
                        <Background character={this.state.character} />
                    </div>
                    <ReactResizeDetector handleWidth handleHeight onResize={this._onResize.bind(this)} />
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }

    _onResize() {}
}

const CharacterSheet = connect(mapStateToProps)(CharacterSheetView)

export default CharacterSheet;
