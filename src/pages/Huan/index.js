import React from 'react';
import RectangleBigChart from './aa';
import RectangleSmallChart from './bb';
import RectangleVerticalChart from './cc';
import './index.css';

export default function Login() {
    const data = [555, 666, 777, 888, 999, 999]
    return (
        <div className='rightBox'>
            <div className='rightBoxtop'>
                <RectangleBigChart rectangletitle='1' explain='2' qoq='3' yoy='4'></RectangleBigChart>
                <RectangleBigChart rectangletitle='1' explain='2' qoq='3' yoy='4'></RectangleBigChart>
                <RectangleBigChart rectangletitle='1' explain='2' qoq='3' yoy='4'></RectangleBigChart>
                <RectangleBigChart rectangletitle='1' explain='2' qoq='3' yoy='4'></RectangleBigChart>
            </div>
            <div className='rightBoxCenter'>2</div>
            <div className='rightBoxBottom'>3</div>



            <div className="container">
                <div className="row">
                    {/* {console.log(data.filter((item,inde)=>inde%2===1),'11111')} */}

                    {data.filter((item, ind) => ind % 2 === 0).map((ite, ie) => {
                        return <div className="element" key={ite}>元素{ite}</div>
                    })}
                    {/* <div class="element">元素1</div>
                    <div class="element">元素2</div>
                    <div class="element">萨达 </div>
                    <div class="element">萨达 </div> */}
                </div>


                <div className="row">
                    {/* {console.log(data.filter((it,ind)=>ind%2===0),22222)} */}
                    {data.filter((items, inde) => inde % 2 === 1).map((it, i) => {
                        return <div className="element" key={i}>元素{it}</div>
                    })}

                    {/* <div class="element">元素3</div>
                    <div class="element">元素4</div>
                    <div class="element">萨达 </div>
                    <div class="element">萨达 </div> */}
                </div>
            </div>
        </div>
    );
}
