import './App.css';
import React, {useState, useEffect, useWindowSize} from 'react';
import Words from './Components/Words'
import Container from './Components/Container';
import Typeracer from './Components/Typeracer';
import Results from './Components/Results';
import useSound from 'use-sound';
import wrongAnswer from './Sounds/wrongSound.mp3';
import dingSound from './Sounds/DingSound.mp3';
import background from './Sounds/background.mp3';
import Confetti from 'react-confetti'
import Popup from 'react-popup'; 

function App() {
  const TIME_GAME = 60;
  const [words, setWord] = useState(Words); //initial 
  const [newWord, setNewWord] = useState(words[0]);
  const [disabled, setDisabled] = useState(true); //for inputValue
  const [correctResults, setCorrectResults] = useState([]);
  const [wrongResults, setWrongResults] = useState([]);
  const [countCurrect, setCountCurrect] = useState(0);
  const [time, setTime] = useState(TIME_GAME);
  const [inputValue, setInputValue] = useState("");
  const [animation, setAnimation] = useState(null);
  const [confettiStart, setConfettiStart] = useState(false);
  
  const [play1, { stop }] = useSound(
    wrongAnswer,
    { volume: 0.5 }
  );
  const [play2] = useSound(
    dingSound,
    { volume: 0.5 }
  );
  const [play3] = useSound(
    background,
    { volume: 0.2 }
  );

  let randomWord= Math.floor(Math.random() * words.length);

  const checkAnswer = ()=>{
    const myInput = inputValue.trim()
    if(myInput===newWord)
    {
      play2();
    setCorrectResults((prevCorrect)=>[...prevCorrect,newWord])
    setCountCurrect((prevCount)=>prevCount+1)
    return;
    }
    play1();
    setWrongResults((prevWrong)=> [...prevWrong , myInput])
  }

  const handleInput = e=>{
   if( e.charCode === 13 && inputValue !== '')
   {
    checkAnswer()
    setNewWord(words[randomWord])
    setInputValue('')
   }
  }

  const handleStart = ()=>{
    play3()
    setDisabled(!disabled)
    setCountCurrect(0)
    setCorrectResults([])
    setWrongResults([])
    setInputValue('')
  }

  useEffect(()=>{
    if(time <= TIME_GAME && time != 0 && disabled === false)
    {
      setTimeout(() => setTime(prevTime => prevTime-1), 1000 )
    }
    else if( disabled)
    {
      setTime(TIME_GAME)
      setAnimation(null)
    }
    else if(time === 0)
    {
      setConfettiStart(true)
      setDisabled(true)
    }
   

    if(time <= 10)
      setAnimation("scaleNumber 2s infinite");
  }, [disabled, time]);

  useEffect(()=>{
    setNewWord(words[randomWord])
  }, []);

  return (
    <div className="App">
      <div>
       { confettiStart ? 
       <div> 
       <div className='popup'>
        <div className='popup_inner'>
          <h1 className= "textPop"> Correct Answers: {countCurrect} </h1>
        </div>
      </div>
 
       <Confetti/>
        </div>
        : null }
       </div>  

      <Container>
        <Typeracer  
          newWord = {newWord}
          inputValue = {inputValue}
          setInputValue = {setInputValue} 
          disabled = {disabled && disabled} 
          time={time}
          animation = {animation}
          handleInput ={handleInput}
          handleStart = {handleStart}
          confettiStart = {confettiStart}
          /> 
      </Container>    

      <Results
          correctResults ={correctResults}
          wrongResults={wrongResults}
          countCurrect = {countCurrect}
      /> 
     

    </div>
  );
}

export default App;
