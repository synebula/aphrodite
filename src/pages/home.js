import React, { PureComponent } from 'react';
import { Button } from "antd";
import { connect } from 'react-redux';

@connect(({ globle }) => ({
    globle: globle
}))
export default class Index extends PureComponent {
    constructor(props) {
        super(props);
    }

    onClick() {
        const { dispatch } = this.props;
        dispatch({
            type: 'globle/increment'
        });
    }

    render() {
        const { globle: { number } } = this.props;
        return (
            <div>
                <div>Number: {number}</div>
                <Button onClick={() => this.onClick()}>Hello World</Button>
                <Button onClick={() => { this.props.dispatch({ type: "globle/changeTheme" }) }}>Change Theme</Button>
                <Button onClick={() => { this.props.history.push("/systems/users") }}>Redirect</Button>
            </div >
        );
    }
}
