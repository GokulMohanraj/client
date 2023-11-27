
import { useRouter } from 'next/router';
import * as style from '../components/tailwindUtils';
import {useState, useEffect} from 'react'

const userLoggedIn = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [username, setUsername] = useState('Loading....')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    const fetchName = async () => {
      try {
        const userResponse = await fetch(`http://localhost:3001/${id}`);
        const userData =await userResponse.json();
        const name =await userData.entity.name

        if (name) {
          setUsername(name);
        } else {
          alert(userData.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const fetchTodo = async () => {
       try{
        const todosResponse = await fetch(`http://localhost:3001/user/${id}/todolist`);
        const todosData =await todosResponse.json();
        const data =await todosData.entity

        if (Array.isArray(data)) {
          setTodos(data);
          } else {
            console.error('Invalid todos data:', data);
          }
        }catch(error){
        console.error('Error fetching data:', error);
        }
      }

    fetchName();
    fetchTodo();
  }, [id]);


  const handleAddTodo = () => {
    router.push(`/${id}/create_todo`)
  };

  const logout = async() => {
    try {
        localStorage.clear()
        setUsername('');
        setTodos([]);
        router.replace('/');
    } catch (error) {
      alert('Error during logout:', error);
    }

  }

  const deleteTodo = async(todoId, title) => {
    try {
      await fetch(`http://localhost:3001/user/${id}/todolist/${todoId}`, {
        method: 'DELETE',
      });
      alert(`${title} Deleted sucessfully`)
      setTodos((oldTodos) => oldTodos.filter((todo) => todo.id !== todoId));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  const editTodo = async(todoId, status) => {
    try {
      const updatedTodo = {
        status: status === 'completed' ? 'in-progress' : 'completed',
      };

      await fetch(`http://localhost:3001/user/${id}/todolist/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      setTodos((oldTodos) =>
          oldTodos.map((todo) =>
            todo.id === todoId ? { ...todo, status:updatedTodo.status } : todo
          )
        );
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  }

  return (
    <div className='h-screen'>
      <div className={style.bodyClass}>
        <h1 className={style.titleClass}>Welcome <snap className='text-violet-500'>{username}</snap> !</h1>

        <h2 className=' text-base text-white underline font-semibold mb-4'>List of todo's</h2>
        <ul>
          {todos.filter((todo) => todo.status !== 'completed')
          .map((todo, index) => (
            <li className='rounded-md mb-4 p-4 bg-gray-100' key={index}>
              <div className=' font-bold text-lg underline'>Title: {todo.title}</div>
              <div>Description: {todo.description}</div>
              <div>Status: {todo.status}</div>
              <div >
                <button className={style.editButtonClass} onClick={() => editTodo(todo.id, todo.status)}>
                {todo.status === 'completed' ? 'In Progress' : 'Completed'}
                </button>
                <button className={style.deleteButtonClass} onClick={() => deleteTodo(todo.id, todo.title)}>Delete</button>
              </div>
            </li>
          ))}

          {todos.filter((todo) => todo.status === 'completed')
          .map((todo, index) => (
            <li className='rounded-md mb-4 p-4 bg-gray-100' key={index}>
              <div className=' font-bold text-lg underline'>Title: {todo.title}</div>
              <div>Description: {todo.description}</div>
              <div className=' bg-green-300'>Status: {todo.status}</div>
              <div >
                <button className={style.editButtonClass} onClick={() => editTodo(todo.id, todo.status)}>
                {todo.status === 'completed' ? 'In Progress' : 'Completed'}
                </button>
                <button className={style.deleteButtonClass} onClick={() => deleteTodo(todo.id, todo.title)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>

        <div className=' flex flex-col  '>
          <button
            className ={style.buttonClass}
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
          <button
            className ={style.logoutButtonClass}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default userLoggedIn;
