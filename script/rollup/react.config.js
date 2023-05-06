import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
// 从 utils.js 文件中导入三个函数：getBaseRollupPlugins、getPackageJSON 和 resolvePkgPath
import generatePackageJson from 'rollup-plugin-generate-package-json';
// 导入 rollup-plugin-generate-package-json 插件，用于生成 package.json 文件

const { name, module } = getPackageJSON('react');
// 获取 react 包的 package.json 文件，解构出 name 和 module 字段
const pkgPath = resolvePkgPath(name); // 获取 react 包的源代码路径
const pkgDistPath = resolvePkgPath(name, true); // 获取 react 包的编译后代码路径

export default [
	// 第一个打包配置项，用于生成 umd 格式的 react 库
	{
		input: `${pkgPath}/${module}`, // 入口文件路径
		output: {
			file: `${pkgDistPath}/index.js`, // 产物文件路径
			name: 'react', // 产物导出的全局变量名
			format: 'umd' // 输出格式
		},
		plugins: [
			...getBaseRollupPlugins(), // 使用基础的 Rollup 插件集合
			generatePackageJson({
				// 生成 package.json 文件
				inputFolder: pkgPath, // 源代码文件夹路径
				outputFolder: pkgDistPath, // 产物文件夹路径
				baseContents: ({ name, description, version }) => ({
					// 自定义 package.json 文件内容
					name,
					description,
					version,
					main: 'index.js' // 入口文件路径
				})
			})
		]
	},
	// 第二个打包配置项，用于生成 jsx-runtime.js 和 jsx-dev-runtime.js 两个库
	{
		input: `${pkgPath}/src/jsx.ts`, // 入口文件路径
		output: [
			{
				file: `${pkgDistPath}/jsx-runtime.js`, // 产物文件路径
				name: 'jsx-runtime.js', // 产物导出的全局变量名
				format: 'umd' // 输出格式
			},
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`, // 产物文件路径
				name: 'jsx-dev-runtime.js', // 产物导出的全局变量名
				format: 'umd' // 输出格式
			}
		],
		plugins: getBaseRollupPlugins() // 使用基础的 Rollup 插件集合
	}
];
