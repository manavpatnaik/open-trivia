import React, { useContext, useEffect, useState } from "react";

const API_ENDPOINT = "https://opentdb.com/api.php";
const AppContext = React.createContext();

const table = {
  sports: 21,
  history: 23,
  politics: 24,
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [modal, setModal] = useState(false);
  const [waiting, setWaiting] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [options, setOptions] = useState({
    amount: 10,
    category: "sports",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    console.log("Fetching questions");
    setWaiting(false);
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();

    setQuestions(data.results);
    setLoading(false);
  };

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      if (oldIndex + 1 > questions.length - 1) {
        openModal();
        return oldIndex;
      } else {
        return oldIndex + 1;
      }
    });
  };

  const checkAnswer = (checkVal) => {
    if (checkVal) setCorrect(correct + 1);
    nextQuestion();
  };

  const handleOptions = (e) => {
    setOptions((oldOptions) => {
      return { ...oldOptions, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let url = `${API_ENDPOINT}?amount=${options.amount}&category=${
      table[options.category]
    }&difficulty=${options.difficulty}`;
    fetchQuestions(url);
  };

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setWaiting(true);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        questions,
        index,
        correct,
        waiting,
        options,
        modal,
        setOptions,
        checkAnswer,
        nextQuestion,
        setWaiting,
        handleOptions,
        handleSubmit,
        openModal,
        closeModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
