import React from 'react';

const TestFunnel = () => {
    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>漏斗图组件</h2>
            <p>如果你看到这个页面，说明路由正常工作了！</p>
            <div style={{ 
                width: '300px', 
                height: '400px', 
                margin: '0 auto',
                background: '#f0f0f0',
                border: '2px solid #1890ff',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: '#666'
            }}>
                漏斗图图表区域
            </div>
        </div>
    );
};

export default TestFunnel;