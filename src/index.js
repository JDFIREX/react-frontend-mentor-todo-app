import React, { useState } from "react"
import ReactDOM from "react-dom"

import Header from "./app/Header/Header"
import Todo from "./app/Todo/todo"
import "./index.css"
import design from "./design/desktop-design-dark.jpg"

const Root = () => {

    const [Darkmode,setDarkmode] = useState(false)


    return (
        <React.StrictMode>
            <img src={design} className="design" ></img>
            <div className="root_bg"></div>
            <Header setDarkmode={setDarkmode} Darkmode={Darkmode}/>
            <Todo />
        </React.StrictMode> 
    )

}



ReactDOM.render(<Root />, document.querySelector('.root'))