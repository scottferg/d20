import React from 'react';

import AbilityScores from './abilityScores'
import Background from './background'
import Combat from './combat'
import ClassSpells from './classSpells'
import Equipment from './equipment'
import Portrait from './portrait'
import Skills from './skills'
import Spells from './spells'

class CharacterSheet extends React.Component {
    constructor() {
        super();
        this.state = {
            character: null,
        };

        var url = "/character"

        if (window.location.href.includes("localhost")) {
            url = "http://localhost:8080" + url
        }

        var req = new Request(url);
        var that = this;

        fetch(req).then(function(resp) {
            return resp.json().then(function(json) {
                that.setState({character: json});
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
                            <Combat character={this.state.character} />
                            <Equipment character={this.state.character} />
                        </div>
                        <AbilityScores character={this.state.character} />
                        <Skills character={this.state.character} />
                    </div>
                    <div className="character-sheet lower-sheet">
                        <ClassSpells character={this.state.character} />
                        <Spells character={this.state.character} />
                    </div>
                    <div className="character-sheet lower-sheet">
                        <Background character={this.state.character} />
                    </div>
                </div>
            );
        } else {
            return (
                <div />
            );
        }
    }
}

export default CharacterSheet;
