module.exports = {
	root: true,
	env: {
	  node: true
	},
	extends: [
	  'plugin:vue/essential',
	  '@vue/standard'
	],
	parserOptions: {
	  parser: 'babel-eslint'
	},
	rules: {
	  "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
	  "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
	  "indent": "off",
	//   "quotes": ["error", "double"],
	  "quotes": [0],
	  "brace-style": "error",
	  "no-tabs": 0,
	  "no-trailing-spaces": "off"
	},
	overrides: [
	  {
		  files: ["*.vue"],
		  rules: {
			  indent: "off"
		  },
		  files: [
			  '**/__tests__/*.{j,t}s?(x)',
			  '**/tests/unit/**/*.spec.{j,t}s?(x)'
		  ],
		  env: {
			  jest: true
		  }
	  }
	]
  }
  