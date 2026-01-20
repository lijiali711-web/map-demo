import { lazy } from 'react';
import { Navigate } from 'react-router';
import MyLayout from '@/pages/MyLayOut'
import menus from './routes'

// 暂时简化，不用路由守卫进行调试

// 公共路由组件（无需登录）
const PublicRoute = ({ children, requireAuth = false }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    // 如果需要登录但未登录，跳转到登录页
    if (requireAuth && !isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // 如果已登录且在登录页，根据角色跳转
    if (isLoggedIn && window.location.pathname === '/login') {
        if (userInfo.role === 'guest') {
            return <Navigate to="/home" replace />;
        } else {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return children;
};



/* --- 懒加载示例 --- */
const NotFound = lazy(() => import('@/pages/NotFound'));
const Login = lazy(() => import('@/pages/Login'));
const GuestHome = lazy(() => import('@/pages/GuestHome'));

const Funnel = lazy(() => import('@/components/Funnel'));
const Huan = lazy(() => import('@/pages/Huan'));
const LineBar = lazy(() => import('@/pages/Chart'));
const BaiDu = lazy(() => import('@/components/Map'));
const Game = lazy(() => import('@/pages/game/index'));
const Scatter = lazy(() => import('@/components/Scatter/index'));
const Pie = lazy(() => import('@/components/PieCom/index'));
const OtherPage = lazy(() => import('@/pages/OtherPage'));


/* 叶子节点 => 组件 映射 */
const leaf2Comp = {
    funnel: Funnel,
    huan: Huan,
    'line-bar': LineBar,
    'pie': Pie,
    scatter: Scatter,
    baidu: BaiDu,
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
                // console.log(`添加路由: ${routePath} -> ${item.key}`);
            } else {
                // console.log(`未找到组件: ${item.key} (${fullPath})`);
            }
        }
        return acc;
    }, []);
}
const generatedRoutes = buildRoutes(menus);



const routes = [
    // 登录页面
    {
        path: '/login',
        element: <Login />,
    },

    // 游客首页
    {
        path: '/home',
        element: <GuestHome />,
    },

    // 管理员登录后重定向
    {
        path: '/dashboard',
        element: <Navigate to="/echarts/index/funnel" replace />,
    },

    // 管理员应用 - 父套路由结构
    {
        path: '/',
        element: <MyLayout />,
        children: [
            // Echarts相关路由
            {
                path: 'echarts/index',
                children: [
                    { path: 'funnel', element: <Funnel /> },
                    { path: 'huan', element: <Huan /> },
                    { path: 'line-bar', element: <LineBar /> },
                    { path: 'other', element: <OtherPage /> },
                ]
            },
            // 地图相关路由
            {
                path: 'map/index',
                children: [
                    { path: 'baidu', element: <BaiDu /> },
                ]
            },
            // 其他功能路由
            {
                path: 'other/play',
                children: [
                    { path: 'tic-tac-toe', element: <Game /> },
                ]
            },
            // 默认重定向
            { path: '', element: <Navigate to="/echarts/index/funnel" replace /> },
            { path: '*', element: <NotFound /> },
        ]
    },

    // 根路径重定向
    {
        path: '/',
        element: <Navigate to="/login" replace />,
    },

    // 404页面
    {
        path: '*',
        element: <NotFound />,
    },
];





export default routes
