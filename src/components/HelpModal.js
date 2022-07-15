import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Answer from './Answer';

export default function HelpModal({showHelp, handleClose}) {
    return (
        <Modal className='modal' show={showHelp} onHide={handleClose}>
            <Modal.Body>
                <header>
                    어떻게 할까?
                    <button className='close' onClick={handleClose}>x</button>
                </header>
                <p>여섯 개의 자모로 풀어쓴 한글 단어 "꼬들"을 여섯 번의 도전 안에 맞춰봅시다. 한글 단어를 풀어쓴 후 <span>입력</span>을 누르면 칸 색깔이 변합니다!</p>
                <Answer letters={['ㅍ','ㅗ','ㅎ','ㅗ','ㅣ','ㄱ']} hint={[2, 0, 0, 0, 0, 0]} checked={true} contrast={0} />
                <p>자음 'ㅍ'은 올바른 자리에 있습니다.</p>
                <Answer letters={['ㅅ', 'ㅅ', 'ㅏ', 'ㅇ', 'ㅜ', 'ㅁ']} hint={[0, 0, 1, 0, 0, 0]} checked={true} contrast={0} />
                <p> 모음 'ㅏ'은 잘못된 자리에 있습니다.</p>
                <Answer letters={['ㄱ', 'ㅣ', 'ㅅ', 'ㅡ', 'ㄹ', 'ㄱ']} hint={[2, 2, 2, 0, 2, 2]} checked={true} contrast={0} />
                <p>모음 'ㅡ'은 어느 곳에도 맞지 않습니다.</p>
            </Modal.Body>
        </Modal>
    )
}