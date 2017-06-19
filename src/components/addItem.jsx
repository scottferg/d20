import React from "react";
import ReactResizeDetector from "react-resize-detector";

import {connect} from "react-redux";

import Divider from "material-ui/Divider";
import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";
import Item from "../models/item";
import {
    addItem,
    fetchItems,
} from "../actions/items";

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        item: new Item(state.itemInfoReducer.item),
        itemList: state.itemInfoReducer.itemList,
        characterItems: state.itemInfoReducer.characterItems,
        displayItemList: state.itemInfoReducer.displayItemList,
        fetching: state.itemInfoReducer.fetching,
    };
};

class AddItemComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchItems());
    }

    onAddItem(item) {
        this.props.dispatch(
            addItem(this.props.character, this.props.characterItems, item),
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
        var itemList = this.props.itemList.map(function(item, index) {
            return (
                <div key={index}>
                    <div
                        className="list-item"
                        onClick={() => {
                            that.onAddItem(item);
                        }}>
                        {item.name}
                    </div>
                    <Divider />
                </div>
            );
        });

        return (
            <div className="character-sheet-container">
                <div className="add-dialog">
                    <Header name="Add Equipment" />
                    <div className="add-content-list">
                        {itemList}
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

const AddItem = connect(mapStateToProps)(AddItemComponent);

export default AddItem;
