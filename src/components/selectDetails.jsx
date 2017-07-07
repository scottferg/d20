import React from "react";

import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import CircularProgress from 'material-ui/CircularProgress';

import Dropzone from "react-dropzone";

import {connect} from "react-redux";

import {Header} from "./common";
import {
    setNewCharacterPortrait,
    saveNewCharacterWithDetails,
} from "../actions/createCharacter";
import {
    setCharacterPortrait,
    saveCharacterWithDetails,
} from "../actions/character";

const mapSelectStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        progress: state.createCharacterReducer.progress,
        editing: false,
    };
};

const mapSelectDispatchToProps = (dispatch) => {
    return({
        setPortrait: (file) => {dispatch(setNewCharacterPortrait(file))},
        setDetails: (name, hp, inspiration, character) => {
            dispatch(saveNewCharacterWithDetails(name, hp, inspiration, character));
        },
    })
}

const mapEditStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        characterStatus: state.characterReducer.characterStatus,
        progress: state.characterReducer.progress,
        editing: true,
    };
};

const mapEditDispatchToProps = (dispatch) => {
    return({
        setPortrait: (file) => {dispatch(setCharacterPortrait(file))},
        setDetails: (name, hp, inspiration, character) => {
            dispatch(saveCharacterWithDetails(name, hp, inspiration, character));
        },
    })
}

class SelectDetailsComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.character.name,
            hp: (this.props.character.rolled_hp ? this.props.character.rolled_hp : 20),
            inspiration: (this.props.character.inspiration ? this.props.character.inspiration : 0),
        };
    }

    onNext() {
        if (this.state.name === "") {
            return;
        }

        this.props.setDetails(
            this.state.name,
            parseInt(this.state.hp, 10),
            parseInt(this.state.inspiration, 10),
            this.props.character,
        );
        this.props.history.push("/");
    }

    onDrop(files) {
        this.props.setPortrait(files[0]);
    }

    progressOrImage() {
        if (!this.props.character.playerImage && this.props.progress) {
            return (
                <CircularProgress mode="determinate" value={this.props.progress} />
            );
        } else if (this.props.character.playerImage) {
            return (
                <img
                    className="details-portrait" alt="" src={this.props.character.playerImage}
                />
            );
        }

        return null;
    }

    nameOrDisabled() {
        if (this.props.editing) {
            return (
                <div>{this.state.name}</div>
            );
        }

        var that = this;

        return (
            <TextField
                value={this.state.name}
                onChange={evt => {
                    that.setState({name: evt.target.value});
                }}
                hintText="Varis"
                floatingLabelText="Name"
            />
        );
    }

    render() {
        var that = this;

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <div id="details" className="narrow-module">
                        <Header name="Details" />
                        <Dropzone
                            className="details-dropzone"
                            activeClassName="details-dropzone details-dropzone-active"
                            onDrop={this.onDrop.bind(this)}>
                            <p>
                                Drop your character portrait here or click to
                                upload
                            </p>
                            {this.progressOrImage()}
                        </Dropzone>
                        <div className="detail-text-field">
                            {this.nameOrDisabled()}
                        </div>
                        <div className="detail-text-field">
                            <TextField
                                value={this.state.hp}
                                onChange={evt => {
                                    that.setState({hp: evt.target.value});
                                }}
                                hintText="20"
                                type="number"
                                floatingLabelText="Hit Points"
                            />
                        </div>
                        <div className="detail-text-field">
                            <TextField
                                value={this.state.inspiration}
                                onChange={evt => {
                                    that.setState({name: evt.target.value});
                                }}
                                hintText="0"
                                type="number"
                                floatingLabelText="Inspiration"
                            />
                        </div>
                    </div>
                    <div className="action-button-right">
                        <FlatButton
                            label="FINISH"
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

export const SelectDetails = connect(
    mapSelectStateToProps, 
    mapSelectDispatchToProps)(SelectDetailsComponent);

export const EditDetails = connect(
    mapEditStateToProps, 
    mapEditDispatchToProps)(SelectDetailsComponent);
