import React, { useEffect } from "react";
import { MdDeleteForever, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoMdCheckboxOutline } from "react-icons/io";
import { BiImage } from "react-icons/bi";
import { useData } from "../context/data";
import {
  Todos,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useInsertTodoFileIdMutation,
} from "../services/__generated__";
import styles from "../styles/style.module.css";
import FileUpload from "./FileUpload";
import { useGlue } from "@gluestack/glue-client-sdk-react";
import Button from "./Button";
import { AiOutlineUpload } from "react-icons/ai";
import { useApp } from "../context/app";

const TodoBox = ({ todo }: { todo: Todos }) => {
  const { glue } = useGlue([]);
  const { toggleToast }: any = useApp();
  const { markComplete, deleteTodo, deleteImage }: any = useData();

  const [fileURL, setFileURL] = React.useState("");
  const [isHidden, setIsHidden] = React.useState(true);

  const [deleteTodoGQL] = useDeleteTodoMutation();
  const [updateTodoGQL] = useUpdateTodoMutation();
  const [insertFileId] = useInsertTodoFileIdMutation();

  const checkedHandler = async () => {
    try {
      const { data } = await updateTodoGQL({
        variables: { id: todo.id, is_completed: !todo.is_completed },
      });
      if (data?.update_todos_by_pk) {
        markComplete({ id: todo.id, is_completed: todo.is_completed });
      }
    } catch (error) {
      console.error(error);
      toggleToast({
        success: false,
        display: true,
        message: "something went wrong!",
      });
    }
  };

  const deleteHandler = async () => {
    try {
      const { data } = await deleteTodoGQL({ variables: { id: todo.id } });
      if (data?.delete_todos_by_pk) {
        deleteTodo(todo.id);
      }
      toggleToast({
        success: true,
        display: true,
        message: "Todo deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      toggleToast({
        success: false,
        display: true,
        message: "something went wrong!",
      });
    }
  };

  const showImage = async () => {
    setIsHidden((val) => !val);
  };

  const getURL = (filePath: string) => {
    const url = glue.storage.getPublicUrl(filePath);
    setFileURL(url);
  };

  useEffect(() => {
    getURL(todo?.file?.path || "");
  }, [todo?.file?.path]);

  const deleteTodoImage = async () => {
    try {
      const { data } = await insertFileId({
        variables: { id: todo.id, file_id: null },
      });
      if (data?.update_todos_by_pk) {
        deleteImage(todo.id);
        setFileURL("");
      }
      toggleToast({
        success: true,
        display: true,
        message: "Image deleted successfully!",
      });
    } catch (error) {
      console.error(error);
      toggleToast({
        success: false,
        display: true,
        message: "Failed to delete image!",
      });
    }
    setIsHidden(true)
  };

  return (
    <>
      <div className={`relative ${styles.todo}`}>
        <div className="flex items-center justify-between text-left px-3 py-3 gap-3 text-2xl font-thin break-all max-w-full border-b">
          <span>
            {todo.is_completed ? (
              <IoMdCheckboxOutline onClick={checkedHandler} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank onClick={checkedHandler} />
            )}
          </span>
          <span className="w-8">
            {todo.file_id ? (
              <img alt="" src={fileURL} className="h-8" onClick={showImage} />
            ) : (
              <BiImage />
            )}
          </span>
          <span className={`flex-1 ${todo.is_completed && "line-through"}`}>
            {todo.title}
          </span>
        </div>
        <span className="flex absolute right-0 bottom-4">
          <span
            onClick={deleteHandler}
            className={`${styles.delete}  text-2xl mr-3 cursor-pointer`}
          >
            <MdDeleteForever />
          </span>
          <span className={`${styles.delete} text-2xl cursor-pointer`}>
            {!todo.file_id && (
              <FileUpload id={todo.id}>
                <AiOutlineUpload />
              </FileUpload>
            )}
          </span>
          <span className="text-2xl mr-3 cursor-pointer">
            {todo.file_id && <BiImage onClick={showImage} />}
          </span>
        </span>
      </div>
      {!isHidden && (
        <span className="flex flex-col justify-center border-b">
          <img alt="" src={fileURL} height="100%" />
          <span className="flex justify-evenly py-2">
            <FileUpload id={todo.id} cb={getURL}>
              <Button>Replace</Button>
            </FileUpload>
            <Button
              className="bg-red-500 border border-red-500"
              onClick={deleteTodoImage}
            >
              Delete
            </Button>
          </span>
        </span>
      )}
    </>
  );
};

export default TodoBox;
