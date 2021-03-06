module.exports = {
    "parser": "babel-eslint",
    "env": {
        "node": true,
        "commonjs": true,
        "es6": true,
        "mocha": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true,
            "experimentalObjectRestSpread": true,
            "impliedStrict": true,
        }
    },
    "plugins": [
        "babel"
    ],
    "rules": {
        "indent": [
            "error",
            "spaces"
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "babel/semi": [
            "error",
            "always",
            { "omitLastInOneBlock": true }
        ],
        "no-console": ["error", { "allow": ["warn", "error", "log"] }]
    }
};