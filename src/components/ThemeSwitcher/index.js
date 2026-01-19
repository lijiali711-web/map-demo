import React, { useContext } from 'react';
import { Button, Dropdown, Space, Typography } from 'antd';
import { BulbOutlined, SettingOutlined } from '@ant-design/icons';
import { ThemeContext, themes } from '../../themes';

const { Text } = Typography;

const ThemeSwitcher = () => {
  const { theme, themeName, setTheme } = useContext(ThemeContext);

  const getThemeIcon = (themeName) => {
    switch (themeName) {
      case 'dark':
        return '🌙';
      case 'lightBlue':
        return '💧';
      case 'green':
        return '🌿';
      case 'purple':
        return '💜';
      default:
        return '☀️';
    }
  };

  const menuItems = Object.entries(themes).map(([key, themeConfig]) => ({
    key,
    label: (
      <Space>
        <span>{getThemeIcon(key)}</span>
        <span>{themeConfig.name}</span>
        {themeName === key && <span>✓</span>}
      </Space>
    ),
    onClick: () => setTheme(key),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      placement="bottomRight"
      arrow
    >
      <Button 
        type="text" 
        icon={<SettingOutlined />}
        style={{ 
          color: theme.text,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <Space>
          <span>{getThemeIcon(themeName)}</span>
          <Text style={{ color: theme.text }}>主题</Text>
        </Space>
      </Button>
    </Dropdown>
  );
};

export default ThemeSwitcher;