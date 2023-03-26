import React, { Fragment, ReactElement } from 'react';
import { Button, Result } from 'antd';
import './Error.css';

export default function Error (): ReactElement {
 return <Fragment>
            <div className='error'>
                    <Result
                        status="500"
                        title="500"
                        subTitle="Sorry, something went wrong."
                        extra={<a href='/'><Button type="primary" >Back Home</Button></a>}
                    />
            </div>
        </Fragment>
};
