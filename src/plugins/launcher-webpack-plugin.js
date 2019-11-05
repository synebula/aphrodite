const { writeFileSync, existsSync, mkdirSync } = require('fs');
const path = require('path');
const glob = require("glob");
const RouteCreater = require("./routerCreater");
const RouterScanner = require("./routeScanner");

module.exports = class LauncherPlugin {
    constructor(options) {
        this.options = options;
        this.path = options.path;
    }

    apply(compiler) {
        compiler.hooks.afterEnvironment.tap("LauncherPlugin", contextModuleFactory => {
            const launcher = path.resolve(this.path, '.launcher')
            if (!existsSync(launcher))
                mkdirSync(launcher)
            this.writeIndex(`${launcher}/index.js`);
            this.writeRouter(`${launcher}/router.js`);
        });
    }

    writeIndex(indexPath) {
        let content = `
import React from 'react';
import ReactDOM from "react-dom";
import { ConfigProvider } from 'antd';
import reduxaga from "@/frameworks/reduxaga";
import Router from './router';

const app = reduxaga();
// 2. Plugins
// app.use({});
// 3. Model
${this.writeModels()}
// 4. Router
app.router(() => <Router />);
// 5. Start
const App = app.start();

const appLocale = window.appLocale;
const LocalWrapper = () => {
    return (
        <ConfigProvider locale={appLocale}>
            <App />
        </ConfigProvider>
    );
}
ReactDOM.render(<LocalWrapper />, document.getElementById("main"));`;
        writeFileSync(indexPath, `${content.trim()}\n`, 'utf-8');
    }

    writeModels() {
        const modelPath = path.resolve(this.path, 'models');
        const models = glob.sync(modelPath + "/**/*.js");
        const result = models.map(m =>
            `app.model(require('${m}').default);
`);
        return result.join("");
    }

    writeRouter(contentPath) {
        const { rootUnest, createRouter, hashHistory } = this.options;//路由根节点是否允许嵌套, 是否根据扫描路径生成router文件, 是否使用hashHistory（默认BrowserHistory）
        const root = path.resolve(this.path, 'pages');
        let router = [];
        let routerPath = this.path + '/router.js'
        if (existsSync(routerPath))//存在router文件直接读取文件否则按目录生成
            router = require(routerPath);
        else
            router = new RouterScanner({ root, rootUnest, routerPath: createRouter ? routerPath : "", defaultLayout: "layouts" }).scan();
        let content = new RouteCreater({ router, rootUnest, hashHistory }).create();
        writeFileSync(contentPath, `${content.trim()}\n`, 'utf-8');
    }
}

