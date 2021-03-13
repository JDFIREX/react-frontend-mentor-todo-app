import React, { useState, useEffect, useCallback } from "react"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"


import Check_light from "./../../images/icon-check.svg"
import Check_dark from "./../../images/icon-check-dark.svg"

import close from "./../../images/icon-cross.svg"
import "./todo.css"


const NewTodo = React.memo(({ConfirmTodo,Darkmode}) => {

    const [Checked, setChecked] = useState(false)
    const [todo, setTodo] = useState("")

    const handleClick = () => {
        ConfirmTodo(Checked,todo)
        setTodo("");
        setChecked(false);
    }

    return(
        <div className="NewTodo">
            <button className="add__new" onClick={() => setChecked(!Checked)} >
                <div className={Checked === true ? "button__inner__checked":"button__inner"}>
                    {Checked === true ? <img src={Check_light} alt="check new todo"/> : null }
                </div>
            </button>
            <div className="input__box">
                <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} onKeyDown={(e) => e.key === "Enter" ? handleClick() : null}  placeholder="Create a new todo.."/>
            </div>
            <button className="input__confirm" onClick={() => handleClick} >
                <img src={Darkmode===false ? Check_light : Check_dark} alt="confirm" />
            </button>
        </div>
    )
})

const TodoItem = ({l,deleteItem,itemChecked,index}) => {
    return(
        <Draggable draggableId={`${l.id}`} index={index}>
        {
            (provided) => (
                <div className="List__item" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <button className="item_check" onClick={() => itemChecked({id : l.id,todo :  l.todo,Checked : !l.Checked}, l.id)}>
                        <div className={l.Checked === true ? "item__inner__checked":"item__inner"} data-id={l.id}>
                            {l.Checked === true ? <img src={Check_light} alt="check new todo"/> : null }
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
        }
        </Draggable>
    )
}

const ListActions = React.memo(({Listlength,setSort,deleteCompleted}) => {

    const handleClick = (e) => {

        document.querySelector(".items__all").style.borderBottom = "none";
        document.querySelector(".items__active").style.borderBottom = "none";
        document.querySelector(".items__completed").style.borderBottom = "none";
        setSort(e.target.dataset.s)
        switch(e.target.dataset.s){
            case "all" :  document.querySelector(".items__all").style.borderBottom = "1px solid gray"; break;
            case "active" :  document.querySelector(".items__active").style.borderBottom = "1px solid gray";; break;
            case "completed" :  document.querySelector(".items__completed").style.borderBottom = "1px solid gray";; break;
            default : ; break;
        }
    }


    return (
        <div className="actions">
            <div className="items__left">
                <p>{Listlength} items left</p>
            </div>
            <div className="actions__sort">
                <button className="items__all" onClick={handleClick} >
                    <p data-s="all">All</p>
                </button>
                <button className="items__active"  onClick={handleClick} >
                    <p data-s="active">Active</p>
                </button>
                <button className="items__completed" onClick={handleClick} >
                    <p data-s="completed">Completed</p>
                </button>
            </div>
            <button className="clear__completed" onClick={deleteCompleted} >
                <p>Clear Completed</p>
            </button>
        </div>
    )
})

const TodoList = ({list,setList}) => {

    const [sort, setSort] = useState("all")
    const [Listlength, setLength] = useState(list.filter(l => !l.Checked).length)
    
    const deleteCompleted = useCallback(() => {
        if(list.filter(l => l.Checked === true).length > 0){
            setList([...list.filter(l => l.Checked === false)]);
        }
    },[list,setList])

    const deleteItem = useCallback((e) => {
        let newList = list.filter(l => Number(l.id) !== Number(e.target.dataset.key))
        setList([...newList]);
    },[setList, list])

    const itemChecked = useCallback((item, itemId)=> {
        let newList = list.map(nl => nl.id === itemId ? nl = item : nl);
        setList([...newList])
    },[list,setList])


    const DragEnd = (result) => {
        const {destination,source} = result;
        if(!destination){
            return;
        }
        if(destination.index === source.index){
            return;
        }
        let cp = source.index;
        let mp = destination.index;
        let item = list.splice(cp,1);
        list.splice(mp,0,...item);
        setList([...list])
    }


    useEffect(() => {
        setLength(list.filter(l => !l.Checked).length);
    },[list,setList])

    return(
        <>
            <DragDropContext onDragEnd={DragEnd} >
                <Droppable droppableId={"1"}>
                    {
                        (provided) => (
                            <div className="TodoList" {...provided.droppableProps} ref={provided.innerRef}>

                                    {sort === "all" ? (
                                        list.map((l,index) => <TodoItem l={l} key={l.id} index={index} itemChecked={itemChecked} deleteItem={deleteItem}/>)
                                    ) : sort === "active" ? (
                                        list.map((l,index) => l.Checked === false && <TodoItem l={l} index={index} key={l.id} itemChecked={itemChecked}  deleteItem={deleteItem}/>)
                                    ) : (
                                        list.map((l,index) => l.Checked === true && <TodoItem l={l} index={index} key={l.id} itemChecked={itemChecked}  deleteItem={deleteItem}/>)
                                    )}
                                    {provided.placeholder}

                            </div>
                        )
                    }
                </Droppable>
            </DragDropContext>
            {list.length > 0 && (
                <ListActions setSort={setSort} deleteCompleted={deleteCompleted} Listlength={Listlength} />
            )}
        </>
    )
}
const Todo =({Darkmode}) => {


    const [List, setList] = useState([])
    const [id, setId] = useState(1)


    const ConfirmTodo = (Checked,todo) => {

        if(todo.length > 0){

            let item = {
                id,
                Checked,
                todo
            };
            setId(id + 1)
            
            setList((List) => [...List,item])
        }
    }

    return(
        <div className={Darkmode === true ? "Todo__light" : "Todo"}>
            <NewTodo  ConfirmTodo={ConfirmTodo} Darkmode={Darkmode} />
            <TodoList list={List} setList={setList}/>
            {
                List.length > 0 && (
                    <div className="drag">
                        <p>Drag and drop to reorder list</p>
                    </div>
                )
            }
        </div>
    )
}

export default Todo;