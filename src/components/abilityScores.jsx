import React from "react";

import Header from "./common";

class AbilityScoreHeader extends React.Component {
    render() {
        return (
            <tr className="ability-score-row">
                <td className="table-header narrow">Score</td>
                <td className="table-header">Ability</td>
                <td className="table-header narrow">Mod</td>
                <td className="table-header narrow">Save</td>
            </tr>
        );
    }
}

class AbilityScoreRow extends React.Component {
    render() {
        return (
            <tr className="ability-score-row">
                <td className="white-block">{this.props.ability.score}</td>
                <td className={this.props.rowColor}>
                    {this.props.ability.name}
                </td>
                <td className="white-block">{this.props.ability.mod}</td>
                <td className="white-block">{this.props.ability.save}</td>
            </tr>
        );
    }
}

class AbilityScores extends React.Component {
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
                    false,
                    true,
                ),
                save: that.props.character.formatAbilityBonus(
                    abbrev,
                    that.props.character.checkProficiency(abilities[abbrev]),
                ),
            };

            return <AbilityScoreRow key={abbrev} ability={props} rowColor={rowColor()} />;
        });

        return (
            <div id="ability-scores" className="narrow-module">
                <Header name="Ability Scores" />
                <table className="ability-score-table">
                    <tbody>
                        <AbilityScoreHeader />
                        {abilitiesList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default AbilityScores;
