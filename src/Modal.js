import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const { correct, questions, modal, closeModal } = useGlobalContext();

  return (
    <article className={modal ? "modal isOpen" : "modal"}>
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {correct} of {questions.length} questions correctly
        </p>
        <button className="close-btn" onClick={closeModal}>
          Play again
        </button>
      </div>
    </article>
  );
};

export default Modal;
