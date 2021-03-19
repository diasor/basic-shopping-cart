const path = require("path")

module.exports = {
	presets: [
		"@vue/cli-plugin-babel/preset"
	],
	plugins: [
		// [ "@babel/plugin-proposal-object-rest-spread" ],
		// [ "@babel/plugin-transform-shorthand-properties", { "loose": true } ],
		// [ "@babel/plugin-syntax-dynamic-import" ],
		[
			"module-resolver",
			{
				"extensions": [
					".js",
					".vue"
				],
				"alias": {
					"@service"    : path.resolve(__dirname, "./src/service"),
					"@assets"     : path.resolve(__dirname, "./src/assets"),
					"@router"     : path.resolve(__dirname, "./src/router"),
					"@store"   	  : path.resolve(__dirname, "./src/store"),
					"@views"      : path.resolve(__dirname, "./src/views"),
					"@tests"      : path.resolve(__dirname, "./tests"),
				}
			}
		]
	],
	env: {
		"test": {
			"presets" : [ [ "env", { "targets": { "node": "current" } } ] ],
			"plugins" : [ [ "dynamic-import-node" ] ]
		}
	}
}