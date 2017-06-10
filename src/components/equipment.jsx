import React from 'react';

import { connect } from 'react-redux'

import Modal from 'boron/DropModal';

import Header from './common'
import Item from '../models/item'

const displayItemDialog = (item) => {
    return {
        type: 'SET_ITEM',
        item: item,
    } 
}

const mapStateToProps = (state, props) => {
    return {
        item: new Item(state.itemInfoReducer.item)
    }
}

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
        setTimeout(function () {
            that.props.refs.modal.show();
        }, 150)
    }

    render() {
        // TODO: Fix equipped dmg1 vs dmg2
        var bonus = "+" + (this.props.bonus + this.props.proficiency + this.props.item.attackMod());
        var dmg = this.props.item.dmg1 + " + " + (this.props.bonus + this.props.item.damageMod());

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
        setTimeout(function () {
            that.props.refs.modal.show();
        }, 150)
    }

    render() {
        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{this.props.item.ac + this.props.item.acMod()}</td>
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
        setTimeout(function () {
            that.props.refs.modal.show();
        }, 150)
    }

    render() {
        return (
            <tr className="gear-row" onClick={this.onItemClick}>
                <td className={this.props.rowColor}>{this.props.item.name}</td>
                <td className="white-block">{this.props.item.quantity}</td>
            </tr>
        );
    }
}

class EquipmentComponent extends React.Component {
    render() {
        var that = this;
        var light = false;

        var rowColor = function() {
            light = !light;
            return (light ? "light-block" : "dark-block");
        }

        var weapons = this.props.character.items.filter(function(item) {
            return item.type === "M" || item.type === "R";
        });

        var weaponsList = weapons.map(function(i) {
            var item = new Item(i);
            var bonus = 0;

            if (item.isMeleeWeapon()) {
                bonus = that.props.character.abilityBonus(that.props.character.strScore());

                if (item.isFinesse()) {
                    if (that.props.character.abilityBonus(that.props.character.strScore()) > that.props.character.abilityBonus(that.props.character.dexScore())) {
                        bonus = that.props.character.abilityBonus(that.props.character.strScore());
                    } else {
                        bonus = that.props.character.abilityBonus(that.props.character.dexScore());
                    }
                }
            } else if (item.isRangedWeapon()) {
                bonus = that.props.character.abilityBonus(that.props.character.dexScore());
            }

            return <WeaponRow dispatch={that.props.dispatch} refs={that.refs} item={item} proficiency={that.props.character.proficiencyBonus()} bonus={bonus} rowColor={rowColor()} />
        })

        var armor = this.props.character.items.filter(function(item) {
            return item.type === "S" || item.type === "LA" || item.type === "MA" || item.type === "HA";
        });

        var armorList = armor.map(function(i) {
            var item = new Item(i);
            return <ArmorRow dispatch={that.props.dispatch} refs={that.refs} item={item} rowColor={rowColor()} />
        })
        
        var gear = this.props.character.items.filter(function(item) {
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

        var gearList = gear.map(function(item) {
            return <GearRow dispatch={that.props.dispatch} refs={that.refs} item={item} rowColor={rowColor()} />
        })

        return (
            <div id="equipment" className="narrow-module">
                <Header name="Equipment" />
                <table className="equipment-table">
                    <WeaponHeader />
                    {weaponsList}
                </table>
                <table className="equipment-table">
                    <ArmorHeader />
                    {armorList}
                </table>
                <table className="equipment-table">
                    <GearHeader />
                    {gearList}
                </table>
                <Modal className="modal-parent" ref="modal" hide={false}>
                    <div className="modal-dialog">
                        <Header name={(this.props.item) ? this.props.item.name : ""} />
                        {(this.props.item) ? this.props.item.dmg1Display() : null}
                        {(this.props.item) ? this.props.item.dmg2Display() : null}
                        {(this.props.item) ? this.props.item.acDisplay() : null}
                        {(this.props.item) ? this.props.item.strengthDisplay() : null}
                        {(this.props.item) ? this.props.item.stealthDisplay() : null}
                        {(this.props.item) ? this.props.item.weightDisplay() : null}
                        {(this.props.item) ? this.props.item.propertyDisplay() : null}
                        {(this.props.item) ? this.props.item.descriptionDisplay() : null}
                    </div>
                </Modal>
            </div>
        );
    }
}

const Equipment = connect(mapStateToProps)(EquipmentComponent)

export default Equipment;
