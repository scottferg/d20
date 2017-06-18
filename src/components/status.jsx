import React from "react";
import FlatButton from "material-ui/FlatButton";

import {connect} from "react-redux";

import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";

import {setHP, fetchCharacterStatus} from "../actions/character"

const mapStateToProps = (state, props) => {
    // Redux uses a shallow comparison of state, so simply
    // updating the HP field isn't sufficient to trigger a
    // re-render, need to be specific down to the field
    return {
        character: state.characterReducer.character,
        characterStatus: {
            hp: state.characterReducer.characterStatus.hp,
            max_hp: state.characterReducer.characterStatus.max_hp,
            temp_hp: state.characterReducer.characterStatus.temp_hp,
        }
    };
};

class StatusComponent extends React.Component {
    onTakeDamage = () => {
        this.props.dispatch(setHP(this.props.characterStatus, -1, this.props.character.name));
    };

    onHeal = () => {
        this.props.dispatch(setHP(this.props.characterStatus, 1, this.props.character.name));
    };

    componentDidMount() {
        this.props.dispatch(fetchCharacterStatus(this.props.character.name));
    }

    render() {
        if (this.props.fetching) {
            return (
                <div className="loading-spinner narrow-module">
                    <CircularProgress size={50} thickness={5} color="#005453" />
                </div>
            );
        }

        return (
            <div id="status" className={this.props.cls}>
                <Header name="Status" />
                <div className="status-info">
                    <div className="status-hp">
                        {this.props.characterStatus.hp}/{this.props.characterStatus.max_hp}
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

const Status = connect(mapStateToProps)(StatusComponent);

export default Status;
