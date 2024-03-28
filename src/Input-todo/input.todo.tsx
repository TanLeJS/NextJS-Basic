import { useState } from "react";


interface Iprops {
    name: string;
    age: number;
    info: {
        gender: string,
        address: string
    }
    ericFunction: (eric: string) => void;
    listTodo: string[];
    setListTodo: (value: string[]) => void;
}

const InputTodo = (props: Iprops) => {
    const { ericFunction, listTodo, setListTodo } = props
    const [name, setName] = useState("")
    const handleClick = () => {
        // ericFunction(name)
        if (!name) {
            alert("empty name")
            return;
        }
        setListTodo([...listTodo, name])
        setName("")
    }

    return (
        <div>
            <div>age = {props.age} </div>
            <div>name = {props.name} </div>
            <div>Add new input</div>
            <input
                value={name}
                type="text"
                onChange={(event) => {
                    setName(event.target.value)
                }} />
            &nbsp;
            &nbsp;
            <button onClick={() =>
                handleClick()
            }>Save</button>


        </div>
    )
}

export default InputTodo