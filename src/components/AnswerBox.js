import React from 'react';

export default function Answerbox({ letter, enoughLetter, hint, checked, contrast }) {
    const bcStyle = [['gray', 'gray'], ['orange', 'coral'], ['green', 'skyBlue']];
    const hintAnswer = {
        'color': 'white',
        'backgroundColor': bcStyle[hint][contrast],
    }
    const filledAnswer = {
        'borderColor': 'black',
        'color': 'red'
    }
    const filledLetter = {
        'borderColor': 'black',
        'color': 'black'
    };
    const empty = {
        'borderColor': 'lightgrey',
    };
    const style = checked?hintAnswer:enoughLetter?filledAnswer:letter?filledLetter:empty;

    return (
        <div className='answer-box' style={style}>
            {letter}
        </div>
    )
}