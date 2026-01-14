import { lazy } from 'react';
import { Navigate } from 'react-router';
import MyLayout from '@/pages/MyLayOut'
import menus from './routes'



/* --- 懒加载示例 --- */
const NotFound = lazy(() => import('@/pages/NotFound'));

const Funnel = lazy(() => import('@/components/Funnel'));
const Huan = lazy(() => import('@/pages/Huan'));
const LineBar = lazy(() => import('@/pages/Chart'));
const Gaode = lazy(() => import('@/components/Map'));
const Game = lazy(() => import('@/pages/game/index'));
const Pie = lazy(() => import('@/components/PieCom/index'));
const OtherPage = lazy(() => import('@/pages/OtherPage'));


/* 叶子节点 => 组件 映射 */
const leaf2Comp = {
    funnel: Funnel,
    huan: Huan,
    'line-bar': LineBar,
    'pie': Pie,
    gaode: Gaode,
    'tic-tac-toe': Game,
    other: OtherPage, // 临时使用LineBar替代
};

/* 递归把 menus 转成路由配置 */
function buildRoutes(menuList, parentPath = '') {
    return menuList.reduce((acc, item) => {
        const fullPath = parentPath + '/' + item.path;
        if (item.children?.length) {
            acc.push(...buildRoutes(item.children, fullPath));
        } else {
            const Comp = leaf2Comp[item.key]; // 使用key而不是path来匹配组件
            if (Comp) {
                const routePath = fullPath.substring(1); // 去掉开头的/
                acc.push({ path: routePath, element: <Comp /> });
                console.log(`添加路由: ${routePath} -> ${item.key}`);
            } else {
                console.log(`未找到组件: ${item.key} (${fullPath})`);
            }
        }
        return acc;
    }, []);
}
const generatedRoutes = buildRoutes(menus);
console.log('生成的路由:', generatedRoutes);
console.log('漏斗图路由应该是: echarts/index/funnel');
console.log('环图路由应该是: echarts/index/huan');
console.log('折线柱状图路由应该是: echarts/index/line-bar');



const routes = [
    {
        path: '/',
        element: <MyLayout />,
        children: [
            ...buildRoutes(menus),   // 自动生成的子路由
            { path: '', element: <Navigate to="/echarts/index/funnel" replace /> }, // 默认跳转
            { path: '*', element: <NotFound /> },
        ],
    },
    // { path: '/', element: <Navigate to="/echarts/index/funnel" replace /> }, // 默认跳转
];





export default routes
