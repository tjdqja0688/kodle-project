import React from 'react';

export default function Keypad({onClick}) {
    const firstRow = ['ㅂ', 'ㅈ', 'ㄷ', 'ㄱ', 'ㅅ', 'ㅛ', 'ㅕ', 'ㅑ', 'ㅐ', 'ㅔ'];
    const secondRow = ['ㅁ', 'ㄴ', 'ㅇ', 'ㄹ', 'ㅎ', 'ㅗ', 'ㅓ', 'ㅏ', 'ㅣ'];
    const thirdRow = ['입력', 'ㅋ', 'ㅌ', 'ㅊ', 'ㅍ', 'ㅠ', 'ㅜ', 'ㅡ', '삭제'];
    
    return (
        <div className='keypad'>
            <div className='row'>
                { firstRow.map((letter, idx)=> <button className='key' key={idx}>{letter}</button>) }
            </div>
            <div className='row'>
                { secondRow.map((letter, idx)=> <button className='key' key={idx}>{letter}</button>) }
            </div>
            <div className='row'>
                { thirdRow.map((letter, idx)=> <button className='key' key={idx}>{letter}</button>) }
            </div>
        </div>
    )
}