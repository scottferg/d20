import React from 'react';
import Header from './common'

import { connect } from 'react-redux'

import Modal from 'boron/DropModal';

import Spell from '../models/spell';

const displaySpellDialog = (spell) => {
    return {
        type: 'SET_SPELL',
        spell: spell,
    } 
}

const mapStateToProps = (state, props) => {
    return {
        spell: new Spell(state.spellInfoReducer.spell)
    }
}

class SpellsHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="table-header">Spell</td>
            </tr>
        );
    }
}

class SpellRow extends React.Component {
    onSpellClick = () => {
        var that = this;

        this.props.dispatch(displaySpellDialog(this.props.spell));

        // TODO: The timeout here is a hack. Need to wait for the
        // render update to complete
        setTimeout(function () {
            that.props.refs.modal.show();
        }, 150)
    }

    render() {
        console.log(this.props)
        return (
            <tr className="spell-row" onClick={this.onSpellClick}>
                <td className={this.props.rowColor}>{this.props.spell.name}</td>
            </tr>
        );
    }
}

class SpellsComponent extends React.Component {

    render() {
        console.log(this.props);
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
                return spell.Level === (index + 1);
            });

            if (spells.length > 0) {
                spellLevels.push(spells);
            }
        });

        // Render each group of spells
        var spellsList = spellLevels.map(function(spells, index) {
            const section = "Level " + (index + 1)

            var spellGroup = spells.map(function(spell) {
                return <SpellRow dispatch={that.props.dispatch} refs={that.refs} spell={spell} rowColor={rowColor()} />
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
            <div id="spell-list" className="full-module">
                {spellsList}
                <Modal ref="modal" hide={false}>
                    <div className="modal-dialog">
                        <Header name={(this.props.spell) ? this.props.spell.name : ""} />
                        <p className="item-description highlight">{(this.props.spell) ? this.props.spell.schoolLevel() : ""}</p>
                        <p className="item-description"><b>Casting time: </b>{(this.props.spell) ? this.props.spell.time : ""}</p>
                        <p className="item-description"><b>Range: </b>{(this.props.spell) ? this.props.spell.range : ""}</p>
                        <p className="item-description"><b>Components: </b>{(this.props.spell) ? this.props.spell.components : ""}</p>
                        <p className="item-description"><b>Duration: </b>{(this.props.spell) ? this.props.spell.duration : ""}</p>
                        <p className="item-description" dangerouslySetInnerHTML={{ __html: "<b>Description: </b>" + ((this.props.spell) ? this.props.spell.description : "") }} />
                    </div>
                </Modal>
            </div>
        );
    }
}

const Spells = connect(mapStateToProps)(SpellsComponent)

export default Spells;
