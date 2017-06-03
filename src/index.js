import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div>{this.props.name}</div>
                <div className="hr" />
            </div>
        );
    }
}

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
                <td className={this.props.rowColor}>{this.props.ability.name}</td>
                <td className="white-block">{this.props.ability.mod}</td>
                <td className="white-block">{this.props.ability.save}</td>
            </tr>
        );
    }
}

class AbilityScores extends React.Component {
    render() {
        const abilities = {
            "str": "Strength",
            "dex": "Dexterity", 
            "con": "Constitution",
            "int": "Intelligence",
            "wis": "Wisdom",
            "cha": "Charisma",
        }
        var that = this;
        var light = false;

        var abilitiesList = Object.keys(abilities).map(function(abbrev){
            var rowColor = function() {
                light = !light;
                return (light ? "light-block" : "dark-block");
            }

            var props = {
                score: that.props.character[abbrev],
                name: abilities[abbrev],
                mod: "+1",
                save: "+4*",
            }

            return <AbilityScoreRow ability={props} rowColor={rowColor()} />
        })

        return (
            <div id="ability-scores" className="narrow-module">
                <Header name="Ability Scores" />
                <table className="ability-score-table">
                    <AbilityScoreHeader />
                    {abilitiesList}
                </table>
            </div>
        );
    }
}

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
        }

        return;
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
        var cells = this.props.values.map(function(value) {
            return (
                <td className="white-block">{value}</td>
            );
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
        return Math.ceil((ability - 9.5) / 2.0) - 1
    }

    render() {
        var that = this;

        var firstRow = function() {
            var initiative = that.abilityBonus(that.props.character.dex) + that.props.character.initiative_mod;
            // TODO
            var ac = 10 + that.props.character.ac_mod;
            var speed = that.props.character.race.speed + that.props.character.speed_mod;
            return [initiative, ac, speed];
        }

        var secondRow = function() {
            var passivePerception = (function() {
                var bonus = 10 + that.abilityBonus(that.props.character.wis)

                /* TODO
                if (that.props.character.skills[11].proficient) {
                    bonus += this.proficiencyBonus()
                }
                */

                return bonus
            })()
            // TODO
            var proficiency = 0;
            var inspiration = that.props.character.inspiration;
            return [passivePerception, proficiency, inspiration];
        }

        return (
            <div id="combat" className="narrow-module">
                <Header name="Combat" />
                <table className="combat-table">
                    <CombatTopHeader />
                    <CombatRow values={firstRow()} />
                    <CombatBottomHeader />
                    <CombatRow values={secondRow()} />
                </table>
            </div>
        );
    }
}

class PortraitText extends React.Component {
    render() {
        var classLevels = "";

        this.props.character.classes.forEach(function(cls) {
            classLevels = classLevels + " / " + cls.cls.name + " " + cls.level
        })

        const raceLevel = this.props.character.race.name + classLevels

        return (
            <div id="portrait-text">
                <p id="character-name">{this.props.character.name}</p>
                <p>{raceLevel}</p>
            </div>
        );
    }
}

class Portrait extends React.Component {
    render() {
        const imageUrl = "data:image/png;base64," + this.props.character.playerImage
        return (
            <div className="narrow-module" id="portrait-container">
                <img className="portrait" src={imageUrl} />
                <PortraitText character={this.props.character} />
            </div>
        );
    }
}

class WeaponHeader extends React.Component {
    render() {
        return (
            <tr className="weapon-row">
                <td className="table-header">Name</td>
                <td className="table-header narrow">Bonus</td>
                <td className="table-header narrow">Dmg</td>
            </tr>
        );
    }
}

class WeaponRow extends React.Component {
    render() {
        // TODO: Fix bonus
        return (
            <tr className="weapon-row">
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">+5</td>
                <td className="white-block">{this.props.item.dmg1}</td>
            </tr>
        );
    }
}

class ArmorHeader extends React.Component {
    render() {
        return (
            <tr className="armor-row">
                <td className="table-header">Name</td>
                <td className="table-header narrow">AC</td>
            </tr>
        );
    }
}

class ArmorRow extends React.Component {
    render() {
        return (
            <tr className="armor-row">
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{this.props.item.ac}</td>
            </tr>
        );
    }
}

class GearHeader extends React.Component {
    render() {
        return (
            <tr className="gear-row">
                <td className="table-header">Name</td>
                <td className="table-header narrow">Qty</td>
            </tr>
        );
    }
}

class GearRow extends React.Component {
    render() {
        return (
            <tr className="gear-row">
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{this.props.item.quantity}</td>
            </tr>
        );
    }
}

