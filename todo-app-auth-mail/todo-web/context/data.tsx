import React from "react";
import { useLazyQuery } from "@apollo/client";
import { IProviderProps, IMarkComplete } from "../interfaces";
import {
  Todos,
  FetchTodosDocument,
  FetchTodosQuery,
  FetchTodosQueryVariables,
} from "../services/__generated__";
const Data = React.createContext({});

export function useData() {
  return React.useContext(Data);
}

export const DataProvider = ({ children }: IProviderProps) => {
  const [todos, setTodos] = React.useState<Todos[]>([]);

  const [filter, setFilter] = React.useState("all");

  const addTodo = (todo: Todos) => {
    setTodos([...todos, todo]);
  };

  const editTodo = ({ id, newTitle }: any) => {
    const editedTodos: Todos[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            title: newTitle,
          }
        : todo,
    );

    setTodos(editedTodos);
  };

  const markComplete = ({ id, is_completed }: IMarkComplete) => {
    const updatedTodos: Todos[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            is_completed: !is_completed,
          }
        : todo,
    );

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.is_completed));
  };

  const toggleTodos = (isChecked: boolean) => {
    setTodos(todos.map((todo) => {
     return {
      ...todo,
      is_completed: isChecked,
    }
    }));
  };

  const [fetchTodosLazily, { data }] = useLazyQuery<
    FetchTodosQuery,
    FetchTodosQueryVariables
  >(FetchTodosDocument);

  React.useEffect(() => {
    if (!data) {
      fetchTodosLazily();
    }

    if (data) {
      setTodos(data.todos);
    }
  }, [data]);

  return (
    <>
    <Data.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        editTodo,
        markComplete,
        deleteTodo,
        toggleTodos,
        deleteCompletedTodos,
        filter,
        setFilter,
      }}
    >
      {children}
    </Data.Provider>
    </>
  );
};
