import logo from './logo.svg';
import './App.css';
import {Route} from "react-router-dom"
import React from "react"
import Login from "./pages/Login"
import Todos from "./pages/todos"

function App(props) {
  
  const [token, setToken] = React.useState({})

  const URL = "https://djangoreactbackendam.herokuapp.com/"

  const getToken = async (un, pw) => {
    const response = await fetch(URL + "api/token/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: un, password: pw})
    })
    const data = await response.json()
    console.log(data)
    setToken(data)
    localStorage.setItem("token", JSON.stringify(data))
  }

  React.useEffect(() => {
    const possibleToken = JSON.parse(localStorage.getItem("token"))
    if (possibleToken){
      setToken(possibleToken)
    }
  }, [])

  React.useEffect(() => {
    if(token.access){
      props.history.push("/todos")
    } else {
      props.history.push("/")
    }
  }, [token.access])
  
  return (
    <div className="App">
  <h1>My TOdo List</h1>



  <Route exact path="/" render={(rp) => <Login getToken={getToken} {...rp}/>}/>

  <Route path="/todos" render={(rp) => <Todos tokens={token} URL={URL} {...rp}/>}/>
    </div>
  );
}

export default App;
