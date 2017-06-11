import React from "react";
import Header from "./common";

class CombatTopHeader extends React.Component {
    render() {
        return (
            <tr className="combat-row">
                <td className="table-header centered">Initiative</td>
                <td className="table-header centered">Armor Class</td>
                <td className="table-header centered">Speed</td>
            </tr>
        );
    }
}

class CombatBottomHeader extends React.Component {
    render() {
        return (
            <tr className="combat-row">
                <td className="table-header centered">Passive Perception</td>
                <td className="table-header centered">Proficiency</td>
                <td className="table-header centered">Inspiration</td>
            </tr>
        );
    }
}

class CombatRow extends React.Component {
    render() {
        var cells = this.props.values.map(function(value, index) {
            return <td key={index} className="white-block">{value}</td>;
        });

        return (
            <tr className="combat-row">
                {cells}
            </tr>
        );
    }
}

class Combat extends React.Component {
    abilityBonus(ability) {
        return Math.ceil((ability - 9.5) / 2.0) - 1;
    }

    render() {
        var that = this;

        var firstRow = function() {
            var initiative = that.props.character.initiative();
            // TODO
            var ac = 10 + that.props.character.ac_mod;
            var speed =
                that.props.character.race.speed +
                that.props.character.speed_mod;
            return [initiative, ac, speed];
        };

        var secondRow = function() {
            var passivePerception = that.props.character.passivePerception();
            var proficiency = that.props.character.proficiencyBonus();
            var inspiration = that.props.character.inspiration;
            return [passivePerception, proficiency, inspiration];
        };

        return (
            <div id="combat">
                <Header name="Combat" />
                <table className="combat-table">
                    <tbody>
                        <CombatTopHeader />
                        <CombatRow values={firstRow()} />
                        <CombatBottomHeader />
                        <CombatRow values={secondRow()} />
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Combat;
