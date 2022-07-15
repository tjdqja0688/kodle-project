import { ImLab } from 'react-icons/im';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import { HiOutlineChartBar } from 'react-icons/hi';

import Answer from './components/Answer';
import Keypad from './components/Keypad';

import './App.css';
import { useState } from 'react';
import HelpModal from './components/HelpModal';

import 'bootstrap/dist/css/bootstrap.min.css';

import Inko from 'inko';
import { Alert } from 'react-bootstrap';
import StatisticModal from './components/StatisticModal';
import SettingModal from './components/SettingModal';

const NOTHING = 0;
const NOTPOSITION = 1;
const CORRECT = 2;

function App() {
  const inko = new Inko();
  const [game, setGame] = useState({
      answer: ['ㅂ', 'ㅏ', 'ㅇ', 'ㅣ', 'ㅇ', 'ㅗ'],
      letterList: [
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', ''],
          ['', '', '', '', '', '']
      ],
      hintList: [
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0]
      ],
      checked: [false, false, false, false, false, false],
      answerBoxIndex: 0,
      answerIndex: 0
  });
  const [modals, setModals] = useState({
      showLab: false,
      showHelp: false,
      showStatistic: false,
      showSetting: false,
  });
  const [settings, setSettings] = useState({
      difficulty: false,
      contrast: false,
      link: true,
      answerStream: true,
      picture: false,
  });
  const [alerts, setAlerts] = useState({
      difficultyTrouble: {
          show: false,
      },
      
      difficultyCondition: {
          show: false,
      },

      answer: {
          show: false
      },

      letter: {
          show: false
      },
  });
  const [statisticInfo, setStatisticInfo] = useState({
      recent_answer_stream: 0,
      total_challange: 0,
      maximum_answer_stream: 0,
      num_of_answer: 0,
  });

  function checkAnswer(answer, myAnswer) {
      let hints = ['', '', '', '', '', '']
      let isCorrect = true;

      for (let i = 0; i < answer.length; i++) {
          if (answer[i] === myAnswer[i]) {
              hints[i] = CORRECT;
          } else {
              hints[i] = NOTHING;
              isCorrect = false;
          }
      }

      for (let i=0; i < answer.length; i++) {
          if (hints[i] !== CORRECT) {
              for (let j=0; j < myAnswer.length; j++) {
                  if (answer[i] === myAnswer[j] && hints[j] === NOTHING) {
                      hints[j] = NOTPOSITION;
                      break;
                  }
              }
          }
      }

      return [hints, isCorrect];
  }

  const validateDifficultyCondition = () => {
      for (let i = 0; i < game.letterList[game.answerIndex].length; i++) {
          if (game.hintList[game.answerIndex - 1][i] === CORRECT && game.letterList[game.answerIndex - 1][i] !== game.letterList[game.answerIndex][i]) {
              setAlerts((prev) => ({
                  ...prev,
                  difficultyTrouble: {
                      show: true,
                      index: i,
                      letter: game.letterList[game.answerIndex-1][i],
                  }
              }));
              return true;
          }
      }
      return false;
  }

  const updateAndShowUserStatisticInfo = (data) => {
    setStatisticInfo(data);
    setModals((prev) => ({
        ...prev,
        showStatistic: true
    }))
  }

  const onKeyDown = (e) => {
      if (e.keyCode >= 65 && e.keyCode <= 90 && game.answerBoxIndex < 6) {
          handleKey(e.key);
      }
      else if (e.keyCode === 13) {
          handleEnter();
      }
      else if (e.keyCode === 8) {
          handleBackspace();
      }
  }

  const handleKeypad = (e) => {
    console.log(e.target);
      if (e.target.name === 'enter') {
          handleEnter();
      }
      else if (e.target.name === 'backspace') {
          handleBackspace();
      }
      else {
          handleKey(e.target.innerHTML);
      }
  };

  const handleKey = (letter) => {
      let newLetterList = game.letterList;
      newLetterList[game.answerIndex][game.answerBoxIndex] = inko.en2ko(letter);

      setGame((prev) => ({
          ...prev,
          answerBoxIndex: game.answerBoxIndex + 1,
          letterList: newLetterList,
      }));
  }

  const handleEnter = () => {
      let index = game.answerBoxIndex;
      let aIndex = game.answerIndex;
      let inTrouble = false;
      
      // if 6 letters are filled
      if (index === 6) {
          // if difficult mode is on before starting game, validate that the condition of difficult mode is satisfied
          if (settings.difficulty && aIndex > 0) {
              inTrouble = validateDifficultyCondition();
          }
          // if the condition of difficult mode is not in trouble, check user answer
          if (!inTrouble) {
              let myAnswer = game.letterList[aIndex];
              let answerIndex = game.answerIndex;
              let answerBoxIndex = game.answerBoxIndex;
              let tempChecked = game.checked;
              let tempHint = game.hintList;
              let result = checkAnswer(game.answer, myAnswer);

              tempHint[answerIndex] = result[0];
              let isCorrect = result[1];
              tempChecked[answerIndex] = true;

              // if user's answer is correct
              if (isCorrect) {
                  const data = {
                      recent_answer_stream: statisticInfo.recent_answer_stream + 1,
                      num_of_answer: statisticInfo.num_of_answer + 1,
                      total_challange: statisticInfo.total_challange + 1,
                  }
                  if ( statisticInfo.maximum_answer_stream < statisticInfo.recent_answer_stream + 1) {
                      data['maximum_answer_stream'] = statisticInfo.recent_answer_stream + 1;
                  }
                  else {
                      data['maximum_answer_stream'] = statisticInfo.maximum_answer_stream;
                  }
                  updateAndShowUserStatisticInfo(data);

                  answerIndex = 6;
                  answerBoxIndex = 6;
              } 
              // if user's answer is wrong,
              else {
                  // if 6 chances are used.
                  if (answerIndex === 5) {
                      const data = {
                          recent_answer_stream: 0,
                          total_challange: statisticInfo.total_challange + 1,
                      };
                      updateAndShowUserStatisticInfo(data);
                      setAlerts((prev) => ({
                          ...prev,
                          answer: {
                              show: true,
                          }
                      }));

                      answerIndex = 6;
                      answerBoxIndex = 6;
                  }
                  else {
                      answerIndex += 1;
                      answerBoxIndex = 0;
                  }
              }
              setGame((prev) => ({
                  ...prev,
                  checked: tempChecked,
                  hintList: tempHint,
                  answerIndex: answerIndex,
                  answerBoxIndex: answerBoxIndex,
              }));
          }
      } else {
          setAlerts((prev) => ({
              ...prev,
              letter: {
                  show: true,
              },
          }));
      }
  }

  const handleBackspace = () => {
      let newLetterList = game.letterList;

      if (game.answerBoxIndex > 0) {
          newLetterList[game.answerIndex][game.answerBoxIndex-1] = '';
          setGame((prev) => ({
              ...prev,
              answerBoxIndex: prev.answerBoxIndex - 1,
              letterList: newLetterList,
          }))
      }
  }

  const handleShowHelp = () => { setModals((prev) => ({ ...prev, showHelp: true})) };

  const handleShowStatistic = () => { setModals((prev) => ({ ...prev, showStatistic: true})) };

  const handleShowSetting = () => { setModals((prev) => ({ ...prev, showSetting: true})) };

  const closeModal = () => { 
      setModals({
          showLab: false,
          showHelp: false,
          showSetting: false,
          showStatistic: false,
      });
  };

  const handleSettings = (e) => {
      if (e.target.name === 'difficulty') {
          if (game.answerIndex !== 0) {
              e.target.checked = false;
              setAlerts((prev) => ({
                  ...prev,
                  difficultyCondition: {
                      show: true
                  }
              }));
          }
      }
      setSettings((prev) => ({
          ...prev,
          [e.target.name]: e.target.checked
      }));
  };

  const closeAlert = (e) => {
      setAlerts({
          difficultyTrouble: {
              show: false,
          },
          
          difficultyCondition: {
              show: false,
          },
  
          answer: {
              show: false
          },
  
          letter: {
              show: false
          },
      });
  };

  return (
      <>
          <Alert show={alerts.letter.show} variant='danger' onClose={closeAlert} dismissible>
              낱말이 부족합니다.
          </Alert>
          <Alert show={alerts.answer.show} variant='danger' onClose={closeAlert} dismissible>
              정답은 {game.answer} 입니다.
          </Alert>
          <Alert show={alerts.difficultyTrouble.show} variant='danger' onClose={closeAlert} dismissible>
              '{alerts.difficultyTrouble.letter}' 자모는 {alerts.difficultyTrouble.index + 1}번째에 꼭 쓰여야 합니다.
          </Alert>
          <Alert show={alerts.difficultyCondition.show} variant='danger' onClose={closeAlert} dismissible>
              어렵게 풀기는 시작 전에만 설정할 수 있습니다.
          </Alert>
          <section className='kodle-section' tabIndex='0' onKeyDown={onKeyDown}>
              <header>
                  <div className='title'><h4>꼬들 - 한국어</h4></div>
                  <div className='options'>
                      <button><ImLab /></button>
                      <button onClick={handleShowSetting}><FiSettings /></button>
                      <button onClick={handleShowHelp}><FiHelpCircle /></button>
                      <button onClick={handleShowStatistic}><HiOutlineChartBar /></button>
                  </div>
              </header>
              {[0, 1, 2, 3, 4, 5].map(id => <Answer key={id} letters={game.letterList[id]} hint={game.hintList[id]} checked={game.checked[id]} contrast={settings.contrast?1:0} />)}
              <Keypad onClick={handleKeypad}/>
          </section>
          <HelpModal showHelp={modals.showHelp} handleClose={closeModal} />
          <StatisticModal showStatistic={modals.showStatistic} handleClose={closeModal} statisticInfo={statisticInfo} />
          <SettingModal showSetting={modals.showSetting} handleClose={closeModal} onClick={handleSettings} settings={settings} />
      </>
  );
}

export default App;
