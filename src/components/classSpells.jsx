import React from "react";
import Header from "./common";

class ClassSpellsHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="table-header">Class</td>
                <td className="table-header narrow">Ability</td>
                <td className="table-header narrow">Attack</td>
                <td className="table-header narrow">DC</td>
            </tr>
        );
    }
}

class ClassSpellsRow extends React.Component {
    render() {
        return (
            <tr>
                <td className={this.props.rowColor}>{this.props.cls.name}</td>
                <td className="white-block">{this.props.cls.ability}</td>
                <td className="white-block">{this.props.cls.attack}</td>
                <td className="white-block">{this.props.cls.dc}</td>
            </tr>
        );
    }
}

class ClassSpells extends React.Component {
    render() {
        var light = false;
        var that = this;

        var rowColor = function() {
            light = !light;
            return light ? "light-block" : "dark-block";
        };

        var classSpellsList = this.props.character.classes.map(function(cls, index) {
            var props = {
                name: cls.cls.name,
                ability: "N/A",
                attack: "0",
                dc: "0",
            };

            switch (cls.cls.spellAbility) {
                case "Wisdom":
                    props.ability = "WIS";
                    props.attack = that.props.character.formatAbilityBonus(
                        "wis",
                        true,
                        true,
                        true,
                    );
                    props.dc = that.props.character.spellDC("wis");
                    break;
                case "Intelligence":
                    props.ability = "INT";
                    props.attack = that.props.character.formatAbilityBonus(
                        "int",
                        true,
                        true,
                        true,
                    );
                    props.dc = that.props.character.spellDC("int");
                    break;
                case "Charisma":
                    props.ability = "CHA";
                    props.attack = that.props.character.formatAbilityBonus(
                        "cha",
                        true,
                        true,
                        true,
                    );
                    props.dc = that.props.character.spellDC("cha");
                    break;
                default:
                    break;
            }
            return <ClassSpellsRow key={index} cls={props} rowColor={rowColor()} />;
        });

        return (
            <div id="spells" className="full-module">
                <Header name="Spells" />
                <table className="class-spells-table">
                    <tbody>
                        <ClassSpellsHeader />
                        {classSpellsList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClassSpells;
