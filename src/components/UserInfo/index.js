import React, { useState, useEffect } from 'react';
import { Dropdown, Avatar, Button, Space, Modal, message, Typography } from 'antd';
import { UserOutlined, LogoutOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../themes';
import './index.css';

const { Text } = Typography;

const UserInfo = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);
  const [userInfo, setUserInfo] = useState(null);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  useEffect(() => {
    // 获取用户信息
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogout = () => {
    // 清除用户信息
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
    
    message.success('已安全退出登录');
    
    // 跳转到登录页
    navigate('/login');
  };

  const showUserInfo = () => {
    Modal.info({
      title: '用户信息',
      icon: <InfoCircleOutlined />,
      content: (
        <div className="user-info-modal">
          <div className="info-item">
            <span className="label">用户名：</span>
            <span className="value">{userInfo?.username}</span>
          </div>
          <div className="info-item">
            <span className="label">角色：</span>
            <span className="value">
              {userInfo?.role === 'admin' ? '管理员' : '游客'}
            </span>
          </div>
          <div className="info-item">
            <span className="label">登录时间：</span>
            <span className="value">
              {userInfo?.loginTime ? new Date(userInfo.loginTime).toLocaleString() : '-'}
            </span>
          </div>
        </div>
      ),
      width: 400,
    });
  };

  const menuItems = [
    {
      key: 'info',
      icon: <InfoCircleOutlined />,
      label: '个人信息',
      onClick: showUserInfo,
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => setLogoutModalVisible(true),
      danger: true,
    },
  ];

  if (!userInfo) {
    return null;
  }

  return (
    <>
      <Space className="user-info-container">
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomRight"
          arrow
          trigger={['click']}
        >
          <Button 
            type="text" 
            className="user-avatar-btn"
            style={{ 
              color: theme.text,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
            }}
          >
            <Avatar 
              size="small" 
              icon={<UserOutlined />}
              style={{ 
                backgroundColor: theme.primary,
              }}
            />
            <Text style={{ color: theme.text }}>
              {userInfo.username}
            </Text>
            <Text 
              type="secondary" 
              style={{ 
                fontSize: '12px',
                color: theme.textSecondary 
              }}
            >
              ({userInfo.role === 'admin' ? '管理员' : '游客'})
            </Text>
          </Button>
        </Dropdown>
      </Space>

      {/* 退出登录确认弹窗 */}
      <Modal
        title="退出登录"
        open={logoutModalVisible}
        onOk={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
        okText="确认退出"
        cancelText="取消"
        okButtonProps={{ danger: true }}
      >
        <p>确定要退出登录吗？</p>
        <p style={{ color: '#666', fontSize: '14px' }}>
          退出后需要重新登录才能访问系统功能。
        </p>
      </Modal>
    </>
  );
};

export default UserInfo;