import React from 'react';
import Button from './Button'

const Typeracer = (props)=> {

    const {  
    newWord,
    inputValue,
    setInputValue,
    disabled,
    time,
    animation, 
    handleInput,
    handleStart, 
    confettiStart,
} = props;

    return(
        <div className= "typeRacer">

            <div className = "wordOutput">
                <p>{newWord}</p>
            </div>

            <div className ="time" style={{animation: animation !== null ? animation: "" }} style={{confettiStart: confettiStart? null: ""}}>
                <p> {time} </p>
            </div>

            <div className ="wordValues">
                <input
                 type="text"
                 value = {inputValue}
                 onKeyPress = {(e)=>handleInput(e)}
                 onChange ={ (e) => setInputValue(e.target.value)}
                 disabled = {disabled &&disabled }
                 placeholder = {disabled? "": "Start typing..."}

                 />
                <Button handleStart = {handleStart} disabled = {disabled}/>
            </div>

        </div>

    );

};

export default Typeracer;