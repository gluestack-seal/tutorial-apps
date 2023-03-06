import React, { useEffect, useState } from 'react'
import { useData } from '../context/data';
import { Todos } from '../services/__generated__';
import TodoBox from './TodoBox'

const TodosContainer = () => {
  const { todos, filter }: any = useData();
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    switch (filter) {
      case 'all':
        setFilteredTodos(todos)
        break;
      case 'active':
        setFilteredTodos(todos.filter((todo: { is_completed: any; }) => !todo.is_completed))
        break;
      case 'completed':
        setFilteredTodos(todos.filter((todo: { is_completed: any; }) => todo.is_completed))
        break;
    
      default:
        setFilteredTodos(todos)
        break;
    }
  }, [todos, filter])

  return (
    <div className=''>
      {filteredTodos?.map((todo: Todos) => (
        <TodoBox key={todo.id} todo={todo} />
      ))}
    </div>
  )
}

export default TodosContainer
