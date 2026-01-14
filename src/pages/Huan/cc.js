import React from 'react';
import './cc.css';
export default function RectangleVerticalChart({ rectangletitle, explain, rectangleimg, qoq, yoy }) {

    //参数说明：rectangletitle：矩形图标题，explain：矩形图数据，rectangleimg: 矩形图图片,qoq：环比，yoy：同比

    return (
        <div className='rectangleVerticaBox'>
            <h3>{rectangletitle}</h3>
            <div className='rectangleVerticaExplain'>
                <p>{explain}</p>
                <p>{rectangleimg}</p>
            </div>
            <div className='rectangleVerticaQandY'>
                <p>环比{qoq}</p>
                <p>同比{yoy}</p>
            </div>
        </div>
    );
}