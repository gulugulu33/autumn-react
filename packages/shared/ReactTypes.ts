export type ElementType = any;

export type Key = any;
export type Ref = any;
export type Props = any;

export interface ReactElemntType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
}
