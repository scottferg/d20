import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";
import {fetchClassList, selectClass} from "../actions/createCharacter";

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        classList: state.createCharacterReducer.classList,
        fetching: state.createCharacterReducer.fetching,
    };
};

class SelectClassComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchClassList());
    }

    onSelect(cls) {
        this.props.dispatch(selectClass(this.props.character, cls));
        this.props.history.push("/character/new/background");
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
        var classList = this.props.classList.map(function(cls, index) {
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onSelect(cls);
                        }}>
                        {cls.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Select Class" />
                    <div className="add-content-list">
                        {classList}
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

const SelectClass = connect(mapStateToProps)(SelectClassComponent);

export default SelectClass;
