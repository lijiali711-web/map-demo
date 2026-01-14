import React from 'react';
import './aa.css';
export default function RectangleBigChart({ rectangletitle, explain, qoq, yoy }) {

    //参数说明：rectangletitle：矩形图标题，explain：矩形图数据，qoq：环比，yoy：同比

    return (
        <div className='rectangleBigBox'>
            <h3>{rectangletitle}</h3>
            <div className='rectangleBigData'>
                <div className='rectangleBigExplain'>
                    <p>{explain}</p>
                </div>
                <div className='rectangleBigQandY'>
                    <p>环比{qoq}</p>
                    <p>同比{yoy}</p>
                </div>
            </div>
        </div>
    );
}