const CracoLessPlugin = require('craco-less');
const path = require('path');

module.exports = {
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                // 可传 less-loader 的额外配置
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,  // 若用 antd 必须开
                    },
                },
            },
        },
    ],
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),           // src 根目录
            // '@components': path.resolve(__dirname, 'src/components'),
            // '@utils': path.resolve(__dirname, 'src/utils'),
            '@public': path.resolve(__dirname, 'public'),   // 把 public 也配进来
        },
    },
};
