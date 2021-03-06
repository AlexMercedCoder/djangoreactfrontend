import React from "react"

const Todos = (props) => {

    const [todos, setTodos] = React.useState(null)

    const getTodos = async () => {
        const response = await fetch(props.URL + 'todo/', {
            method: "get",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`
            }
        })
        const data = await response.json()
        console.log(data)
        setTodos(data)
    }

    React.useEffect(() => getTodos(), [])

    const newTodo = React.useRef(null)

    const handleNew = async(event) => {
        const response = await fetch(props.URL + 'todo/', {
            method: "post",
            headers: {
                Authorization: `Bearer ${props.tokens.access}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({item: newTodo.current.value})
        })

        getTodos()
        newTodo.current.value = ""
    }

return <>
<h1>Todos</h1>
<input type="text" name="newtodo" ref={newTodo}/>
<button onClick={handleNew}>New Todo</button>
<ul>
    {todos && todos.length > 0 ? todos.map((todo => <h1>{todo.item}</h1>)) : null}
</ul>
</>
}

export default Todos