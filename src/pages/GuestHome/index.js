import React from 'react';
import { Card, Typography, Button, Space, Row, Col } from 'antd';
import { HomeOutlined, UserOutlined, LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../themes';
import './index.css';

const { Title, Paragraph, Text } = Typography;

const GuestHome = () => {
  const navigate = useNavigate();
  const { theme } = React.useContext(ThemeContext);

  const handleLogin = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: '📊',
      title: '数据可视化',
      description: '丰富的图表展示，让数据更直观',
    },
    {
      icon: '🗺️',
      title: '地图应用',
      description: '交互式地图，支持多种覆盖物',
    },
    {
      icon: '🎮',
      title: '趣味游戏',
      description: '休闲娱乐，缓解工作压力',
    },
  ];

  return (
    <div className="guest-home-container">
      <div className="hero-section">
        <div className="hero-content">
          <Title level={1} className="hero-title">
            欢迎来到 <span style={{ color: theme.primary }}>DemoApp</span>
          </Title>
          <Paragraph className="hero-subtitle">
            这是一个功能丰富的演示应用，包含数据可视化、地图应用等多个模块
          </Paragraph>
          <Space size="large" className="hero-actions">
            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              onClick={handleLogin}
            >
              管理员登录
            </Button>
            <Button
              size="large"
              icon={<HomeOutlined />}
              onClick={() => window.location.reload()}
            >
              返回首页
            </Button>
          </Space>
        </div>
      </div>

      <div className="features-section">
        <Title level={2} className="section-title">功能特色</Title>
        <Row gutter={[24, 24]}>
          {features.map((feature, index) => (
            <Col xs={24} sm={8} key={index}>
              <Card className="feature-card" hoverable>
                <div className="feature-icon">{feature.icon}</div>
                <Title level={4}>{feature.title}</Title>
                <Paragraph>{feature.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <div className="info-section">
        <Card className="info-card">
          <Title level={3}>👋 游客模式</Title>
          <Paragraph>
            您当前以游客身份访问，功能受限。如需体验完整功能，请：
          </Paragraph>
          <ul className="info-list">
            <li>点击上方"管理员登录"按钮</li>
            <li>选择"管理员"角色</li>
            <li>输入任意用户名和密码（至少6位）</li>
            <li>输入正确的验证码即可登录</li>
          </ul>
          <div className="login-prompt">
            <Button
              type="primary"
              size="large"
              icon={<LoginOutlined />}
              onClick={handleLogin}
            >
              立即登录体验完整功能
            </Button>
          </div>
        </Card>
      </div>

      <div className="footer-section">
        <Text type="secondary">
          © 2024 DemoApp. 技术栈：React + Ant Design + ECharts + 百度地图
        </Text>
      </div>
    </div>
  );
};

export default GuestHome;