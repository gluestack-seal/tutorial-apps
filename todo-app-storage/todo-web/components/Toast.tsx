import React from 'react'
import { useApp } from '../context/app';
import { IToast } from '../interfaces';
import styles from "../styles/style.module.css";

const Toast = (props: { toast: IToast }) => {
  const { toggleToast }: any = useApp();

  React.useEffect(() => {
    if (props.toast.display) {
      const timeoutId = setTimeout(() => {
        const obj = { display: false, success: false, message: '' };
        toggleToast(obj);
      }, 2000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [props])

  return (
    <>
      {props.toast.display && <div className={`${styles.toast} m-2 px-3 py-2 ${props.toast.success ? 'bg-purple-800' : 'bg-red-800'} rounded`}>
        {props.toast.message}
      </div>}
    </>
  )
}

export default Toast
