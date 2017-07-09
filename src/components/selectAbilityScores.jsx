import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import FlatButton from "material-ui/FlatButton";

import {Header, NumberPicker} from "./common";
import {setNewAbilityScore} from "../actions/createCharacter";
import {setAbilityScore} from "../actions/character";

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        editing: false,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setAbilityScore: (abbrev, val) => {
            dispatch(setNewAbilityScore(abbrev, val));
        },
    };
};

const mapEditStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        editing: true,
    };
};

const mapEditDispatchToProps = dispatch => {
    return {
        setAbilityScore: (abbrev, val, character) => {
            dispatch(setAbilityScore(abbrev, val, character));
        },
    };
};

class AbilityScoreHeader extends React.Component {
    render() {
        return (
            <tr className="ability-score-row">
                <td className="picker-table-header">Score</td>
                <td className="table-header">Ability</td>
                <td className="table-header narrow">Mod</td>
                <td className="table-header narrow">Save</td>
            </tr>
        );
    }
}

class AbilityScoreRow extends React.Component {
    onScoreChange(val) {
        this.props.setAbilityScore(this.props.abbrev, val, this.props.character);
    }

    render() {
        return (
            <tr className="ability-score-row">
                <td className="picker-cell">
                    <NumberPicker
                        id={this.props.ability.name}
                        value={this.props.ability.score}
                        min={0}
                        max={20}
                        callback={val => {
                            this.onScoreChange(val);
                        }}
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
    onNext() {
        if (this.props.editing) {
            this.props.history.goBack();
            return;
        }

        this.props.history.push("/character/new/skills");
    }

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
                    setAbilityScore={that.props.setAbilityScore}
                    character={that.props.character}
                    rowColor={rowColor()}
                />
            );
        });

        var buttonLabel = (this.props.editing ? "FINISH" : "NEXT");

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
                    <div className="action-button-right create-action-right">
                        <FlatButton
                            label={buttonLabel}
                            onTouchTap={() => {
                                this.onNext();
                            }}
                            labelStyle={{fontSize: "8pt"}}
                        />
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

export const SelectAbilityScores = connect(mapStateToProps, mapDispatchToProps)(
    SelectAbilityScoresComponent,
);

export const EditAbilityScores = connect(
    mapEditStateToProps,
    mapEditDispatchToProps,
)(SelectAbilityScoresComponent);
