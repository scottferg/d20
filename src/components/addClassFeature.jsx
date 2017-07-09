import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";

import {Header} from "./common";
import {
    addClassFeature,
} from "../actions/classFeatures";

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        classFeatures: state.backgroundReducer.classFeatures,
    };
};

class AddClassFeatureComponent extends React.Component {
    featuresForLevel(level) {
        // TODO: Multiclass
        var levels = this.props.character.classes[0].cls.autolevel.filter(function(l) {
            return (parseInt(l.level, 10) <= level)
        });

        var result = [];
        levels.forEach(function(autoLevel) {
            // Not all autolevels have features
            if (!autoLevel.feature) {
                return;
            }

            result = result.concat(autoLevel.feature);
        });

        return result;
    }

    onAddClassFeature(feature) {
        this.props.dispatch(
            addClassFeature(feature, this.props.classFeatures, this.props.character),
        );

        this.props.history.goBack();
    }

    render() {
        var that = this;
        var featuresList = this.featuresForLevel(this.props.character.level()).map(function(feature, index) {
            console.log(feature);
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onAddClassFeature(feature);
                        }}>
                        {feature.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Add Class Feature" />
                    <div className="add-content-list">
                        {featuresList}
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

const AddClassFeature = connect(mapStateToProps)(AddClassFeatureComponent);

export default AddClassFeature;
