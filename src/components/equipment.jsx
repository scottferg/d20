import React from "react";

import {connect} from "react-redux";

import Modal from "boron/DropModal";

import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";

import {Header} from "./common";
import Item from "../models/item";
import {
    addItem,
    removeItem,
    displayItemDialog,
    fetchItems,
    fetchCharacterItems,
    toggleItemList,
} from "../actions/items";

const mapStateToProps = (state, props) => {
    return {
        item: new Item(state.itemInfoReducer.item),
        itemList: state.itemInfoReducer.itemList,
        characterItems: state.itemInfoReducer.characterItems,
        displayItemList: state.itemInfoReducer.displayItemList,
        fetching: state.itemInfoReducer.fetching,
    };
};

class WeaponHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="table-header">Name</td>
                <td className="table-header narrow">Bonus</td>
                <td className="table-header narrow-fat">Dmg</td>
            </tr>
        );
    }
}

class WeaponRow extends React.Component {
    onItemClick = () => {
        var that = this;

        this.props.dispatch(displayItemDialog(this.props.item));

        // TODO: The timeout here is a hack. Need to wait for the
        // render update to complete
        setTimeout(function() {
            that.props.refs.modal.show();
        }, 150);
    };

    render() {
        // TODO: Fix equipped dmg1 vs dmg2
        var bonus =
            "+" +
            (this.props.bonus +
                this.props.proficiency +
                this.props.item.attackMod());
        var dmg =
            this.props.item.dmg1 +
            " + " +
            (this.props.bonus + this.props.item.damageMod());

        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{bonus}</td>
                <td className="white-block narrow-fat">{dmg}</td>
            </tr>
        );
    }
}

class ArmorHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="table-header">Name</td>
                <td className="table-header narrow">AC</td>
            </tr>
        );
    }
}

class ArmorRow extends React.Component {
    onItemClick = () => {
        var that = this;

        this.props.dispatch(displayItemDialog(this.props.item));

        // TODO: The timeout here is a hack. Need to wait for the
        // render update to complete
        setTimeout(function() {
            that.props.refs.modal.show();
        }, 150);
    };

    render() {
        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">
                    {parseInt(this.props.item.ac, 10) + this.props.item.acMod()}
                </td>
            </tr>
        );
    }
}

class GearHeader extends React.Component {
    render() {
        return (
            <tr>
                <td className="table-header">Name</td>
                <td className="table-header narrow">Qty</td>
            </tr>
        );
    }
}

class GearRow extends React.Component {
    onItemClick = () => {
        var that = this;

        this.props.dispatch(displayItemDialog(this.props.item));

        // TODO: The timeout here is a hack. Need to wait for the
        // render update to complete
        setTimeout(function() {
            that.props.refs.modal.show();
        }, 150);
    };

    render() {
        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{this.props.item.quantity}</td>
            </tr>
        );
    }
}

class EquipmentActions extends React.Component {
    onRemove() {
        this.props.dispatch(
            removeItem(
                this.props.character,
                this.props.characterItems,
                this.props.item,
            ),
        );
        this.props.refs.modal.hide();
    }

    render() {
        return (
            <div className="action-button-row">
                <div className="action-button-left">
                    <FlatButton
                        label="Remove"
                        onTouchTap={() => {
                            this.onRemove();
                        }}
                        labelStyle={{fontSize: "8pt"}}
                    />
                </div>
                <div className="action-button-right" />
            </div>
        );
    }
}

