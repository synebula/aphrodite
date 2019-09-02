import React from "react";
import { Redirect, Route } from "react-router-dom";

export default (props) => {
    return (
        <Redirect to='/home' />
    );
};