import './App.css';
import TodoListItem from './Todo';
import TextField from "@material-ui/core/TextField"
import {useState, useEffect} from "react"
const API = 'http://localhost:3001';

function App() {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState("");

  useEffect(()=> {
    getTodos();
  },[]);

  const getTodos = () => {
      fetch(API + "/todos")
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch(err => console.error("Error:", err))
  }
  const addTodo = async () => {
    const data = await fetch(API + "todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: todoInput
      })
    }).then(res => res.json());
    setTodos([...setTodos, data]);
  }
  return (
    <div className="App">
      <form>
        <h3>What todo?</h3>
        <TextField 
          className="inputTask" 
          id="standard-basic" 
          label="Write a task" 
          variant="standard" 
          onChange={(e) => {setTodoInput(e.target.value)}} value={todoInput}
        />
        <button type="submit" className="btn_addTask" onClick={addTodo}>
          Add
        </button>
      </form>
      {todos.map((todo)=> (
        <TodoListItem 
          todo={todo.text} 
          inprogress={todo.progress} 
          id={todo.id} />
        //<p>{todo.todo}</p>
      ))}
    </div>
  );
}

export default App;
