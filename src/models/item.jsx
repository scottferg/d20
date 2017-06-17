import React from "react";

export default class Item {
    constructor(item) {
        if (item === undefined) {
            return;
        }

        var that = this;

        Object.keys(item).forEach(function(key) {
            that[key] = item[key];
        });
    }

    modValue(mod) {
        var parts = mod.name.split(" ");
        var modifier = parts[parts.length - 1];

        return parseInt(modifier.split("+")[1], 10);
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
            return <p className="item-description"><b>AC: </b>{this.ac}</p>;
        }

        return null;
    }

    strengthDisplay() {
        if (this.strength) {
            return (
                <p className="item-description">
                    <b>Strength: </b>{this.strength}
                </p>
            );
        }

        return null;
    }

    stealthDisplay() {
        if (this.stealth) {
            return (
                <p className="item-description">
                    <b>Stealth: </b>{this.stealth}
                </p>
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
                <p className="item-description">
                    <b>Properties: </b>{this.property}
                </p>
            );
        }

        return null;
    }

    descriptionDisplay() {
        if (this.description) {
            return (
                <p
                    className="item-description"
                    dangerouslySetInnerHTML={{
                        __html: "<b>Description: </b>" + this.description,
                    }}
                />
            );
        }

        return null;
    }

    acMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("ac ")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    damageMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("damage ")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    attackMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("attacks")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    saveMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("saving throws")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    spellAttackMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("spell attack")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    spellDcMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("spell dc")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    proficiencyMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("proficiency bonus")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    hpMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("hp")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    speedMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("speed")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    initiativeMod() {
        var that = this;

        if (this.modifiers === undefined) {
            return 0;
        }

        this.modifiers.forEach(function(mod) {
            if (mod.name.includes("initiative")) {
                return that.modValue(mod);
            }
        });

        return 0;
    }

    equippable() {
        return (
            this.type !== "S" &&
            this.type !== "LA" &&
            this.type !== "MA" &&
            this.type !== "HA" &&
            this.type !== "M" &&
            this.type !== "R" &&
            this.type !== "A"
        );
    }

    isWeapon() {
        switch (this.type) {
            case "M":
                return true;
            case "R":
                return true;
            default:
                return false;
        }
    }

    isRangedWeapon() {
        return this.type === "R";
    }

    isMeleeWeapon() {
        return this.type === "M";
    }

    isGear() {
        switch (this.type) {
            case "S":
            case "LA":
            case "MA":
            case "HA":
            case "M":
            case "R":
            case "A":
                return false;
            default:
                return true;
        }
    }

    isAmmo() {
        return this.type === "A";
    }

    isFinesse() {
        if (this.property) {
            return this.property.includes("F");
        }

        return false;
    }

    isArmor() {
        switch (this.type) {
            case "HA":
            case "MA":
            case "LA":
            case "S":
                return true;
            default:
                return false;
        }
    }
}
