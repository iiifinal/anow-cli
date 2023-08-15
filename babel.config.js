module.exports={
    presets: [
        [
            '@babel/preset-env',
            {
                targets: { "browsers": ["last 2 versions", "ie >= 11", "not ie <= 8"] },
                useBuiltIns: 'usage',
                corejs: { version: 3 },
                loose: true
            }
        ],
        [
            '@babel/preset-react',
            { runtime: 'automatic' }
        ],
        "@babel/preset-typescript",
    ]
}