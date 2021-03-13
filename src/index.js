import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import Header from "./app/Header/Header"
import Todo from "./app/Todo/todo"
import "./index.css"

const Root = () => {

    const [Darkmode,setDarkmode] = useState(false)

    useEffect(() => {
        Darkmode === false ? document.querySelector('.body').style.backgroundColor = "hsl(235, 21%, 11%)" : document.querySelector('.body').style.backgroundColor = "hsl(236, 33%, 92%)" 
    },[Darkmode])

    return (
        <React.StrictMode>
            {Darkmode === false ? (
                <div className="root_bg"></div>
            ) : (
                <div className="root_bg__light"></div>
            )}
            <Header setDarkmode={setDarkmode} Darkmode={Darkmode}/>
            <Todo Darkmode={Darkmode}/>
        </React.StrictMode> 
    )

}



ReactDOM.render(<Root />, document.querySelector('#root'))