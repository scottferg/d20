import React from "react";

import {connect} from "react-redux";

import {Header} from "./common";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";

import Modal from "boron/DropModal";

const mapStateToProps = (state, props) => {
    return {
        displayCreateDialog: state.characterReducer.displayCreateDialog,
    };
};

class CreateCharacterComponent extends React.Component {
    state = {
        value: 1,
    };

    handleChange = (event, index, value) => this.setState({value});

    render() {
        var that = this;
        if (this.props.displayCreateDialog) {
            setTimeout(function() {
                that.refs.createCharacterModal.show();
            }, 150);
        }

        return (
            <Modal
                className="modal-parent"
                ref="createCharacterModal"
                onHide={() => {
                    // TODO: Dispatch refresh character list
                }}
                hide={false}>
                <div className="modal-dialog create-character-dialog">
                    <Header name="Select Race" />
                    <SelectField
                        floatingLabelText="Frequency"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                    <Header name="Select Class" />
                    <SelectField
                        floatingLabelText="Frequency"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                    <Header name="Select Background" />
                    <SelectField
                        floatingLabelText="Frequency"
                        value={this.state.value}
                        onChange={this.handleChange}>
                        <MenuItem value={1} primaryText="Never" />
                        <MenuItem value={2} primaryText="Every Night" />
                        <MenuItem value={3} primaryText="Weeknights" />
                        <MenuItem value={4} primaryText="Weekends" />
                        <MenuItem value={5} primaryText="Weekly" />
                    </SelectField>
                </div>
            </Modal>
        );
    }
}

const CreateCharacter = connect(mapStateToProps)(CreateCharacterComponent);

export default CreateCharacter;
