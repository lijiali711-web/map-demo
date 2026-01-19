import React from 'react';

// 主题配置
export const themes = {
  // 默认主题 - 蓝色
  default: {
    name: '默认主题',
    primary: '#1890ff',
    primaryDark: '#096dd9',
    primaryLight: '#40a9ff',
    background: '#ffffff',
    surface: '#f5f5f5',
    text: '#000000',
    textSecondary: '#666666',
    border: '#d9d9d9',
    headerBg: '#001529',
    siderBg: '#ffffff',
    contentBg: '#ffffff',
    cardBg: '#ffffff',
  },
  // 暗黑主题
  dark: {
    name: '暗黑主题',
    primary: '#177ddc',
    primaryDark: '#3c9ae8',
    primaryLight: '#0e4a8a',
    background: '#141414',
    surface: '#1f1f1f',
    text: '#ffffff',
    textSecondary: '#a6a6a6',
    border: '#434343',
    headerBg: '#001529',
    siderBg: '#141414',
    contentBg: '#141414',
    cardBg: '#1f1f1f',
  },
  // 浅蓝色主题
  lightBlue: {
    name: '浅蓝主题',
    primary: '#5cadff',
    primaryDark: '#4096ff',
    primaryLight: '#85beff',
    background: '#f0f8ff',
    surface: '#e6f7ff',
    text: '#000000',
    textSecondary: '#595959',
    border: '#91d5ff',
    headerBg: '#e6f7ff',
    siderBg: '#ffffff',
    contentBg: '#f0f8ff',
    cardBg: '#ffffff',
  },
  // 绿色主题
  green: {
    name: '绿色主题',
    primary: '#52c41a',
    primaryDark: '#389e0d',
    primaryLight: '#73d13d',
    background: '#f6ffed',
    surface: '#f0f9ff',
    text: '#000000',
    textSecondary: '#595959',
    border: '#b7eb8f',
    headerBg: '#276549',
    siderBg: '#ffffff',
    contentBg: '#f6ffed',
    cardBg: '#ffffff',
  },
  // 紫色主题
  purple: {
    name: '紫色主题',
    primary: '#722ed1',
    primaryDark: '#531dab',
    primaryLight: '#9254de',
    background: '#f9f0ff',
    surface: '#f5f3ff',
    text: '#000000',
    textSecondary: '#595959',
    border: '#d3adf7',
    headerBg: '#391085',
    siderBg: '#ffffff',
    contentBg: '#f9f0ff',
    cardBg: '#ffffff',
  }
};


// 主题切换上下文
export const ThemeContext = React.createContext({
  theme: themes.default,
  themeName: 'default',
  setTheme: () => { },
});