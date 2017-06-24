import React from "react";

import {connect} from "react-redux";

import Modal from "boron/DropModal";

import FlatButton from "material-ui/FlatButton";
import CircularProgress from "material-ui/CircularProgress";

import {Header, NumberPicker} from "./common";
import Item from "../models/item";
import {
    removeItem,
    equipItem,
    updateItemQuantity,
    displayItemDialog,
    fetchCharacterItems,
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
        var bonus =
            "+" +
            (this.props.bonus +
                this.props.proficiency +
                this.props.item.attackMod());

        var dmg = this.props.item.dmg1;

        if (this.props.item.equipped === "2 Handed" && this.props.item.dmg2) {
            dmg = this.props.item.dmg2;
        }

        dmg = dmg + " + " + (this.props.bonus + this.props.item.damageMod());

        var name = this.props.item.name;
        if (
            this.props.item.equipped !== "Unequipped" &&
            this.props.item.equipped !== undefined
        ) {
            name = name + "*";
        }

        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{name}</td>
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
    constructor(props) {
        super(props);

        this.state = props;
    }

    primary = {
        fontSize: "8pt",
        color: "#005453",
    };

    button = {
        fontSize: "8pt",
    };

    onRemove() {
        this.props.dispatch(
            removeItem(
                this.props.character,
                this.props.characterItems,
                this.state.item,
            ),
        );
        this.props.refs.modal.hide();
    }

    onEquip(equipped) {
        this.state.item.equipped = equipped;

        this.props.dispatch(
            equipItem(
                this.props.character,
                this.props.characterItems,
                this.state.item,
                equipped,
            ),
        );
    }

    twoHandedEquip() {
        return (
            <div className="action-button-right">
                <FlatButton
                    label="2 Handed"
                    primary={this.state.item.equipped === "2 Handed"}
                    onTouchTap={() => {
                        this.onEquip("2 Handed");
                    }}
                    labelStyle={
                        this.state.item.equipped === "2 Handed"
                            ? this.primary
                            : this.button
                    }
                />
                <FlatButton
                    label="Unequipped"
                    primary={this.state.item.equipped === "Unequipped"}
                    onTouchTap={() => {
                        this.onEquip("Unequipped");
                    }}
                    labelStyle={
                        this.state.item.equipped === "Unequipped"
                            ? this.primary
                            : this.button
                    }
                />
            </div>
        );
    }

    oneHandedEquip() {
        return (
            <div className="action-button-right">
                <FlatButton
                    label="1 Handed"
                    primary={this.state.item.equipped === "1 Handed"}
                    onTouchTap={() => {
                        this.onEquip("1 Handed");
                    }}
                    labelStyle={
                        this.state.item.equipped === "1 Handed"
                            ? this.primary
                            : this.button
                    }
                />
                <FlatButton
                    label="Unequipped"
                    primary={this.state.item.equipped === "Unequipped"}
                    onTouchTap={() => {
                        this.onEquip("Unequipped");
                    }}
                    labelStyle={
                        this.state.item.equipped === "Unequipped"
                            ? this.primary
                            : this.button
                    }
                />
            </div>
        );
    }

    versatile() {
        return (
            <div className="action-button-right">
                <FlatButton
                    label="2 Handed"
                    primary={this.state.item.equipped === "2 Handed"}
                    onTouchTap={() => {
                        this.onEquip("2 Handed");
                    }}
                    labelStyle={
                        this.state.item.equipped === "2 Handed"
                            ? this.primary
                            : this.button
                    }
                />
                <FlatButton
                    label="1 Handed"
                    primary={this.state.item.equipped === "1 Handed"}
                    onTouchTap={() => {
                        this.onEquip("1 Handed");
                    }}
                    labelStyle={
                        this.state.item.equipped === "1 Handed"
                            ? this.primary
                            : this.button
                    }
                />
                <FlatButton
                    label="Unequipped"
                    primary={this.state.item.equipped === "Unequipped"}
                    onTouchTap={() => {
                        this.onEquip("Unequipped");
                    }}
                    labelStyle={
                        this.state.item.equipped === "Unequipped"
                            ? this.primary
                            : this.button
                    }
                />
            </div>
        );
    }

    equipped() {
        if (this.state.item.property.includes("V")) {
            return this.versatile();
        }

        if (
            !this.state.item.property.includes("2H") &&
            !this.state.item.property.includes("V")
        ) {
            return this.oneHandedEquip();
        }

        if (this.state.item.property.includes("2H")) {
            return this.twoHandedEquip();
        }
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
                {this.state.item.owned && this.state.item.isWeapon()
                    ? this.equipped()
                    : null}
            </div>
        );
    }
}

class EquipmentComponent extends React.Component {
    onUpdateQuantity(amount) {
        this.props.dispatch(
            updateItemQuantity(
                this.props.character,
                this.props.characterItems,
                this.props.item,
                amount,
            ),
        );
    }

    componentDidMount() {
        this.props.dispatch(fetchCharacterItems(this.props.character.name));
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
                        {this.props.item && this.props.item.isGear()
                            ? <NumberPicker
                                  label="Quantity:"
                                  value={this.props.item.quantity}
                                  min={1}
                                  callback={amount => {
                                      this.onUpdateQuantity(amount);
                                  }}
                              />
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
