import React, { ReactElement } from 'react';
import { ArrowDownOutlined, ArrowUpOutlined, ArrowsAltOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import "./Stats.css";


type Data = [
    string, {
        [key: string] : number
    }
];

export default function Stats ({max, min, avg, curr, base}: {max:Data, min:Data, avg: number, curr: string, base: string}): ReactElement {



  return <div>
            <div className='stats-header'>
                <h3>{curr} against {base}</h3>
            </div>
            <Row gutter={16}>
                <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                    title={`Max on ${max[0]}`}
                    value={max[1][curr]}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
                <Col span={12}>
                <Card bordered={false}>
                    <Statistic
                    title={`Max on ${min[0]}`}
                    value={min[1][curr]}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                    />
                </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                        title="Average over the past year"
                        value={avg}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowsAltOutlined />}
                        suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
        </div>
}