class EquipmentComponent extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchItems());
        this.props.dispatch(fetchCharacterItems(this.props.character.name));
    }

    onAddItem(item) {
        this.props.dispatch(
            addItem(this.props.character, this.props.characterItems, item),
        );
        this.refs.item_list_modal.hide();
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
        var light = false;

        var rowColor = function() {
            light = !light;
            return light ? "light-block" : "dark-block";
        };

        var weapons = this.props.characterItems.filter(function(item) {
            return item.type === "M" || item.type === "R";
        });

        var weaponsList = weapons.map(function(i, index) {
            var item = new Item(i);
            var bonus = 0;

            if (item.isMeleeWeapon()) {
                bonus = that.props.character.abilityBonus(
                    that.props.character.strScore(),
                );

                if (item.isFinesse()) {
                    if (
                        that.props.character.abilityBonus(
                            that.props.character.strScore(),
                        ) >
                        that.props.character.abilityBonus(
                            that.props.character.dexScore(),
                        )
                    ) {
                        bonus = that.props.character.abilityBonus(
                            that.props.character.strScore(),
                        );
                    } else {
                        bonus = that.props.character.abilityBonus(
                            that.props.character.dexScore(),
                        );
                    }
                }
            } else if (item.isRangedWeapon()) {
                bonus = that.props.character.abilityBonus(
                    that.props.character.dexScore(),
                );
            }

            return (
                <WeaponRow
                    key={index}
                    dispatch={that.props.dispatch}
                    refs={that.refs}
                    item={item}
                    proficiency={that.props.character.proficiencyBonus()}
                    bonus={bonus}
                    rowColor={rowColor()}
                />
            );
        });

        var armor = this.props.characterItems.filter(function(item) {
            return (
                item.type === "S" ||
                item.type === "LA" ||
                item.type === "MA" ||
                item.type === "HA"
            );
        });

        var armorList = armor.map(function(i, index) {
            var item = new Item(i);
            return (
                <ArmorRow
                    key={index}
                    dispatch={that.props.dispatch}
                    refs={that.refs}
                    item={item}
                    rowColor={rowColor()}
                />
            );
        });

        var gear = this.props.characterItems.filter(function(item) {
            switch (item.type) {
                case "M":
                case "R":
                case "S":
                case "LA":
                case "MA":
                case "HA":
                    return false;
                default:
                    return true;
            }
        });

        var gearList = gear.map(function(item, index) {
            return (
                <GearRow
                    key={index}
                    dispatch={that.props.dispatch}
                    refs={that.refs}
                    item={item}
                    rowColor={rowColor()}
                />
            );
        });

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

        if (this.props.displayItemList) {
            setTimeout(function() {
                that.refs.item_list_modal.show();
            }, 150);
        }

        return (
            <div id="equipment" className="narrow-module">
                <Header name="Equipment" />
                <table className="equipment-table">
                    <tbody>
                        <WeaponHeader />
                        {weaponsList}
                    </tbody>
                </table>
                <table className="equipment-table">
                    <tbody>
                        <ArmorHeader />
                        {armorList}
                    </tbody>
                </table>
                <table className="equipment-table">
                    <tbody>
                        <GearHeader />
                        {gearList}
                    </tbody>
                </table>
                <Modal
                    className="modal-parent"
                    ref="item_list_modal"
                    onHide={() => {
                        this.props.dispatch(toggleItemList(false));
                    }}
                    hide={false}>
                    <div className="modal-dialog">
                        <Header name="Add Equipment" />
                        <div className="modal-list">
                            {itemList}
                        </div>
                    </div>
                </Modal>
                <Modal className="modal-parent" ref="modal" hide={false}>
                    <div className="modal-dialog">
                        <Header
                            name={this.props.item ? this.props.item.name : ""}
                        />
                        {this.props.item ? this.props.item.dmg1Display() : null}
                        {this.props.item ? this.props.item.dmg2Display() : null}
                        {this.props.item ? this.props.item.acDisplay() : null}
                        {this.props.item
                            ? this.props.item.strengthDisplay()
                            : null}
                        {this.props.item
                            ? this.props.item.stealthDisplay()
                            : null}
                        {this.props.item
                            ? this.props.item.weightDisplay()
                            : null}
                        {this.props.item
                            ? this.props.item.propertyDisplay()
                            : null}
                        {this.props.item
                            ? this.props.item.descriptionDisplay()
                            : null}
                        <EquipmentActions
                            item={this.props.item}
                            character={this.props.character}
                            characterItems={this.props.characterItems}
                            dispatch={this.props.dispatch}
                            refs={this.refs}
                        />
                        <div className="dialog-footer" />
                    </div>
                </Modal>
            </div>
        );
    }
}

const Equipment = connect(mapStateToProps)(EquipmentComponent);

export default Equipment;
