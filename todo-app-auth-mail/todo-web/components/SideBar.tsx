import React from 'react'
import { IoReorderThreeOutline } from 'react-icons/io5';
import { useData } from '../context/data';
import { Todos, useToggleTodosMutation } from '../services/__generated__';

const SideBar = () => {
  const { toggleTodos, }: any = useData();
  const [isChecked, setIsChecked] = React.useState(false);

  const [toggleTodosGQL] = useToggleTodosMutation();

  const toggleTodosAction = async () => {
    try {
      const { data } = await toggleTodosGQL({
        variables: {
          is_completed: isChecked
        }
      });
      if (data?.update_todos?.affected_rows && data?.update_todos?.affected_rows > 0) {
        toggleTodos(isChecked);
      }
      setIsChecked((val: boolean) => !val);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex items-center'>
      <IoReorderThreeOutline className={`text-4xl cursor-pointer ${isChecked ? "text-gray-400": ""}`} onClick={toggleTodosAction} />
    </div>
  )
}

export default SideBar
