import { useEffect, useState } from "react";
import "./App.css";
import InputTodo from "./Input-todo/input.todo";

function App() {


  const [count, setCount] = useState(0);
  const name = "Hoi dan it";
  const age = 26;
  const info = {
    gender: "male",
    address: "da nang",
  };
  const [listTodo, setListTodo] = useState(["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"])


  const handleTest = (name: string) => {
    alert(`handle test with name = ${name}`)
  }

  return (
    <div>
      <InputTodo
        name={name}
        age={age}
        info={info}
        ericFunction={handleTest}
        listTodo={listTodo}
        setListTodo={setListTodo}
      />
      <br />
      <ul>
        {listTodo.map((item, index) => {
          return (
            <li key={index}>{item}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
