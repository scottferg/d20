import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";
import {fetchBackgroundList, selectBackground} from "../actions/createCharacter";

const mapStateToProps = (state, props) => {
    return {
        character: state.createCharacterReducer.character,
        backgroundList: state.createCharacterReducer.backgroundList,
        fetching: state.createCharacterReducer.fetching,
    };
};

class SelectBackgroundComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchBackgroundList());
    }

    onSelect(background) {
        this.props.dispatch(selectBackground(this.props.character, background));
        this.props.history.push("/character/new/abilities");
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
        var backgroundList = this.props.backgroundList.map(function(background, index) {
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onSelect(background);
                        }}>
                        {background.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Select Background" />
                    <div className="add-content-list">
                        {backgroundList}
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

const SelectBackground = connect(mapStateToProps)(SelectBackgroundComponent);

export default SelectBackground;
