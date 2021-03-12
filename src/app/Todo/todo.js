import React, { useEffect, useState } from "react"
import Check from "./../../images/icon-check.svg"
import close from "./../../images/icon-cross.svg"
import "./todo.css"


const NewTodo = ({setList, list }) => {

    const [Checked, setChecked] = useState(false)
    const [todo, setTodo] = useState("")

    const ConfirmTodo = () => {
        if(todo.length > 0){
            let item = {
                id : list.length > 0 ? (Number(list[list.length - 1].id) + 1) : 1,
                Checked,
                todo
            };
            setList((list) => [...list,item])
            setTodo("");
            setChecked(false);
        }
    }

    return(
        <div className="NewTodo">
            <button className="add__new" onClick={() => setChecked(!Checked)} >
                <div className={Checked === true ? "button__inner__checked":"button__inner"}>
                    {Checked === true ? <img src={Check} alt="check new todo"/> : null }
                </div>
            </button>
            <div className="input__box">
                <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? ConfirmTodo() : null}  placeholder="Create a new todo.."/>
            </div>
            <button className="input__confirm" onClick={ConfirmTodo} >
                <img src={Check} alt="confirm" />
            </button>
        </div>
    )
}
const TodoItem = React.memo(({l,deleteItem,setList,list}) => {

    const handleClick = () => {
        let item = {
            id : l.id,
            todo :  l.todo,
            Checked : !l.Checked
        }
        let newList = list.map(r => r.id === l.id ? r = item : r = r);
        setList([...newList])
    }


    return(
        <div className="List__item">
            <button className="item_check" onClick={handleClick}>
                <div className={l.Checked === true ? "item__inner__checked":"item__inner"} data-id={l.id}>
                    {l.Checked === true ? <img src={Check} alt="check new todo"/> : null }
                </div>
            </button>
            <div className={l.Checked === true ? "item__todo__checked"  :"item__todo"}>
                <p>{l.todo}</p>
            </div>
            <div className="item__delete">
                <img src={close}  alt="delete todo" data-key={l.id} onClick={deleteItem} onKeyDown={(e) => e.key === "Enter" ? deleteItem : null}/>
            </div>
        </div>
    )
})



const ListActions = ({list,setSort,setList}) => {


    return (
        <div className="actions">
            <div className="items__left">
                <p>{list.filter(l => !l.Checked).length} items left</p>
            </div>
            <div className="actions__sort">
                <button className="items__all" onClick={(e) => setSort(e.target.dataset.s)} >
                    <p data-s="all">All</p>
                </button>
                <button className="items__active"  onClick={(e) => setSort(e.target.dataset.s)} >
                    <p data-s="active">Active</p>
                </button>
                <button className="items__completed" onClick={(e) => setSort(e.target.dataset.s)} >
                    <p data-s="completed">Completed</p>
                </button>
            </div>
            <button className="clear__completed" onClick={() => setList([...list.filter(l => l.Checked === false)]) } >
                <p>Clear Completed</p>
            </button>
        </div>
    )
}



const TodoList = ({list,setList}) => {

    const [sort, setSort] = useState("all")
    const deleteItem = (e) => {
        let newList = list.filter(l => Number(l.id) !== Number(e.target.dataset.key))
        setList([...newList]);
    }

    return(
        <>
            <div className="TodoList">
                {sort === "all" ? (
                    list.map(l => <TodoItem l={l} key={l.id} setList={setList} list={list} deleteItem={deleteItem}/>)
                ) : sort === "active" ? (
                    list.map(l => l.Checked === false && <TodoItem l={l} key={l.id}  deleteItem={deleteItem}/>)
                ) : (
                    list.map(l => l.Checked === true && <TodoItem l={l} key={l.id}  deleteItem={deleteItem}/>)
                )}
            </div>
            {list.length > 0 && (
                <ListActions list={list} setSort={setSort} setList={setList}/>
            )}
        </>
    )
}


const Todo =() => {

    const [List, setList] = useState([])

    return(
        <div className="Todo">
            <NewTodo setList={setList} list={List} />
            <TodoList list={List} setList={setList}/>
        </div>
    )
}

export default Todo;