import React from "react";
import FlatButton from "material-ui/FlatButton";

import {connect} from "react-redux";

import {auth, db} from "./app";
import {Header} from "./common";

// TODO: Writing the entire character is slow
export function setHP(character, hp) {
    return function(dispatch) {
        character.hp = character.hp + hp;

        if (character.hp < 0) {
            character.hp = 0;
        } else if (character.hp > character.max_hp) {
            character.hp = character.max_hp;
        }

        var userId = auth.currentUser.uid;
        return db
            .ref(
                "/users/" +
                    userId +
                    "/characters/" +
                    character.name.toLowerCase(),
            )
            .set({
                ...character,
                hp: character.hp,
            })
            .then(() => dispatch(updateHP(character, hp)));
    };
}

const updateHP = (character, hp) => {
    return {
        type: "UPDATE_CHARACTER_HP",
        character: character,
        current_hp: character.hp,
    };
};

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        hp: state.characterReducer.hp,
    };
};

class StatusView extends React.Component {
    onTakeDamage = () => {
        this.props.dispatch(setHP(this.props.character, -1));
    };

    onHeal = () => {
        this.props.dispatch(setHP(this.props.character, 1));
    };

    render() {
        if (this.props.character === undefined) {
            return null;
        }

        var cls = this.props.cls;

        return (
            <div id="status" className={cls}>
                <Header name="Status" />
                <div className="status-info">
                    <div className="status-hp">
                        {this.props.hp}/{this.props.character.max_hp}
                    </div>
                    <FlatButton
                        label="Heal"
                        onTouchTap={this.onHeal}
                        labelStyle={{fontSize: "8pt"}}
                    />
                    <FlatButton
                        label="Take Damage"
                        onTouchTap={this.onTakeDamage}
                        labelStyle={{fontSize: "8pt"}}
                    />
                    <FlatButton
                        label="Heal Temp HP"
                        labelStyle={{fontSize: "8pt"}}
                    />
                </div>
            </div>
        );
    }
}

const Status = connect(mapStateToProps)(StatusView);

export default Status;
