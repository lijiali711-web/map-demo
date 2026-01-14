import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Navigate } from 'react-router';
const routeMenus = [
    {
        label: 'Echarts图表',
        key: 'echarts',
        path: 'echarts',
        icon: <UserOutlined />,
        children: [
            {
                label: 'Echart导航栏目',
                key: 'echarts-index',
                path: 'index',
                children: [
                    { label: '漏斗图', key: 'funnel', path: 'funnel' },
                    { label: '折线柱状图', key: 'line-bar', path: 'line-bar' },
                    { label: '饼环图', key: 'pie', path: 'pie' },
                    { label: '散点图', key: 'scatter', path: 'scatter' },
                    { label: '布局', key: 'huan', path: 'huan' },
                    { label: '其他', key: 'other', path: 'other' },
                ],
            },
        ],
    },
    {
        label: 'Map地图',
        key: 'map',
        path: 'map',
        icon: <LaptopOutlined />,
        children: [
            {
                label: '地图导航',
                key: 'map-index',
                path: 'index',
                children: [
                    {
                        label: '百度地图',
                        key: 'baidu',
                        path: 'baidu',
                    },
                ],
            },
        ],
    },
    {
        label: '其他',
        key: 'other',
        path: 'other',
        icon: <NotificationOutlined />,
        children: [
            {
                label: '趣味游戏',
                key: 'play',
                path: 'play',
                children: [
                    { label: '井字棋游戏', key: 'tic-tac-toe', path: 'tic-tac-toe' },
                ],
            },
        ],
    },

];
export default routeMenus