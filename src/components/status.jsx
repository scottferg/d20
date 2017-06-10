import React from 'react';
import FlatButton from 'material-ui/FlatButton';

import { connect } from 'react-redux'

import Header from './common'

const updateHP = (character, hp) => {
    character.hp = character.hp + hp
    
    return {
        type: "SET_CHARACTER",
        character: character,
    } 
}

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character
    }
}

class StatusView extends React.Component {
    onTakeDamage = () => {
        this.props.dispatch(updateHP(this.props.character, -1))
    }

    onHeal = () => {
        this.props.dispatch(updateHP(this.props.character, 1))
    }

    render() {
        if (this.props.character === undefined) {
            return null;
        }

        var cls = this.props.cls + " narrow-module"

        return (
            <div id="status" className={cls}>
                <Header name="Status" />
                <div className="status-info">
                    <div className="status-hp">
                        {this.props.character.hp}/{this.props.character.max_hp}
                    </div>
                    <FlatButton label="Heal" onTouchTap={this.onHeal} labelStyle={{"fontSize": "8pt"}} />
                    <FlatButton label="Take Damage" onTouchTap={this.onTakeDamage} labelStyle={{"fontSize": "8pt"}} />
                    <FlatButton label="Heal Temp HP" labelStyle={{"fontSize": "8pt"}} />
                </div>
            </div>
        );
    }
}

const Status = connect(mapStateToProps)(StatusView)

export default Status;
