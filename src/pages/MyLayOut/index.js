import React, { Fragment, useMemo, useState, useEffect, useContext } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import menus from '@/router/routes';
import './index.less'
import '../../themes/theme.css'
import logoUrl from '@/assets/logo192.png'
import { flatten } from '@/util'
import { ThemeContext, themes } from '@/themes'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import UserInfo from '@/components/UserInfo'

const { Header, Content, Sider } = Layout;

const MyLayOut = () => {
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // 主题状态管理
    const [currentTheme, setCurrentTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme') || 'default';
        return savedTheme;
    });

    const themeConfig = themes[currentTheme];

    // 应用主题到DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
    }, [currentTheme]);

    // 主题切换函数
    const setTheme = (themeName) => {
        setCurrentTheme(themeName);
    };

    /* 根据当前路径反查顶部激活的key */
    const topActiveKey = useMemo(() => {
        const pathSegments = pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0) {
            const firstSegment = pathSegments[0];
            const topMenu = menus.find(m => m.path === firstSegment);
            return topMenu ? topMenu.key : menus[0].key;
        }
        return menus[0].key;
    }, [pathname]);

    /* 左侧菜单展开状态管理 */
    const [openKeys, setOpenKeys] = useState([]);

    /* 选中状态和面包屑 */
    const [selectedKey, breadcrumbItems] = useMemo(() => {
        const flat = flatten(menus);
        const pathSegments = pathname.split('/').filter(Boolean);

        // 默认展开当前顶部菜单的第一个子菜单
        let sideMenuOpenKeys = [];
        const currentTopMenu = menus.find(m => m.key === topActiveKey);
        if (currentTopMenu && currentTopMenu.children && currentTopMenu.children.length > 0) {
            sideMenuOpenKeys = [currentTopMenu.children[0].key];
        }

        // 根据当前路径找到对应的叶子节点
        let target = null;

        if (pathSegments.length >= 3) {
            // 三级路径，找到对应的叶子节点
            const lastSegment = pathSegments[pathSegments.length - 1];
            target = flat.find((f) => f.key === lastSegment);

            // 更新展开的菜单
            if (target && target.parentKeys && target.parentKeys.length > 1) {
                const parentKey = target.parentKeys[target.parentKeys.length - 2]; // 二级菜单key
                sideMenuOpenKeys = [parentKey];
            }
        }

        // 如果没找到，使用默认的第一个叶子节点
        if (!target && currentTopMenu && currentTopMenu.children && currentTopMenu.children[0]) {
            const firstChild = currentTopMenu.children[0];
            if (firstChild.children && firstChild.children[0]) {
                target = firstChild.children[0];
            }
        }

        // 更新展开状态
        setOpenKeys(sideMenuOpenKeys);

        if (!target) return [sideMenuOpenKeys, '', []];

        // 构建面包屑
        const breadcrumbs = target.parentKeys?.map((key, index) => {
            const menuItem = flat.find(f => f.key === key);
            return menuItem ? { title: menuItem.label } : null;
        }).filter(Boolean) || [];

        // 添加当前页面
        if (target.label) {
            breadcrumbs.push({ title: target.label });
        }

        return [target.key, breadcrumbs];
    }, [pathname, topActiveKey]);

    // 当顶部菜单变化时，重置展开状态
    useEffect(() => {
        const currentTopMenu = menus.find(m => m.key === topActiveKey);
        if (currentTopMenu && currentTopMenu.children && currentTopMenu.children.length > 0) {
            setOpenKeys([currentTopMenu.children[0].key]);
        } else {
            setOpenKeys([]);
        }
    }, [topActiveKey]);

    /* 点击菜单直接跳转 */
    const handleMenuClick = (param) => {
        const { keyPath, key } = param

        // 反转keyPath获取正确的层级顺序
        const reversedKeyPath = [...keyPath].reverse();

        // 根据key找到对应的path来构建路由
        const flat = flatten(menus);
        const routeSegments = reversedKeyPath.map(k => {
            const item = flat.find(f => f.key === k);
            return item ? item.path : k;
        });

        const routePath = routeSegments.join('/');
        navigate('/' + routePath);
    };

    //点击顶部导航
    const onClickTopMenu = (e) => {
        const clickedMenu = menus.find(m => m.key === e.key);
        if (clickedMenu && clickedMenu.children) {
            // 导航到该顶级菜单下的第一个子菜单的第一个叶子节点
            const firstChild = clickedMenu.children[0];
            if (firstChild.children && firstChild.children.length > 0) {
                const firstLeaf = firstChild.children[0];
                const targetPath = `/${clickedMenu.path}/${firstChild.path}/${firstLeaf.path}`;
                navigate(targetPath);
            }
        }
    }

    const items2 = useMemo(() => {
        // 获取当前顶部菜单
        const currentTopMenu = menus.find(menuItem => menuItem.key === topActiveKey);

        if (!currentTopMenu || !currentTopMenu.children) {
            return [];
        }

        // 构建左侧菜单（当前顶部菜单的二级菜单）
        return currentTopMenu.children.map((secondLevelItem) => {
            const menuItem = {
                key: secondLevelItem.key,
                icon: secondLevelItem.icon,
                label: secondLevelItem.label,
            };

            // 如果有三级菜单（叶子节点）
            if (secondLevelItem.children && secondLevelItem.children.length > 0) {
                menuItem.children = secondLevelItem.children.map((leafItem) => ({
                    key: leafItem.key,
                    label: leafItem.label,
                }));
            }

            return menuItem;
        });
    }, [topActiveKey]);

    return (
        <ThemeContext.Provider value={{ theme: themeConfig, themeName: currentTheme, setTheme }}>
            <Layout className='my-layout-container'>
                {/* 顶部导航 */}
                <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: themeConfig.headerBg }}>
                    <div className="demo-logo" >
                        <img src={logoUrl} />
                        <h3 style={{ color: themeConfig.text }}>testApp</h3>
                    </div>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        selectedKeys={[topActiveKey]}
                        items={menus.map((m) => ({ key: m.key, icon: m.icon, label: m.label }))}
                        style={{
                            flex: 1,
                            minWidth: 0,
                            backgroundColor: 'transparent',
                            borderBottom: 'none',
                        }}
                        onClick={onClickTopMenu}
                    />
                    <div className='theme-user' >
                        <ThemeSwitcher />
                        <UserInfo />
                    </div>
                </Header>
                <Layout>
                    {/* 左侧导航 */}
                    <Sider width={200} style={{ backgroundColor: themeConfig.siderBg }}>
                        <Menu
                            mode="inline"
                            selectedKeys={[selectedKey]}
                            openKeys={openKeys}
                            style={{
                                height: '100%',
                                borderInlineEnd: 0,
                                backgroundColor: themeConfig.siderBg,
                            }}
                            onClick={handleMenuClick}
                            items={items2}
                        />
                    </Sider>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        {/* 右侧顶部面包屑 */}
                        <Breadcrumb
                            items={breadcrumbItems.length > 0 ? breadcrumbItems : [{ title: 'Home' }]}
                            style={{ margin: '16px 0' }}
                        />
                        {/* 右侧内容展示区 */}
                        <Content
                            className='main-content'
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                                background: themeConfig.contentBg,
                                borderRadius: borderRadiusLG,
                            }}
                        >
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        </ThemeContext.Provider>
    )
};
export default MyLayOut;