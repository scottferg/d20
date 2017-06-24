import React from "react";
import {Header} from "./common";

import {connect} from "react-redux";

import Toggle from "material-ui/Toggle";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";

import Modal from "boron/DropModal";

import Spell from "../models/spell";
import {
    displaySpellDialog,
    addSpell,
    prepareSpell,
    removeSpell,
    fetchCharacterSpells,
} from "../actions/spells";

const mapStateToProps = (state, props) => {
    return {
        spell: new Spell(state.spellInfoReducer.spell),
        characterSpells: state.spellInfoReducer.characterSpells,
    };
};

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
        setTimeout(function() {
            that.props.refs.modal.show();
        }, 150);
    };

    render() {
        var cls = "spell-row" + (this.props.spell.prepared ? "" : " disabled");

        return (
            <tr className={cls}>
                <td className={this.props.rowColor} onClick={this.onSpellClick}>
                    {this.props.spell.name}
                </td>
            </tr>
        );
    }
}

class SpellActions extends React.Component {
    onRemove() {
        this.props.dispatch(
            removeSpell(
                this.props.character,
                this.props.characterSpells,
                this.props.spell,
            ),
        );
        this.props.refs.modal.hide();
    }

    onPrepareToggle(checked) {
        this.props.dispatch(
            prepareSpell(
                this.props.character,
                this.props.characterSpells,
                this.props.spell,
                checked,
            ),
        );
    }

    render() {
        return (
            <div className="action-button-row">
                <div className="action-button-left">
                    <FlatButton
                        label="Remove"
                        onTouchTap={() => {
                            this.onRemove();
                        }}
                        labelStyle={{fontSize: "8pt"}}
                    />
                </div>
                <div className="action-button-right spell-actions-right">
                    {this.props.character.needsSpellPrep()
                        ? <Toggle
                              labelStyle={{fontSize: "8pt"}}
                              label="PREPARED"
                              defaultToggled={this.props.spell.prepared}
                              onToggle={(e, checked) => {
                                  this.onPrepareToggle(checked);
                              }}
                              thumbSwitchedStyle={{backgroundColor: "#005453"}}
                              trackSwitchedStyle={{backgroundColor: "#007775"}}
                          />
                        : null}
                </div>
            </div>
        );
    }
}

class SpellsComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchCharacterSpells(this.props.character.name));
    }

    onAddSpell(spell) {
        this.props.dispatch(
            addSpell(this.props.character, this.props.characterSpells, spell),
        );
        this.refs.spell_list_modal.hide();
    }

    render() {
        var that = this;
        var light = false;

        var rowColor = function() {
            light = !light;
            return light ? "light-block" : "dark-block";
        };

        var spellLevels = [];

        // Group spells by level
        var levels = [...Array(9).keys()];
        levels.forEach(function(spell, index) {
            var spells = that.props.characterSpells.filter(function(spell) {
                return spell.level === index + 1;
            });

            if (spells.length > 0) {
                spellLevels.push(spells);
            }
        });

        // Render each group of spells
        var spellsList = spellLevels.map(function(spells, index) {
            const section = "Level " + (index + 1);

            var spellGroup = spells.map(function(spell, idx) {
                return (
                    <SpellRow
                        key={idx}
                        dispatch={that.props.dispatch}
                        refs={that.refs}
                        spell={spell}
                        rowColor={rowColor()}
                    />
                );
            });

            return (
                <div key={index} className="section-header">
                    <Header name={section} />
                    <table className="spells-table">
                        <tbody>
                            <SpellsHeader />
                            {spellGroup}
                        </tbody>
                    </table>
                </div>
            );
        });

        if (this.props.fetching) {
            return (
                <div className="loading-spinner narrow-module">
                    <CircularProgress size={50} thickness={5} color="#005453" />
                </div>
            );
        }

        return (
            <div id="spell-list" className="full-module">
                {spellsList}
                <Modal className="modal-parent" ref="modal" hide={false}>
                    <div className="modal-dialog">
                        <Header
                            name={this.props.spell ? this.props.spell.name : ""}
                        />
                        <p className="item-description highlight">
                            {this.props.spell
                                ? this.props.spell.schoolLevel()
                                : ""}
                        </p>
                        <p className="item-description">
                            <b>Casting time: </b>
                            {this.props.spell ? this.props.spell.time : ""}
                        </p>
                        <p className="item-description">
                            <b>Range: </b>
                            {this.props.spell ? this.props.spell.range : ""}
                        </p>
                        <p className="item-description">
                            <b>Components: </b>
                            {this.props.spell
                                ? this.props.spell.components
                                : ""}
                        </p>
                        <p className="item-description">
                            <b>Duration: </b>
                            {this.props.spell ? this.props.spell.duration : ""}
                        </p>
                        <p
                            className="item-description"
                            dangerouslySetInnerHTML={{
                                __html:
                                    "<b>Description: </b>" +
                                        (this.props.spell
                                            ? this.props.spell.description
                                            : ""),
                            }}
                        />
                        <SpellActions
                            spell={this.props.spell}
                            character={this.props.character}
                            characterSpells={this.props.characterSpells}
                            dispatch={this.props.dispatch}
                            refs={this.refs}
                        />
                        <div className="dialog-footer" />
                    </div>
                </Modal>
            </div>
        );
    }
}

const Spells = connect(mapStateToProps)(SpellsComponent);

export default Spells;
