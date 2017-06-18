import React from "react";

import {connect} from "react-redux";

import {Header} from "./common";

const mapStateToProps = (state, props) => {
    return {
        characterItems: state.itemInfoReducer.characterItems,
    };
};

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

class ClassSpellsComponent extends React.Component {
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
                        that.props.characterItems,
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
                        that.props.characterItems,
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
                        that.props.characterItems,
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

const ClassSpells = connect(mapStateToProps)(ClassSpellsComponent);

export default ClassSpells;
