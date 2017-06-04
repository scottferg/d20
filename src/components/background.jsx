import React from 'react';
import Header from './common'

class NoteRow extends React.Component {
    render() {
        return (
            <div className="background-row">
                <div className="background-header">{this.props.note.title}</div>
                <div>{this.props.note.description}</div>
            </div>
        );
    }
}

class BackgroundRow extends React.Component {
    render() {
        return (
            <div className="background-row">
                <div className="background-header">{this.props.trait.name}</div>
                <div>{this.props.trait.description}</div>
            </div>
        );
    }
}

class Background extends React.Component {
    render() {
        var notesList = this.props.character.notes.map(function(note) {
            return <NoteRow note={note} />
        })

        var classFeaturesList = this.props.character.classFeatures.map(function(feature) {
            return <BackgroundRow trait={feature} />
        })

        var raceFeaturesList = this.props.character.race.traits.map(function(feature) {
            return <BackgroundRow trait={feature} />
        })

        var backgroundList = this.props.character.background.traits.map(function(trait) {
            return <BackgroundRow trait={trait} />
        })

        return (
            <div id="background" className="full-module">
                <Header name="Notes" />
                {notesList}
                <div className="section-header" />
                <Header name="Class Features" />
                {classFeaturesList}
                <div className="section-header" />
                <Header name="Race Features" />
                {raceFeaturesList}
                <div className="section-header" />
                <Header name="Background" />
                {backgroundList}
            </div>
        );
    }
}

export default Background;
