import React from 'react';
import AnswerBox from './AnswerBox';

export default function Answer() {
    return (
        <div className='answer'>
            {[0, 1, 2, 3, 4, 5].map(id => <AnswerBox key={id}/> )}
        </div>
    )
}