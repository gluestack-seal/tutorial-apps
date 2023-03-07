import React from "react";
import { useGlue } from "@gluestack/glue-client-sdk-react";
import { useInsertTodoFileIdMutation } from "../services/__generated__";
import { useData } from "../context/data";
import { useApp } from "../context/app";

const FileUpload = (props: any) => {
  const { glue } = useGlue([]);
  const { toggleToast }: any = useApp();
  const fileInput: any = React.useRef(null);
  const { attachFile }: any = useData();

  const [insertFileId] = useInsertTodoFileIdMutation();

  const handleUpload = async (file: any) => {
    try {
      const response: any = await glue.storage.upload(file, true);

      if (typeof response === "string") {
        console.error(response);
        toggleToast({ success: false, display: true, message: response });
        return;
      }

      if (!response || !response.id || !response.path) {
        console.error(response.message);
        toggleToast({
          success: false,
          display: true,
          message: "something went wrong!",
        });
        return;
      }

      const { data } = await insertFileId({
        variables: { id: props.id, file_id: response.id },
      });
      if (data?.update_todos_by_pk) {
        attachFile({ id: props.id, file_id: response.id });
      }

      toggleToast({
        success: true,
        display: true,
        message: "successfully uploaded!",
      });

      // run only when replace action trigger
      if (props.cb) await props.cb(response.path);
    } catch (error: any) {
      console.error(error.message);
      toggleToast({
        success: false,
        display: true,
        message: "something went wrong!",
      });
    }
  };

  const handleChange = (e: any) => handleUpload(e.target.files[0]);

  const uploadInputTrigger = () => fileInput.current.click();

  return (
    <>
      <input
        type="file"
        ref={fileInput}
        onChange={handleChange}
        style={{ display: "none" }}
        accept="image/jpeg, image/png"
      />
      <span onClick={uploadInputTrigger}>{props.children}</span>
    </>
  );
};

export default FileUpload;
