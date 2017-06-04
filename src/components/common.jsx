import React from 'react';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div>{this.props.name}</div>
                <div className="hr" />
            </div>
        );
    }
}
