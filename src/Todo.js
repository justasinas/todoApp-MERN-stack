import { Button, ListItem, ListItemText } from '@material-ui/core'
import React from 'react'
import './Todo.css';


const TodoListItem = ({todo, inprogress, id, API, setTodos}) => {
	const toggleInProgress = async id => {
		const data = await fetch(API + '/todo/progress/' + id).then(async response => {
            try {
             const data = await response.json()
             console.log('response data?', data)
           } catch(error) {
             console.log('Error happened here!')
             console.error(error)
           }
          })
		
	}
   const deleteTodo = async id => {
    const data = await fetch(API + '/todo/delete/' + id, { method: "DELETE" }).then(res => res.json());

    setTodos(todos => todos.filter(todo => todo._id !== data.result._id));
}

    return (
        <div className="listItems">
            <ListItem>
                <ListItemText primary={todo} secondary={inprogress ? "Completed" : "In progress"}></ListItemText>
            </ListItem>
            <Button onClick={() => toggleInProgress(todo._id)}>{inprogress ?"undo" : "Done"}</Button>
            <Button onClick={() => deleteTodo(todo._id)}>X</Button>
        </div>
    )
}
export default TodoListItem