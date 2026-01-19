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
        console.log('计算topActiveKey - 当前路径:', pathname, '路径段:', pathSegments);

        if (pathSegments.length > 0) {
            const firstSegment = pathSegments[0];
            const topMenu = menus.find(m => m.path === firstSegment);
            console.log('第一段路径:', firstSegment, '找到的顶部菜单:', topMenu);
            return topMenu ? topMenu.key : menus[0].key;
        }
        console.log('使用默认顶部菜单:', menus[0].key);
        return menus[0].key;
    }, [pathname]);

    /* 防止刷新后 openKeys 丢失 和构建面包屑 */
    const [openKeys, selectedKey, breadcrumbItems] = useMemo(() => {
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

        console.log('目标叶子节点:', target, '展开的二级菜单:', sideMenuOpenKeys);

        if (!target) return [sideMenuOpenKeys, '', []];

        // 构建面包屑
        const breadcrumbs = target.parentKeys?.map((key, index) => {
            const menuItem = flat.find(f => f.key === key);
            return menuItem ? { title: menuItem.label } : null;
        }).filter(Boolean) || [];

        // 检查当前叶子节点是否已经在parentKeys中
        const lastParentKey = target.parentKeys?.[target.parentKeys.length - 1];
        if (target.label && lastParentKey !== target.key) {
            // 如果当前叶子节点不在parentKeys中，才添加
            breadcrumbs.push({ title: target.label });
        }

        return [sideMenuOpenKeys, target.key, breadcrumbs];
    }, [pathname, topActiveKey]);

    /* 点击菜单直接跳转 */
    const handleMenuClick = (param) => {
        const { keyPath, key } = param
        console.log(param, 'param-----111111');

        // 反转keyPath获取正确的层级顺序
        const reversedKeyPath = [...keyPath].reverse();
        console.log('反转后的keyPath:', reversedKeyPath);

        // 根据key找到对应的path来构建路由
        const flat = flatten(menus);

        // 特殊处理：需要找到完整的菜单层级来构建路径
        let targetItem = flat.find(f => f.key === key);
        console.log('目标菜单项:', targetItem);

        if (targetItem && targetItem.parentKeys) {
            // 构建完整路径：从顶级菜单到当前叶子节点
            const pathSegments = [];

            // 添加所有父级菜单的path（排除当前叶子节点）
            const parentKeysWithoutCurrent = targetItem.parentKeys.filter(k => k !== key);
            parentKeysWithoutCurrent.forEach(parentKey => {
                const parentItem = flat.find(f => f.key === parentKey);
                if (parentItem && parentItem.path) {
                    pathSegments.push(parentItem.path);
                }
            });

            // 添加当前叶子节点的path
            if (targetItem.path) {
                pathSegments.push(targetItem.path);
            }

            const finalRoutePath = pathSegments.join('/');
            console.log('构建的完整路径:', '/' + finalRoutePath);
            console.log('路径段:', pathSegments);

            navigate('/' + finalRoutePath);
        } else {
            console.log('未找到目标菜单项或缺少parentKeys');
        }
    };
    const items2 = useMemo(() => {
        console.log('当前顶部菜单:', topActiveKey);
        let sidArr = menus.find(menuItem => menuItem.key === topActiveKey)
        console.log('找到的顶部菜单:', sidArr);

        if (!sidArr || !sidArr.children) {
            console.log('未找到菜单或子菜单:', topActiveKey);
            return [];
        }
        let sideList = sidArr.children
        console.log('侧边栏菜单列表:', sideList);

        const menuItems = sideList.map((sideItm, sideIdx) => {
            const menuItem = {
                key: sideItm.key,
                icon: sideItm.icon,
                label: sideItm.label,
            };

            if (sideItm.children && sideItm.children.length > 0) {
                menuItem.children = sideItm.children.map((childIte, childIdx) => {
                    return {
                        key: childIte.key,
                        label: childIte.label,
                    };
                });
                console.log(`菜单 ${sideItm.key} 的子菜单:`, menuItem.children);
            }

            return menuItem;
        });

        console.log('最终构建的菜单项:', menuItems);
        return menuItems;
    }, [topActiveKey]);
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
                    <ThemeSwitcher />
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
    );
};
export default MyLayOut;