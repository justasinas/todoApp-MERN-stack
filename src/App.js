import './App.css';
import { Button, ListItem, ListItemText, TextField } from '@material-ui/core'
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
      .catch(err => console.error("Error:", err));
  }
  const toggleInProgress = async id => {
		const data = await fetch(API + '/todo/progress/' + id).then(res => res.json());

		setTodos(todos => todos.map(todo => {
			if (todo._id === data._id) {
				todo.progress = data.progress;
			}
			return todo;
		}));
	}
	const addTodo = async () => {
		const data = await fetch(API + "/todo/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: todoInput
			})
		}).then(res => res.json());

		setTodos([...todos, data]);
		setTodoInput("");
	}
   const deleteTodo = async id => {
    const data = await fetch(API + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());
    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
   }
  return (
    <div className="App">
      <form>
        <h3 key="heading text">What todo?</h3>
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
      {todos.map(todo => (
          <div className="listItems">
            <ListItem>
              <ListItemText key={todo._id} primary={todo.text} secondary={todo.progress ? "Completed" : "In progress"}></ListItemText>
            </ListItem>
             <Button onClick={() => toggleInProgress(todo._id)}>{todo.progress ? "undo" : "Done"}</Button>
             <Button onClick={() => deleteTodo(todo._id)}>X</Button>
      </div>
      ))}
    </div>
  );
}

export default App;
