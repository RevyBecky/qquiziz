import Quiz from "./quiz";
import{ jsQuizz } from "./constants"

function App() {
  return <Quiz questions={jsQuizz.questions} />;
  
}

export default App
