import React from "react";

import FlatButton from "material-ui/FlatButton";

export const Title = () =>
    <div id="title">
        d20
    </div>;

export class NumberPicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = props;
    }

    render() {
        var buttonStyle = {
            width: "40px",
            minWidth: "40px",
            display: "inline",
        };

        return (
            <span className="quantity-picker">
                <div className="quantity-label">
                    {this.props.label}
                </div>
                <FlatButton
                    className="quantity-button"
                    label="-"
                    onTouchTap={() => {
                        var newValue = this.state.value - 1;
                        if (this.props.min !== undefined) {
                            if (newValue <= this.props.min) {
                                newValue = this.props.min;
                            }
                        }

                        this.setState({value: newValue});
                        this.props.callback(newValue);
                    }}
                    labelStyle={{fontSize: "8pt"}}
                    style={this.buttonStyle}
                />
                <div className="white-block">{this.state.value}</div>
                <FlatButton
                    className="quantity-button"
                    label="+"
                    onTouchTap={() => {
                        var newValue = this.state.value + 1;
                        if (this.props.max !== undefined) {
                            if (newValue >= this.props.max) {
                                newValue = this.props.max;
                            }
                        }

                        this.setState({value: newValue});
                        this.props.callback(newValue);
                    }}
                    labelStyle={{fontSize: "8pt"}}
                    style={this.buttonStyle}
                />
            </span>
        );
    }
}

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
