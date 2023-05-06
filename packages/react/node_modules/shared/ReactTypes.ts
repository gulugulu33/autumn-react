export type ElementType = any; // ElementType 类型别名，表示 React 组件类型

export type Key = any; // Key 类型别名，表示 React 组件的 key 属性类型
export type Ref = any; // Ref 类型别名，表示 React 组件的 ref 属性类型
export type Props = any; // Props 类型别名，表示 React 组件的 props 属性类型

export interface ReactElemntType {
	$$typeof: symbol | number; // React 元素类型标识符 $$typeof 是 React 中的一个特殊属性，它用于标识一个对象是否为 React 元素。该属性的值是一个 Symbol 类型或数字类型，表示 React 元素的类型。
	type: ElementType; // React 组件类型
	key: Key; // React 组件 key 属性
	ref: Ref; // React 组件 ref 属性
	props: Props; // React 组件 props 属性
}
