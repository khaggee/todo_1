import { useEffect, useState } from 'react'
import { Todoprovider } from './Context'
import { TodoForm, TodoItem} from './components/index'
import { ThemeProvider } from './Context/Theme.js'
import ThemeBtn from './components/ThemeButton.jsx'


function App() {
  const [todos, setTodos] = useState([])
  
  const [themeMode, setThemeMode] = useState("light")
   
  const lightTheme = () => {setThemeMode("light")}
  const darkTheme = () => {setThemeMode("dark")}

  const addTodo  = (todo) => {
    setTodos((prev) => [...prev , {id: Date.now(), ...todo}] )
  }

  const updateTodo = (id, todo) => {
     setTodos((prev)=>prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))


  }

  const deleteTodo = (id) => {
     setTodos((prev) => prev.filter((todo) => todo.id !== id ) )

  }

  const toggleCompleted = (id) => {
    setTodos ((prev) => prev.map((prevTodo) => prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed } : prevTodo ) )
  } 

  useEffect(()=>{
  const todos =  JSON.parse( localStorage.getItem("todos"))
  
  if ( todos && todos.length > 0 ) {
    setTodos(todos)
  }

  },[])

useEffect(()=>{
  localStorage.setItem("todos", JSON.stringify(todos))
},[todos])




useEffect(()=>{
  document.querySelector('html').classList.remove("light", "dark")
  document.querySelector('html').classList.add(themeMode)
},[themeMode])



  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
<Todoprovider value={{todos, addTodo , updateTodo , deleteTodo , toggleCompleted}}>

      

    <div className=" bg-white min-h-screen py-8 dark:bg-[#172842] ">
    <span className="w-full max-w-xl text-md font-bold mx-auto flex justify-start mb-4 dark:text-white">
     List of Things You Have To-Do. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                             <ThemeBtn/> </span>

    <div className="w-full max-w-2xl mx-auto shadow-2xl rounded-lg px-4 py-3 text-white dark:bg-[#1e3355]">
        <h1 className=" text-black text-2xl font-bold text-center mb-8 mt-2 dark:text-white">Manage Your Todos</h1> 
          
        <div className="mb-4">

            <TodoForm />

        </div>
        <div className="flex flex-wrap gap-y-3">
            {todos.map((todo)=> (
              <div key={todo.id}
              className='w-full'>

                <TodoItem todo={todo}/>


              </div>
            ))}

        </div>
    </div>
</div>
</Todoprovider>
</ThemeProvider>


  )
} 

export default App


