import React from 'react';

export default class Item {
    constructor(item) {
        if (item === undefined) {
            return;
        }

        var that = this;

        Object.keys(item).forEach(function(key) {
            that[key] = item[key];
        })
    }

    dmg1Display() {
        if (this.dmg1) {
            return (
                <p className="item-description"><b>Damage: </b>{this.dmg1}</p>
            );
        }

        return null;
    }

    dmg2Display() {
        if (this.dmg2) {
            return (
                <p className="item-description"><b>Damage: </b>{this.dmg2}</p>
            );
        }

        return null;
    }

    acDisplay() {
        if (this.ac) {
            return (
                <p className="item-description"><b>AC: </b>{this.ac}</p>
            );
        }

        return null;
    }

    strengthDisplay() {
        if (this.strength) {
            return (
                <p className="item-description"><b>Strength: </b>{this.strength}</p>
            );
        }

        return null;
    }

    stealthDisplay() {
        if (this.stealth) {
            return (
                <p className="item-description"><b>Stealth: </b>{this.stealth}</p>
            );
        }

        return null;
    }

    weightDisplay() {
        if (this.weight) {
            return (
                <p className="item-description"><b>Weight: </b>{this.weight}</p>
            );
        }

        return null;
    }

    propertyDisplay() {
        if (this.property) {
            return (
                <p className="item-description"><b>Properties: </b>{this.property}</p>
            );
        }

        return null;
    }

    descriptionDisplay() {
        if (this.description) {
            return (
                <p className="item-description" dangerouslySetInnerHTML={{ __html: "<b>Description: </b>" + (this.description) }} />
            );
        }

        return null;
    }
}
