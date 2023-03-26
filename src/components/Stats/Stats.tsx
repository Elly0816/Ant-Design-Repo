import React, { Fragment, ReactElement } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import "./Stats.css";
import { CSSProperties } from 'react';


type Data = [
    string, {
        [key: string] : number
    }
];

export default function Stats ({max, min, avg, curr, base}: {max:Data, min:Data, avg: number, curr: string, base: string}): ReactElement {

    // className='stats'

    const rowStyle: CSSProperties = {
        width: '100%',
        display: 'flex',
    }

    const colStyle: CSSProperties = {
        width: '100%',
    }

  return <Fragment>
            <div className='stats-header'>
                <h3>{curr} against {base}</h3>
            </div>
            <Row gutter={16} style={rowStyle}>
                <Col span={12} style={colStyle}>
                <Card bordered={false}>
                    <Statistic
                    title={`Max on ${max[0]}`}
                    value={max[1][curr]}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix={` ${curr} was Equal to 1 ${base}`}
                    />
                </Card>
                </Col>
            </Row>
            <Row gutter={16} style={rowStyle}>
                <Col span={12} style={colStyle}>
                <Card bordered={false}>
                    <Statistic
                    title={`Min on ${min[0]}`}
                    value={min[1][curr]}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix={` ${curr} was Equal to 1 ${base}`}
                    />
                </Card>
                </Col>
                {/* style={{justifyContent: 'right'}} */}
            </Row>
            <Row gutter={16} style={rowStyle}>
                <Col span={12} style={colStyle}>
                    <Card bordered={false}>
                        <Statistic
                        title="Average over the past year"
                        value={avg}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowsAltOutlined />}
                        suffix={` ${curr} was Equal to 1 ${base}`}
                        />
                    </Card>
                </Col>
            </Row>
        </Fragment>
}

