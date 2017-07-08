import React from "react";
import ReactResizeDetector from "react-resize-detector";

import RefreshIndicator from "material-ui/RefreshIndicator";

import {Menu, MainButton, ChildButton} from "react-mfb";

import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import IconButton from "material-ui/IconButton";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import AppBar from "material-ui/AppBar";

import "react-mfb/mfb.css";
import "mdi/css/materialdesignicons.min.css";

import {connect} from "react-redux";

import AbilityScores from "./abilityScores";
import Background from "./background";
import Combat from "./combat";
import ClassSpells from "./classSpells";
import Equipment from "./equipment";
import Portrait from "./portrait";
import Skills from "./skills";
import Spells from "./spells";
import Status from "./status";

const mapStateToProps = (state, props) => {
    return {
        character: state.characterReducer.character,
        isLoading: state.characterReducer.isLoading,
    };
};

class AppMenu extends React.Component {
    render() {
        var that = this;

        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                iconStyle={{
                    color: "white",
                }}
                anchorOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}
                targetOrigin={{
                    horizontal: "right",
                    vertical: "top",
                }}>
                <MenuItem primaryText="Edit Combat Modifiers" />
                <MenuItem
                    primaryText="Edit Character Details"
                    onTouchTap={() => {
                        that.props.history.push(
                            "/character/" + that.props.name.toLowerCase() + "/details/edit",
                        );
                    }}
                />
                <MenuItem primaryText="Edit Ability Scores" />
                <MenuItem primaryText="Edit Skills" />
                <MenuItem primaryText="Sign out" />
            </IconMenu>
        );
    }
}

AppMenu.muiName = "IconMenu";

class CharacterSheetComponent extends React.Component {
    // TODO: This is janky as shit
    shouldLoad() {
        return false;
    }

    render() {
        if (this.shouldLoad()) {
            const style = {
                container: {
                    position: "relative",
                    margin: "auto",
                },
            };

            return (
                <div id="loading-indicator">
                    <RefreshIndicator
                        size={50}
                        left={0}
                        top={0}
                        loadingColor="#005453"
                        status="loading"
                        style={style.container}
                    />
                </div>
            );
        } else {
            return (
                <div className="character-sheet-container">
                    <div className="app-bar">
                        <AppBar
                            title="d20"
                            titleStyle={{
                                fontFamily: "accentFont",
                                fontSize: "40px",
                                textAlign: "left",
                            }}
                            iconElementRight={
                                <AppMenu
                                    name={this.props.character.name}
                                    history={this.props.history}
                                />
                            }
                            style={{backgroundColor: "#415A6E"}}
                        />
                    </div>
                    <div className="menu">
                        <AppMenu
                            name={this.props.character.name}
                            history={this.props.history}
                        />
                    </div>
                    <div className="top-sheet character-sheet">
                        <div id="left-container">
                            <Portrait character={this.props.character} />
                            <Status
                                cls="mobile-status"
                                characterName={this.props.character}
                            />
                            <Combat character={this.props.character} />
                            <Equipment character={this.props.character} />
                        </div>
                        <div id="right-container">
                            <Status cls="desktop-status" />
                            <AbilityScores character={this.props.character} />
                            <Skills character={this.props.character} />
                        </div>
                    </div>
                    <div className="lower-sheet character-sheet">
                        <ClassSpells character={this.props.character} />
                        <Spells character={this.props.character} />
                    </div>
                    <div className="lower-sheet character-sheet">
                        <Background character={this.props.character} />
                    </div>
                    <ReactResizeDetector
                        handleWidth
                        handleHeight
                        onResize={this._onResize.bind(this)}
                    />
                    <Menu effect="slidein-spring" method="click" position="br">
                        <MainButton
                            iconResting="mdi mdi-plus mdi-24px icon"
                            iconActive="mdi mdi-close mdi-24px icon"
                        />
                        <ChildButton
                            icon="mdi mdi-sword mdi-24px icon"
                            label="Add Equipment"
                            onClick={() => {
                                var route =
                                    "/character/" +
                                    this.props.character.name.toLowerCase() +
                                    "/items/add";
                                this.props.history.push(route);
                            }}
                        />
                        <ChildButton
                            icon="mdi mdi-script mdi-24px icon"
                            label="Add Spell"
                            onClick={() => {
                                var route =
                                    "/character/" +
                                    this.props.character.name.toLowerCase() +
                                    "/spells/add";
                                this.props.history.push(route);
                            }}
                        />
                        <ChildButton
                            icon="mdi mdi-book-open-page-variant mdi-24px icon"
                            label="Add Trait"
                            //onClick={function(e){ console.log(e); e.preventDefault(); }}
                        />
                    </Menu>
                </div>
            );
        }
    }

    _onResize(args) {
        console.log(args);
    }
}

const CharacterSheet = connect(mapStateToProps)(CharacterSheetComponent);

export default CharacterSheet;
