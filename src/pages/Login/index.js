import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, Select, message, Row, Col, Space } from 'antd';
import { UserOutlined, LockOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import './index.css';

const { Option } = Select;

// 预存账号
const presetAccounts = {
  admin: {
    username: 'admin',
    password: '123456',
    role: 'admin',
    displayName: '系统管理员'
  },
  guest: {
    username: 'guest',
    password: '123456',
    role: 'guest',
    displayName: '访客用户'
  }
};

const Login = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const [userInputCaptcha, setUserInputCaptcha] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // 生成随机验证码
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(result);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  // 刷新验证码
  const refreshCaptcha = () => {
    generateCaptcha();
    setUserInputCaptcha('');
  };

  // 快速登录函数
  const handleQuickLogin = async (accountType) => {
    const account = presetAccounts[accountType];

    // 自动填充表单
    form.setFieldsValue({
      username: account.username,
      password: account.password,
      role: account.role,
      captcha: userInputCaptcha
    });

    // 模拟输入验证码
    const autoCaptcha = captcha;
    setUserInputCaptcha(autoCaptcha);

    // 直接调用登录
    await handleLogin({
      ...account,
      captcha: autoCaptcha
    });
  };

  // 模拟登录验证
  const handleLogin = async (values) => {
    setLoading(true);

    try {
      // 验证码检查
      if (values.captcha.toLowerCase() !== captcha.toLowerCase()) {
        message.error('验证码错误，请重新输入');
        refreshCaptcha();
        form.setFieldsValue({ captcha: '' });
        setUserInputCaptcha('');
        return;
      }

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 根据用户角色进行不同的处理
      const userInfo = {
        username: values.username,
        role: values.role,
        loginTime: new Date().toISOString(),
        displayName: presetAccounts[values.role]?.displayName || values.username,
      };

      // 保存用户信息到localStorage
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('isLoggedIn', 'true');

      message.success(`欢迎回来，${userInfo.displayName}！`);

      // 根据角色跳转到不同页面
      if (values.role === 'admin') {
        // console.log('跳转到管理员页面: /dashboard');
        navigate('/dashboard'); // 管理员跳转到主应用
      } else {
        // console.log('跳转到游客页面: /home');
        navigate('/home'); // 游客跳转到简单首页
      }

    } catch (error) {
      message.error('登录失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card" title="用户登录" bordered={false}>
        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          size="large"
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              { required: true, message: '请输入用户名！' },
              { min: 3, message: '用户名至少3个字符！' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              { required: true, message: '请输入密码！' },
              { min: 6, message: '密码至少6个字符！' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item
            name="role"
            label="用户角色"
            rules={[{ required: true, message: '请选择用户角色！' }]}
          >
            <Select placeholder="请选择用户角色">
              <Option value="admin">管理员</Option>
              <Option value="guest">游客</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="captcha"
            label="验证码"
            rules={[
              { required: true, message: '请输入验证码！' },
              { len: 4, message: '验证码必须是4位！' },
            ]}
          >
            <Row gutter={8}>
              <Col span={14}>
                <Input
                  prefix={<SafetyCertificateOutlined />}
                  placeholder="请输入验证码"
                  value={userInputCaptcha}
                  onChange={(e) => setUserInputCaptcha(e.target.value)}
                />
              </Col>
              <Col span={10}>
                <div className="captcha-box" onClick={refreshCaptcha}>
                  {captcha.split('').map((char, index) => (
                    <span
                      key={index}
                      style={{
                        color: `hsl(${index * 90}, 70%, 50%)`,
                        transform: `rotate(${Math.random() * 20 - 10}deg)`,
                        display: 'inline-block',
                        margin: '0 2px'
                      }}
                    >
                      {char}
                    </span>
                  ))}
                  <div className="refresh-hint">点击刷新</div>
                </div>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>

          {/* 快速登录 */}
          <div className="quick-login-section">
            <div className="divider">
              <span>或使用预设账号快速登录</span>
            </div>
            <Row gutter={16}>
              <Col span={12}>
                <Button
                  type="default"
                  size="large"
                  block
                  icon="👨‍💼"
                  onClick={() => handleQuickLogin('admin')}
                  className="quick-login-btn admin-btn"
                >
                  管理员
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="default"
                  size="large"
                  block
                  icon="👤"
                  onClick={() => handleQuickLogin('guest')}
                  className="quick-login-btn guest-btn"
                >
                  游客
                </Button>
              </Col>
            </Row>
          </div>

          <div className="login-tips">
            <p>💡 提示：</p>
            <p>• 点击上方按钮可使用预设账号快速登录</p>
            <p>• 管理员：admin / 123456 - 完整功能</p>
            <p>• 游客：guest / 123456 - 有限功能</p>
            <p>• 也可以手动输入其他账号进行测试</p>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;