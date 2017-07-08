import React from "react";

import Checkbox from "material-ui/Checkbox";
import FlatButton from "material-ui/FlatButton";

import {connect} from "react-redux";

import {Header} from "./common";

import {setNewSkill} from "../actions/createCharacter";
import {setSkill} from "../actions/character";

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        skills: state.createCharacterReducer.character.skills,
        editing: false,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setSkill: skill => {
            dispatch(setNewSkill(skill));
        },
    };
};

const mapEditStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        skills: state.characterReducer.character.skills,
        editing: true,
    };
};

const mapEditDispatchToProps = dispatch => {
    return {
        setSkill: skill => {
            dispatch(setSkill(skill));
        },
    };
};

class SkillsHeader extends React.Component {
    render() {
        return (
            <tr className="skill-row">
                <td className="table-header narrow">Proficient</td>
                <td className="table-header narrow">Expertise</td>
                <td className="table-header narrow">Bonus</td>
                <td className="table-header">Skill Name</td>
            </tr>
        );
    }
}

class SkillRow extends React.Component {
    onProfChecked(checked) {
        this.props.setSkill({
            ...this.props.skill,
            proficient: checked,
        });
    }

    onExpertChecked(checked) {
        this.props.setSkill({
            ...this.props.skill,
            expertise: checked,
        });
    }

    render() {
        console.log("render!");
        var that = this;
        console.log(this.props.skill.proficient);
        return (
            <tr className="skill-row">
                <td>
                    <Checkbox
                        style={{"margin-left": "32px"}}
                        labelStyle={{display: "none"}}
                        onCheck={(e, checked) => {
                            that.onProfChecked(checked);
                        }}
                        checked={this.props.skill.proficient}
                    />
                </td>
                <td>
                    <Checkbox
                        style={{"margin-left": "32px"}}
                        labelStyle={{display: "none"}}
                        onCheck={(e, checked) => {
                            that.onExpertChecked(checked);
                        }}
                        checked={this.props.skill.expertise}
                    />
                </td>
                <td className="white-block">{this.props.bonus}</td>
                <td className={this.props.rowColor}>{this.props.skill.name}</td>
            </tr>
        );
    }
}

class SelectSkillsComponent extends React.Component {
    onNext() {
        if (this.props.editing) {
            this.props.history.goBack();
            return;
        }

        this.props.history.push("/character/new/details");
    }

    render() {
        var that = this;
        var light = false;

        var skillsList = this.props.skills.map(function(skill, index) {
            var rowColor = function() {
                light = !light;
                return light ? "light-block" : "dark-block";
            };

            var bonus = that.props.character.skillScore(skill.name);
            var multiplier = skill.expertise ? 2 : 1;

            if (skill.proficient) {
                bonus =
                    bonus +
                    that.props.character.proficiencyBonus() * multiplier;
            }

            bonus = bonus + (skill.proficient ? "*" : "");

            return (
                <SkillRow
                    key={index}
                    skill={skill}
                    bonus={bonus}
                    setSkill={that.props.setSkill}
                    rowColor={rowColor()}
                />
            );
        });

        var buttonLabel = (this.props.editing ? "FINISH" : "NEXT");

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <div id="skills" className="narrow-module">
                        <Header name="Skills" />
                        <table className="skills-table">
                            <tbody>
                                <SkillsHeader />
                                {skillsList}
                            </tbody>
                        </table>
                    </div>
                    <div className="action-button-right">
                        <FlatButton
                            label={buttonLabel}
                            onTouchTap={() => {
                                this.onNext();
                            }}
                            labelStyle={{fontSize: "8pt"}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export const SelectSkills = connect(mapStateToProps, mapDispatchToProps)(
    SelectSkillsComponent,
);

export const EditSkills = connect(mapEditStateToProps, mapEditDispatchToProps)(
    SelectSkillsComponent,
);
