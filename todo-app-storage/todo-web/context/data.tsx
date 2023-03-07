import { useLazyQuery } from "@apollo/client";
import React from "react";
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

  const attachFile = ({ id, file_id }: { id: number; file_id: number }) => {
    const editedTodos: Todos[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            file_id,
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

  const deleteImage = (id: number) => {
    const updatedTodos: Todos[] = todos.map((todo) =>
      todo.id === id
        ? {
            ...todo,
            file_id: null,
          }
        : todo,
    );

    setTodos(updatedTodos);
  };

  const deleteCompletedTodos = () => {
    setTodos(todos.filter((todo) => !todo.is_completed));
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
      //@ts-ignore
      setTodos(data.todos);
    }
  }, [data]);

  const toggleTodos = (isChecked: boolean) => {
    setTodos(todos.map((todo) => {
     return {
      ...todo,
      is_completed: isChecked,
    }
    }));
  };

  return (
    <Data.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        attachFile,
        markComplete,
        deleteTodo,
        deleteImage,
        deleteCompletedTodos,
        filter,
        setFilter,
        toggleTodos,
      }}
    >
      {children}
    </Data.Provider>
  );
};
