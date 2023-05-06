import path from 'path'; // 导入 Node.js 的 path 模块，用于处理文件路径
import fs from 'fs'; // 导入 Node.js 的 fs 模块，用于读写文件
import cjs from '@rollup/plugin-commonjs'; // 导入 CommonJS 转 ES6 的 Rollup 插件
import ts from 'rollup-plugin-typescript2'; // 导入 TypeScript 编译插件

const pkgPath = path.resolve(__dirname, '../../packages'); // 定义包文件夹的根路径
const distPath = path.resolve(__dirname, '../../dist/node_modules'); // 定义编译后的包文件夹的根路径

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		// 如果 isDist 参数为 true，则返回编译后的包路径
		return `${distPath}/${pkgName}`;
	}
	return `${pkgPath}/${pkgName}`; // 否则返回源代码包路径
}

export function getPackageJSON(pkgName) {
	// 构造 package.json 文件的路径
	const path = `${resolvePkgPath(pkgName)}/package.json`;
	// 读取 package.json 文件的内容，并以 utf-8 编码返回字符串
	const str = fs.readFileSync(path, { encoding: 'utf-8' });
	// 将 JSON 字符串解析为 JavaScript 对象并返回
	return JSON.parse(str);
}

export function getBaseRollupPlugins({ typescript = {} } = {}) {
	// 返回包含两个 Rollup 插件的数组，一个是 CommonJS 转 ES6 插件，一个是 TypeScript 编译插件
	return [cjs(), ts(typescript)];
}
