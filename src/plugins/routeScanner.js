const { readdirSync, statSync, writeFileSync } = require('fs');
const path = require('path');

module.exports = class RouteScanner {
    constructor(props) {
        this.props = props;
        this.router = [];
        this.root = this.props.root.replace(/\\/g, "/");
        this.parent = path.dirname(this.root) + "/";//路由所在目录的上级目录。如src/pages的src
        this.name = this.root.replace(this.parent, "");//路由所在目录名称
    }

    travel(dir, route) {
        let files = readdirSync(dir)
        //根据文件路径读取文件，返回文件列表
        files.forEach(f => {
            let file = path.resolve(dir, f);
            let stat = statSync(file);

            if (stat.isDirectory()) {
                let relativePath = file.replace(this.root, "");//获取相对目录
                let newRoute = { path: relativePath, pages: [] };
                route.pages.push(newRoute);
                this.travel(file, newRoute);
            }
            if (stat.isFile() && file.endsWith("js")) {//只需要js文件后缀作为路由
                let bareFile = file.replace(".js", "").replace(/\\/g, "/").replace("/index", "");//去掉后缀和index的文件路径
                let relativePath = bareFile.replace(this.root, "");//获取相对目录
                let componentPath = bareFile.replace(this.parent, "");
                if (relativePath) { //相对路径不为空，说明不是根路径
                    if (relativePath.endsWith("layout"))
                        route.layout = componentPath;
                    else
                        route.pages.push({ path: relativePath, component: componentPath });
                }
                else { //根路由特殊处理
                    if (this.props.rootUnest)
                        this.router.push({ path: "/", component: componentPath })
                    else
                        route.pages.push({ path: "/", component: componentPath });
                }
            }
        });
    }

    scan() {
        const { defaultLayout, routerPath } = this.props;
        var route = { path: "/", layout: defaultLayout, pages: [] };
        this.router.push(route);
        this.travel(this.root, route);
        if (routerPath && typeof (routerPath) == "string" && routerPath !== "")
            writeFileSync(routerPath, `module.exports = ${JSON.stringify(this.router, null, 4)}`)
        return this.router;
    }
}