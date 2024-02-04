import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((resp) => resp.json())
    .then((questions) => setQuestions(questions))
  }, [])

  // HANDLE ADDED QUESTIONS
  function handleAddQuestion(newQuestion){
    console.log("hey i've been added", newQuestion)
    setQuestions([...questions, newQuestion]); 
  }

  // HANDLE DELETED QUESTIONS 
  function handleDeleteQuestion(deletedQuestion){
    const updatedQuestions = questions.filter((question) => 
    question.id !== deletedQuestion);
    setQuestions(updatedQuestions)
  }

  // HANDLE UPDATED QUESTIONS 
  function handleUpdateQuestion(updatedItem){
    const updatedQuestions = questions.map((question) => {
      if (question.id === updatedItem.id){
        return updatedItem
      }else {
        return question 
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm 
      onAddQuestion={handleAddQuestion}/> : 
      <QuestionList 
      questions ={questions}
      onDeleteQuestion ={handleDeleteQuestion}
      onUpdateQuestion = {handleUpdateQuestion}/>
      }
    </main>
  );
}

export default App;
