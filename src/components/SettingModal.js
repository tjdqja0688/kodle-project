import React from 'react';
import { Form, Modal } from 'react-bootstrap';

export default function SettingModal({ showSetting, handleClose, onClick, settings}) {
    return (
        <Modal className='modal' show={showSetting} onHide={handleClose}>
            <Modal.Body>
                <header>
                    설정
                    <button className='close' onClick={handleClose}>x</button>
                </header>
                <Form>
                    <Form.Check type='switch' reverse>
                        <Form.Check.Label>
                            <div className='form-check- main-label'>어렵게 풀기</div>
                            <div className='form-check-sub-label'>파악된 자모는 무조건 사용되어야 합니다.</div>
                        </Form.Check.Label>
                        <Form.Check.Input name='difficulty' defaultChecked={settings.difficulty} onClick={onClick} />
                    </Form.Check>
                    <Form.Check type='switch' reverse>
                        <Form.Check.Label>
                            <div className='form-check- main-label'>고대비 형태</div>
                            <div className='form-check-sub-label'>칸의 색깔들을 더 구별하기 쉽게 바꿉니다.</div>
                        </Form.Check.Label>
                        <Form.Check.Input name='contrast' defaultChecked={settings.contrast} onClick={onClick} />
                    </Form.Check>
                    <Form.Check type='switch' reverse>
                        <Form.Check.Label>
                            <div className='form-check- main-label'>링크 표기</div>
                            <div className='form-check-sub-label'>Kordle.kr를 결과에 표기합니다.</div>
                        </Form.Check.Label>
                        <Form.Check.Input name='link' defaultChecked={settings.link} onClick={onClick} />
                    </Form.Check>
                    <Form.Check type='switch' reverse>
                        <Form.Check.Label>
                            <div className='form-check- main-label'>연속 정답 표기</div>
                            <div className='form-check-sub-label'>최근 연속 정답 횟수를 결과에 표기합니다.</div>
                        </Form.Check.Label>
                        <Form.Check.Input name='answerStream' defaultChecked={settings.answerStream} onClick={onClick} />
                    </Form.Check>
                    <Form.Check type='switch' reverse style={{ borderBottom: '0'}}>
                        <Form.Check.Label>
                            <div className='form-check- main-label'>사진 찍기</div>
                            <div className='form-check-sub-label'>글자를 투명하게 만듭니다.</div>
                        </Form.Check.Label>
                        <Form.Check.Input name='picture' defaultChecked={settings.picture} onClick={onClick}/>
                    </Form.Check>
                </Form>
            </Modal.Body>
        </Modal>
    )
}