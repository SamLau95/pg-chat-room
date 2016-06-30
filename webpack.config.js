var webpack = require("webpack");

module.exports = {
    entry: {
        chat: ["./src/js/chat.js"],
        admin: ["./src/js/admin.js"],
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".jsx"]
    },
    output: {
        path: __dirname + "/build",
        publicPath: "/build/",
        filename: "[name].bundle.js"
    },
    watchOptions: {
        ignored: /node_modules/,
    },
    module: {
        preLoaders: [
            { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ }
        ],
        loaders: [
            { test: require.resolve("react"), loader: "expose?React" },
            { test: require.resolve("firebase"), loader: "expose?Firebase" },
            { test: /\.s?css$/, loader: "style!css!sass" },
            { test: /\.jsx?$/, loaders: ["react-hot", "babel?optional=runtime"], exclude: /node_modules/ }
        ]
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
    ],
    eslint: {
        configFile: ".eslintrc"
    }
};
