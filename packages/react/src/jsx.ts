import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols';
import { ElementType, Key, Props, ReactElemntType, Ref } from 'shared/ReactTypes';

// createReactElement 和 _jsx返回的都是一种叫 ReactElement 的数组结构
const ReactElement = function (
	type: ElementType,
	key: Key,
	ref: Ref,
	props: Props
) :ReactElemntType{
	const element = {
		$$typeof: REACT_ELEMENT_TYPE,
		type,
		key,
		ref,
		props
	};
	return element;
};

export const jsx = (type: ElementType, config: any, ...maybeChildren: any) => {
	// key props ref 单独处理
	let key: Key = null;
	let ref: Ref = null;
	const props: Props = {};

	for (const prop in config) {
		const val = config[prop];
		if (prop === key) {
			if (val !== undefined) {
				key = '' + val;
			}
			continue;
		}
		if (prop === ref) {
			if (ref !== undefined) {
				ref = val;
			}
			continue;
		}
		if ({}.hasOwnProperty.call(config, prop)) {
			props[prop] = val;
		}
	}

	const maybeChildrenLength = maybeChildren.length;

	if (maybeChildrenLength) {
		// child [child, child, child]
		if (maybeChildrenLength === 1) {
			props.children = maybeChildren[0];
		} else {
			props.children = maybeChildren;
		}
	}

	return ReactElement(type, key, ref, props);
};

export const jsxDEV = jsx;
