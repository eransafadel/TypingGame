import React from 'react';

const Button  = (props)=> 
{
    const{
        handleStart,
        disabled,
    } = props;

    console.log("----------Button")
    console.log(disabled)
    
return( <button onClick = {handleStart}> { disabled ? "Start": "Restart" } </button> );
}
export default Button;