class Equipment extends React.Component {
    render() {
        var that = this;
        var light = false;

        var rowColor = function() {
            light = !light;
            return (light ? "light-block" : "dark-block");
        }

        var weapons = this.props.character.items.filter(function(item) {
            return item.type == "M" || item.type == "R";
        });

        var weaponsList = weapons.map(function(item) {
            return <WeaponRow item={item} rowColor={rowColor()} />
        })

        var armor = this.props.character.items.filter(function(item) {
            return item.type == "S" || item.type == "LA" || item.type == "MA" || item.type == "HA";
        });

        var armorList = armor.map(function(item) {
            return <ArmorRow item={item} rowColor={rowColor()} />
        })
        
        var gear = this.props.character.items.filter(function(item) {
            switch (item.type) {
                case "M":
                case "R":
                case "S":
                case "LA":
                case "MA":
                case "HA":
                    return false;
                default:
                    return true;
            }
        });

        var gearList = gear.map(function(item) {
            return <GearRow item={item} rowColor={rowColor()} />
        })

        return (
            <div id="equipment" className="narrow-module">
                <Header name="Equipment" />
                <table className="equipment-table">
                    <WeaponHeader />
                    {weaponsList}
                </table>
                <table className="equipment-table">
                    <ArmorHeader />
                    {armorList}
                </table>
                <table className="equipment-table">
                    <GearHeader />
                    {gearList}
                </table>
            </div>
        );
    }
}

class SpellsHeader extends React.Component {
    render() {
        return (
            <tr className="gear-row">
                <td className="table-header">Spell</td>
            </tr>
        );
    }
}

class SpellRow extends React.Component {
    render() {
        return (
            <tr className="gear-row">
                <td className={this.props.rowColor}>{this.props.spell.name}</td>
            </tr>
        );
    }
}

class Spells extends React.Component {
    render() {
        var that = this;
        var light = false;

        var rowColor = function() {
            light = !light;
            return (light ? "light-block" : "dark-block");
        }

        var spellLevels = [];

        // Group spells by level
        var levels = [...Array(9).keys()];
        levels.forEach(function(spell, index) {
            var spells = that.props.character.spells.filter(function(spell) {
                return spell.Level == (index + 1);
            });

            if (spells.length > 0) {
                spellLevels.push(spells);
            }
        });

        // Render each group of spells
        var spellsList = spellLevels.map(function(spells, index) {
            const section = "Level " + (index + 1)

            var spellGroup = spells.map(function(spell) {
                return <SpellRow spell={spell} rowColor={rowColor()} />
            });

            return (
                <div className="section-header">
                    <Header name={section} />
                    <table className="spells-table">
                        <SpellsHeader />
                        {spellGroup}
                    </table>
                </div>
            );
        });

        return (
            <div id="spells" className="full-module">
                {spellsList}
            </div>
        );
    }
}

class ClassSpellsHeader extends React.Component {
    render() {
        return (
            <tr className="gear-row">
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
            <tr className="gear-row">
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
        var that = this;
        var light = false;

        var rowColor = function() {
            light = !light;
            return (light ? "light-block" : "dark-block");
        }

        var classSpellsList = this.props.character.classes.map(function(cls) {
            var props = {
                name: cls.cls.name,
                ability:  "N/A",
                attack: "0",
                dc: "0",
            }

            switch (cls.cls.spellAbility) {
                case "Wisdom":
                    props.ability = "WIS";
                    // TODO
                    props.attack = "+7"
                    props.dc = "+7"
                    break;
                case "Intelligence":
                    props.ability = "INT";
                    props.attack = "+7"
                    props.dc = "+7"
                    break;
                case "Charisma":
                    props.ability = "CHA";
                    props.attack = "+7"
                    props.dc = "+7"
                    break;
            }
            return <ClassSpellsRow cls={props} rowColor={rowColor()} />
        })

        return (
            <div id="spells" className="full-module">
                <Header name="Spells" />
                <table className="class-spells-table">
                    <ClassSpellsHeader />
                    {classSpellsList}
                </table>
            </div>
        );
    }
}

class NoteRow extends React.Component {
    render() {
        return (
            <div className="background-row">
                <div className="background-header">{this.props.note.title}</div>
                <div>{this.props.note.description}</div>
            </div>
        );
    }
}

class BackgroundRow extends React.Component {
    render() {
        return (
            <div className="background-row">
                <div className="background-header">{this.props.trait.name}</div>
                <div>{this.props.trait.description}</div>
            </div>
        );
    }
}

class Background extends React.Component {
    render() {
        var that = this;

        var notesList = this.props.character.notes.map(function(note) {
            return <NoteRow note={note} />
        })

        var classFeaturesList = this.props.character.classFeatures.map(function(feature) {
            return <BackgroundRow trait={feature} />
        })

        var raceFeaturesList = this.props.character.race.traits.map(function(feature) {
            return <BackgroundRow trait={feature} />
        })

        var backgroundList = this.props.character.background.traits.map(function(trait) {
            return <BackgroundRow trait={trait} />
        })

        return (
            <div id="background" className="full-module">
                <Header name="Notes" />
                {notesList}
                <div className="section-header" />
                <Header name="Class Features" />
                {classFeaturesList}
                <div className="section-header" />
                <Header name="Race Features" />
                {raceFeaturesList}
                <div className="section-header" />
                <Header name="Background" />
                {backgroundList}
            </div>
        );
    }
}

class CharacterSheet extends React.Component {
    constructor() {
        super();
        this.state = {
            character: null,
        };

        var req = new Request("http://localhost:8080/character");
        var that = this;

        fetch(req).then(function(resp) {
            return resp.json().then(function(json) {
                that.setState({character: json});
            });
        });
    }

    render() {
        if (this.state.character) {
            console.log(this.state.character);
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

ReactDOM.render(
    <CharacterSheet />,
    document.getElementById('root')
);
