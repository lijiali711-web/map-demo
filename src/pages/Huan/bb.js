import React from 'react';
import './bb.css';
export default function RectangleSmallChart({ rectangletitle, explain, qoq, yoy }) {

    //参数说明：rectangletitle：矩形图标题，explain：矩形图数据，qoq：环比，yoy：同比

    return (
        <div className='rectangleSmallBox'>
            <h3>{rectangletitle}</h3>
            <div className='rectangleSmallExplain'>
                <p>{explain}</p>
            </div>
            <div className='rectangleSmallQandY'>
                <p>环比{qoq}</p>
                <p>同比{yoy}</p>
            </div>
        </div>
    );
}