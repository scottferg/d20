import React from "react";

class PortraitText extends React.Component {
    render() {
        var classLevels = "";

        this.props.character.classes.forEach(function(cls) {
            classLevels = classLevels + " / " + cls.cls.name + " " + cls.level;
        });

        const raceLevel = this.props.character.race.name + classLevels;

        return (
            <div id="portrait-text">
                <p id="character-name">{this.props.character.name}</p>
                <p>{raceLevel}</p>
            </div>
        );
    }
}

class Portrait extends React.Component {
    render() {
        return (
            <div className="narrow-module" id="portrait-container">
                <img
                    className="portrait"
                    alt="Portrait"
                    src={this.props.character.playerImage}
                />
                <PortraitText character={this.props.character} />
            </div>
        );
    }
}

export default Portrait;
