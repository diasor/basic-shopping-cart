const path = require("path")

module.exports = {
	presets: [
		"@vue/cli-plugin-babel/preset"
	],
	plugins: [
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
					"@components" : path.resolve(__dirname, "./src/components"),
					"@tests"      : path.resolve(__dirname, "./tests"),
				}
			}
		]
	]
}