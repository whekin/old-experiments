
module.exports = {
	context: __dirname,
	devtool: "source-map",
	entry: "./js/app.js",
	output: {
		path: __dirname,
		filename: "build.js",
        library: "app"
	},
	watch: true,
    mode: "development"
};