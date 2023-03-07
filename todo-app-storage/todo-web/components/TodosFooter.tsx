import React from "react";
import { useApp } from "../context/app";
import { useData } from "../context/data";
import { useDeleteTodosMutation } from "../services/__generated__";

const TodosFooter = () => {
  const { toggleToast }: any = useApp();
  const [itemsLeft, setItemsLeft] = React.useState(0);
  const [markCompleted, setMarkCompleted] = React.useState(false);
  const { todos, deleteCompletedTodos, filter, setFilter }: any = useData();
  const activeBorder = "border-purple-800";

  const activeHandler = (value: string) => {
    setFilter(value);
  };

  const [deleteTodosGQL] = useDeleteTodosMutation();

  const deleteTodos = async () => {
    try {
      const { data } = await deleteTodosGQL();
      if (data?.delete_todos?.affected_rows && data?.delete_todos?.affected_rows > 0) {
        deleteCompletedTodos();
      }
      toggleToast({
        success: true,
        display: true,
        message: "Todos deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      toggleToast({
        success: false,
        display: true,
        message: "Failed to delete todos!",
      });
    }
  };

  React.useEffect(() => {
    const completeTodos = todos.filter(
      (todo: { is_completed: any }) => todo.is_completed,
    );

    setMarkCompleted(completeTodos.length > 0);
    setItemsLeft(todos.length - completeTodos.length);
  }, [todos]);

  if (!todos.length) {
    return <></>;
  }

  return (
    <div className="h-10 flex items-center justify-between text-sm font-thin px-3 select-none">
      <span>
        {itemsLeft} {itemsLeft > 1 ? "items" : "item"} left
      </span>
      <div className="flex gap-2">
        {["All", "Active", "Completed"].map((value, i) => (
          <span
            key={i}
            className={`border ${
              filter === value.toLowerCase() && activeBorder
            } px-2 cursor-pointer`}
            onClick={() => activeHandler(value.toLowerCase())}
          >
            {value}
          </span>
        ))}
      </div>
      <span
        className={`cursor-pointer ${!markCompleted && "invisible"}`}
        onClick={deleteTodos}
      >
        Clear completed
      </span>
    </div>
  );
};

export default TodosFooter;
