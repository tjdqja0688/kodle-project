import React from 'react';
import AnswerBox from './AnswerBox';

export default function Answer({ letters, hint, checked, contrast }) {
    const enoughLetter = letters[5]?true:false
    return (
        <div className='answer'>
            {[0, 1, 2, 3, 4, 5].map(id => <AnswerBox key={id} letter={letters[id]} enoughLetter={enoughLetter} hint={hint[id]} checked={checked} contrast={contrast} /> )}
        </div>
    )
}