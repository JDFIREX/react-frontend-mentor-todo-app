import React from "react"
import "./Header.css"
import sun from "./../../images/icon-sun.svg"
import moon from "./../../images/icon-moon.svg"
const Header = ({setDarkmode, Darkmode}) => {
    return(
        <div className={!Darkmode ? "Header" : "Header_light"}>
            <h1>TODO</h1>
            <button onClick={() => setDarkmode(!Darkmode)} ><img src={!Darkmode ? sun : moon}  alt="darkmode" /></button>
        </div>
    )
}


export default Header;