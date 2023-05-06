import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import {
	ElementType,
	Key,
	Props,
	ReactElemntType,
	Ref
} from 'shared/ReactTypes';

// createReactElement 和 _jsx返回的都是一种叫 ReactElement 的数组结构
const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
): ReactElemntType {
	const element = {
		$$typeof: REACT_ELEMENT_TYPE, // React 元素类型标识符
		type, // 组件的类型
		key, // 组件的 key 属性
		ref, // 组件的 ref 属性
		props // 组件的 props 属性
	};
	return element; // 返回一个 React 元素对象
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	// key 和 ref 单独处理
	let key: Key = null; // 初始化 key 为 null
	let ref: Ref = null; // 初始化 ref 为 null
	const props: Props = {}; // 初始化 props 为空对象

	for (const prop in config) {
		const val = config[prop];
		if (prop === key) {
			if (val !== undefined) {
				key = '' + val; // 将 key 转换为字符串类型
			}
			continue;
		}
		if (prop === ref) {
			if (ref !== undefined) {
				ref = val; // 将 ref 赋值为传入的 ref 属性值
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val; // 将非 key 和 ref 属性赋值给 props 对象
		}
	}

	const maybeChildrenLength = maybeChildren.length; // 获取子元素数组的长度

	if (maybeChildrenLength) {
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0]; // 如果只有一个子元素，则直接将其赋值给 props.children
		} else {
			props.children = maybeChildren; // 如果有多个子元素，则将子元素数组赋值给 props.children
		}
	}

	return ReactElement(type, key, ref, props); // 创建 React 元素并返回
};

export const jsxDEV = jsx; // 将 jsxDEV 函数指向 jsx 函数
