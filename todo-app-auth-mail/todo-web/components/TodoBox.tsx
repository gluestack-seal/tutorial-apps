import React from "react";
import { MdDeleteForever, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { useData } from "../context/data";
import {
  Todos,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} from "../services/__generated__";
import styles from "../styles/style.module.css";

const TodoBox = ({ todo }: { todo: Todos }) => {
  const { markComplete, deleteTodo }: any = useData();

  const [deleteTodoGQL] = useDeleteTodoMutation();
  const [updateTodoGQL] = useUpdateTodoMutation();

  const checkedHandler = async () => {
    try {
      const { data } = await updateTodoGQL({
        variables: {
          id: todo.id,
          title: todo.title,
          is_completed: !todo.is_completed,
        },
      });
      if (data?.update_todos_by_pk) {
        markComplete({ id: todo.id, is_completed: todo.is_completed });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async () => {
    try {
      const { data } = await deleteTodoGQL({ variables: { id: todo.id } });
      if (data?.delete_todos_by_pk) {
        deleteTodo(todo.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`relative ${styles.todo}`}>
      <div className="flex items-center justify-between text-left px-3 py-3 gap-3 text-2xl font-thin break-all max-w-full border-b">
        <span>
          {todo.is_completed ? (
            <IoMdCheckboxOutline onClick={checkedHandler} />
          ) : (
            <MdOutlineCheckBoxOutlineBlank onClick={checkedHandler} />
          )}
        </span>
        <span className={`flex-1 ${todo.is_completed && "line-through"}`}>
          {todo.title}
        </span>
      </div>
      <span
        onClick={deleteHandler}
        className={`${styles.delete} absolute right-0 bottom-4 text-2xl mr-3 cursor-pointer`}
      >
        <MdDeleteForever />
      </span>
    </div>
  );
};

export default TodoBox;
