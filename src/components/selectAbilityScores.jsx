import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import TextField from "material-ui/TextField";

import {Header, NumberPicker} from "./common";
import {setAbilityScore} from "../actions/createCharacter"

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
    };
};

class AbilityScoreHeader extends React.Component {
    render() {
        return (
            <tr className="ability-score-row">
                <td className="table-header">Score</td>
                <td className="table-header">Ability</td>
                <td className="table-header narrow">Mod</td>
                <td className="table-header narrow">Save</td>
            </tr>
        );
    }
}

class AbilityScoreRow extends React.Component {
    onScoreChange(val) {
        this.props.dispatch(setAbilityScore(this.props.abbrev, val));
    }

    render() {
        return (
            <tr className="ability-score-row">
                <td>
                    <NumberPicker
                        id={this.props.ability.name}
                        value={this.props.ability.score}
                        min={0}
                        max={20}
                        callback={(val) => {this.onScoreChange(val)}}
                    />
                </td>
                <td className={this.props.rowColor}>
                    {this.props.ability.name}
                </td>
                <td className="white-block">{this.props.ability.mod}</td>
                <td className="white-block">{this.props.ability.save}</td>
            </tr>
        );
    }
}

class SelectAbilityScoresComponent extends React.Component {
    render() {
        const abilities = {
            str: "Strength",
            dex: "Dexterity",
            con: "Constitution",
            int: "Intelligence",
            wis: "Wisdom",
            cha: "Charisma",
        };
        var that = this;
        var light = false;

        var abilitiesList = Object.keys(abilities).map(function(abbrev) {
            var rowColor = function() {
                light = !light;
                return light ? "light-block" : "dark-block";
            };

            var props = {
                score: that.props.character[abbrev],
                name: abilities[abbrev],
                mod: that.props.character.formatAbilityBonus(
                    abbrev,
                    that.props.characterItems,
                    false,
                    true,
                ),
                save: that.props.character.formatAbilityBonus(
                    abbrev,
                    that.props.characterItems,
                    that.props.character.checkProficiency(abilities[abbrev]),
                ),
            };

            return (
                <AbilityScoreRow
                    key={abbrev}
                    ability={props}
                    abbrev={abbrev}
                    dispatch={that.props.dispatch}
                    rowColor={rowColor()}
                />
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Set Ability Scores" />
                    <div className="add-content-list">
                        <table className="ability-score-table">
                            <tbody>
                                <AbilityScoreHeader />
                                {abilitiesList}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ReactResizeDetector
                    handleWidth
                    handleHeight
                    onResize={this._onResize.bind(this)}
                />
            </div>
        );
    }

    _onResize(args) {
        console.log(args);
    }
}

const SelectAbilityScores = connect(mapStateToProps)(
    SelectAbilityScoresComponent,
);

export default SelectAbilityScores;
