import { useRef, useState } from 'react';
import { Questions } from '../assets/Quetion';
import "../App.css";

export const Quiz = () => {
    let [index ,setIndex] = useState(0);
    let [question,setQuestion] = useState(Questions[index]);
    let [score ,setScore] = useState(0);
    let [lock,setLock] = useState(false);
    let [result,setResult] = useState(false);
    let option1 = useRef(null);
    let option2 = useRef(null);
    let option3 = useRef(null);
    let option4 = useRef(null);
    
    const options = [option1,option2,option3,option4];

    const checkAns = (e,ans) => {
       if (lock === false) {
            if (question.ans === ans) {
                e.target.classList.add("correct");
                setLock(true);
                setScore(++score);
            } else {
                e.target.classList.add("wrong");
                setLock(true);
                options[question.ans - 1].current.classList.add("correct");
            }
       }
        
    }
    const nextQuestion = () => {
        if (lock) {
            if (index < Questions.length-1) {
               setIndex(++index);
               setQuestion(Questions[index]);
               setLock(false);
               options.map((quiz) => {
                   quiz.current.classList.remove("wrong");
                   quiz.current.classList.remove("correct");
                   return null;
               })
            }else{
               setResult(true);
               return 0;
            }
        }
        
    }
  const restartQuiz= () => {
        setIndex(0);
        setQuestion(Questions[index]);
        setLock(false);
        setResult(false);
        setScore(0);
        return null;
    }
  return (
    <div className="container">
       <h1>Quiz</h1>
       <hr/>
       { result ? 
          <>
             <h3>You have completed the quiz.</h3>
             <h3>Score : { score } / { Questions.length }</h3>
             <button onClick={restartQuiz}>Restart</button>
          </>
          :
          <>
            <h3>{index + 1 } . { question.question }</h3>
            <ul>
                <li ref={option1} onClick={(e) => checkAns(e,1)}> { question.Option1 } </li>
                <li ref={option2} onClick={(e) => checkAns(e,2)}> { question.Option2 } </li>
                <li ref={option3} onClick={(e) => checkAns(e,3)}> { question.Option3 } </li>
                <li ref={option4} onClick={(e) => checkAns(e,4)}> { question.Option4 } </li>
            </ul>
            <button className='nextButton' onClick={nextQuestion}> Next </button>
            <p>{index + 1} of { Questions.length } questions </p>
          </> 
          
       }
    </div>
  )
}
