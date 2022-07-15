import React from 'react';
import { Col, Modal, Row } from 'react-bootstrap';

export default function StatisticModal({showStatistic, handleClose, statisticInfo }) {
    
    return (
        <Modal className='modal' show={showStatistic} onHide={handleClose}>
            <Modal.Body>
                <header>
                    통계
                    <button className='close' onClick={handleClose}>x</button>
                </header>
                <Row>
                    <Col className='statistic-ele' lg={3}>
                        <div className='statistic-value'>{statisticInfo.total_challange}</div>
                        <div className='statistic-name'>전체 도전</div>
                    </Col>
                    <Col className='statistic-ele' lg={3}>
                        <div className='statistic-value'>{(statisticInfo.num_of_answer/statisticInfo.total_challange*100).toFixed(1) || 0}%</div>
                        <div className='statistic-name'>정답률</div>
                    </Col>
                    <Col className='statistic-ele' lg={3}>
                        <div className='statistic-value'>{statisticInfo.recent_answer_stream}</div>
                        <div className='statistic-name'>최근 연속 정답률</div>
                    </Col>
                    <Col className='statistic-ele' lg={3}>
                        <div className='statistic-value'>{statisticInfo.maximum_answer_stream}</div>
                        <div className='statistic-name'>최다 연속 정답률</div>
                    </Col>
                </Row>
                <h3>도전 분포</h3>
            </Modal.Body>
        </Modal>
    )
}