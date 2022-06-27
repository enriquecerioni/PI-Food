import React from "react";
import loader from '../assets/loader/loader.gif';

const Loader = () => {
    return (
        <span>
            <img src={loader} alt="loader not found" width="200px" height="200px"/>
        </span>
    )
}

export default Loader;