module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true,
    },
    extends: [

    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "./tsconfig.eslint.json",
        ecmaFeatures: {
            "jsx": true,
        },
        ecmaVersion: 12,
    },
    plugins: ["react", "@typescript-eslint"],
    rules:{},
    "settings": {
        "react": {
            "version": "detect",
        },
    },
};
