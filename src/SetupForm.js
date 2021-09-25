import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { options, handleOptions, handleSubmit } = useGlobalContext();
  console.log(options);
  return (
    <div className="quiz-intro">
      <form className="quiz-form">
        <h2>Setup quiz</h2>
        <div className="form-control">
          <label htmlFor="amount">Enter the number of questions</label>
          <input
            type="number"
            name="amount"
            id="amount"
            min={1}
            max={10}
            className="form-input"
            value={options["amount"]}
            onChange={handleOptions}
          />
        </div>
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select
            name="category"
            id="category"
            value={options["category"]}
            onChange={handleOptions}
          >
            <option value="sports">sports</option>
            <option value="history">history</option>
            <option value="politics">politics</option>
          </select>
        </div>
        <div className="form-control">
          <label htmlFor="difficulty">Difficulty</label>
          <select
            name="difficulty"
            id="difficulty"
            value={options["difficulty"]}
            onChange={handleOptions}
          >
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="difficult">difficult</option>
          </select>
        </div>
        <button className="submit-btn" type="submit" onClick={handleSubmit}>
          Start
        </button>
      </form>
    </div>
  );
};

export default SetupForm;
