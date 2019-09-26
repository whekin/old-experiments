
module.exports = {
	context: __dirname,
	devtool: "source-map",
	entry: "./js/main.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	}
};