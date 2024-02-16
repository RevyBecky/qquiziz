import { useState,useEffect } from "react";
import { resultInitialState } from './constants';


const Quiz = ({questions}) => {
    const [currentQuestion, setCurrentQuestion ] = useState(0);
    const [answerIdx, setAnswerIdx ] = useState(null);
    const [answer, setAnswer ] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);




    const {question, choices, correctAnswer } = questions[currentQuestion];

    const[name, setName] = useState('');
    const[highScores, setHighScores] = useState([]);
    const[showScores, setshowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem("highScores")) || []);
    })
    
    const handleSave = () =>{
        const score = {
            name,
            score: result.score
        };

        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score );
        setHighScores(newHighScores);
        setshowScores(true);
        localStorage.setItem("highScores", JSON.stringify(newHighScores))
    }

    const handleTryAgain = () =>{
        setshowScores(false);
        setHighScores([]);
        onTryAgain();
    }
    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if(answer === correctAnswer){
            setAnswer(true);
        }else{
            setAnswer(false);
        }
    }

    const onClickNext = () =>{
        setAnswerIdx(null);
        setResult((prev) => 
            answer
            ?{
                ...prev,
                score: prev.score + 5 ,
                correctAnswers:  prev.correctAnswers + 1,
            }
           :{
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        );

        if (currentQuestion !== questions.length - 1){
            setCurrentQuestion((prev) =>prev + 1);
        }else{
            setCurrentQuestion(0);
            setShowResult(true);
        }
        
    };
  
 const onTryAgain = () => {
    setResult(resultInitialState);
    setShowResult(false);
 }
    return (
        <div className="quiz-container">
            {!showResult ? ( <>
                <span className="active-question-no"> {currentQuestion + 1}</span>
                {/* ctoby 1 vopros byl 1 a ne */}
                <span className="total-question">/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {

                        choices.map((answer, index) => (
                            <li
                                onClick={() => onAnswerClick(answer,index) }
                                key={answer}
                                className={answerIdx === index ? 'selected-answer' : null}
                                >
                                    {answer}
                            </li>
                        ))

                    }
                </ul>
             <div className="footer">
                 <button onClick={onClickNext} disabled={answerIdx === null}>
                     {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                 </button>
             </div>
          </> ) : ( <div className="result">
            <h3>Result</h3>
            <p>
                Total Questions: <span>{questions.length}</span>
            </p>
            <p>
                Total Score: <span>{result.score}</span>
            </p>
            <p>
                CorrectAnswers: <span>{result.correctAnswers}</span>
            </p>
            <p>
                WrongAnswers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={handleTryAgain} >Try again</button>
           { !showScores ?( <>
           
           <h3>
           Enter  your nickname to save your score!
           </h3>
           <input
           placeholder="Your name"
           value={name}
           onChange={(evt) => setName(evt.target.value)} /> 
           <br></br>
           <button onClick={handleSave} >Save score!</button>
           </> 
          ):(
            <>
           <table>
            <thead>
                <tr>
                    <th>Ranking</th>
                    <th>Name</th>
                    <th>Score</th>

                </tr>
                </thead>
                <tbody>
                    {highScores.map((highScore, i) => {
                        
                        return (
                            <tr key={`${highScore.score}${highScore.name}${i}`}>
                                <td>{i + 1}</td>
                                <td> {highScore.name} </td>
                                <td> {highScore.score} </td>
        
                            </tr>
                        )
                    })
                }
                </tbody>
           </table>
            </>
            )}
           </div>
           )}
      

          
           
        </div>
    );

};

export default Quiz;