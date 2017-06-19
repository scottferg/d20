import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {Header} from "./common";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import Spell from "../models/spell";
import {
    fetchSpells,
    addSpell,
} from "../actions/spells";

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        spell: new Spell(state.spellInfoReducer.spell),
        spellList: state.spellInfoReducer.spellList,
        displaySpellList: state.spellInfoReducer.displaySpellList,
        characterSpells: state.spellInfoReducer.characterSpells,
        fetching: state.itemInfoReducer.fetching,
    };
};

class AddSpellComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchSpells());
    }

    onAddSpell(spell) {
        this.props.dispatch(
            addSpell(this.props.character, this.props.characterSpells, spell),
        );
        this.props.history.push("/character/" + this.props.character.name);
    }

    render() {
        if (this.props.fetching) {
            return (
                <div className="loading-spinner narrow-module">
                    <CircularProgress size={50} thickness={5} color="#005453" />
                </div>
            );
        }

        var that = this;
        var spellList = this.props.spellList.map(function(spell, index) {
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onAddSpell(spell);
                        }}>
                        {spell.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Add Spell" />
                    <div className="add-content-list">
                        {spellList}
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

const AddSpell = connect(mapStateToProps)(AddSpellComponent);

export default AddSpell;
