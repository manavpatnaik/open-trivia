import React from "react";
import { useGlobalContext } from "./context";
import Loading from "./Loading";
import Modal from "./Modal";
import SetupForm from "./SetupForm";

const App = () => {
  const {
    loading,
    questions,
    index,
    nextQuestion,
    correct,
    checkAnswer,
    waiting,
  } = useGlobalContext();

  if (waiting) return <SetupForm />;
  if (loading) return <Loading />;

  const { question, correct_answer, incorrect_answers } = questions[index];
  let answers = [...incorrect_answers, correct_answer];

  return (
    <main className="quiz-container">
      <Modal />
      <section className="quiz">
        <p className="correct-answers">
          Correct answers: {correct}/{index}
        </p>
        <article className="question-container">
          <h2
            dangerouslySetInnerHTML={{ __html: `${index + 1}. ${question}` }}
          />
          <div className="answers-container">
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(answer === correct_answer)}
                dangerouslySetInnerHTML={{ __html: answer }}
              />
            ))}
          </div>
        </article>
        <button className="next-btn" onClick={nextQuestion}>
          Next question
        </button>
      </section>
    </main>
  );
};

export default App;
