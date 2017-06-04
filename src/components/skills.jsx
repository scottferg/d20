import React from 'react';
import Header from './common'

class SkillsHeader extends React.Component {
    render() {
        return (
            <tr className="skill-row">
                <td className="table-header narrow">Bonus</td>
                <td className="table-header">Skill Name</td>
            </tr>
        );
    }
}

class SkillRow extends React.Component {
    render() {
        return (
            <tr className="skill-row">
                <td className="white-block">{this.props.skill.bonus}</td>
                <td className={this.props.rowColor}>{this.props.skill.name}</td>
            </tr>
        );
    }
}

class Skills extends React.Component {
    abilityBonus(ability) {
        return Math.ceil((ability - 9.5) / 2.0) - 1
    }
        
    skillScore(skill) {
        switch(skill) {
            case "Acrobatics": return this.abilityBonus(this.props.character.dex)
            case "Animal Handling": return this.abilityBonus(this.props.character.wis)
            case "Arcana": return this.abilityBonus(this.props.character.int)
            case "Athletics": return this.abilityBonus(this.props.character.str)
            case "Deception": return this.abilityBonus(this.props.character.cha)
            case "History": return this.abilityBonus(this.props.character.int)
            case "Insight": return this.abilityBonus(this.props.character.wis)
            case "Intimidation": return this.abilityBonus(this.props.character.cha)
            case "Investigation": return this.abilityBonus(this.props.character.int)
            case "Medicine": return this.abilityBonus(this.props.character.wis)
            case "Nature": return this.abilityBonus(this.props.character.int)
            case "Perception": return this.abilityBonus(this.props.character.wis)
            case "Performance": return this.abilityBonus(this.props.character.cha)
            case "Persuasion": return this.abilityBonus(this.props.character.cha)
            case "Religion": return this.abilityBonus(this.props.character.int)
            case "Sleight of Hand": return this.abilityBonus(this.props.character.dex)
            case "Stealth": return this.abilityBonus(this.props.character.dex)
            case "Survival": return this.abilityBonus(this.props.character.wis)
            default: return;
        }
    }

    render() {
        var that = this;
        var light = false;

        var skillsList = that.props.character.skills.map(function(skill) {
            var rowColor = function() {
                light = !light;
                return (light ? "light-block" : "dark-block");
            }

            var props = {
                bonus: that.skillScore(skill.name) + (skill.proficient ? "*" : ""),
                name: skill.name,
            }

            return <SkillRow skill={props} rowColor={rowColor()} />
        })

        return (
            <div id="skills" className="narrow-module">
                <Header name="Skills" />
                <table className="skills-table">
                    <SkillsHeader />
                    {skillsList}
                </table>
            </div>
        );
    }
}

export default Skills;
