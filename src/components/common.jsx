import React from 'react';

export const Title = () =>
    <div id="title">
        d20
    </div>;

export class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div>{this.props.name}</div>
                <div className="hr" />
            </div>
        );
    }
}
