import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateQuestion }) {
  // Check if the question or answers is undefined
  if (!question || !question.answers) {
    return null; 
  }

  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  

  function handleDelete(){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
    .then((resp) => resp.json())
    .then(() => onDeleteQuestion(question.id))
  }

  // 
  function handleUpdate(e){
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //  If the input might contain non-numeric characters, to handle those cases strictly, add Number 
        correctIndex: Number.parseInt(e.target.value),
      }),
    })
    .then((resp) => resp.json())
    .then((updatedItem) => onUpdateQuestion(updatedItem))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select 
        defaultValue={correctIndex}
        onChange={handleUpdate}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
