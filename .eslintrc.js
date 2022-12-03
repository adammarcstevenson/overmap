module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "eslint:recommended"
  ],

  "parserOptions": {
    "ecmaVersion": 2020,
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "no-console": [
      "warn"
    ],
    "semi": [
      "warn",
      "never"
    ]
  }
}