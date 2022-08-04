import type {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from 'react';
import { isElement } from 'react-is';

declare module 'react-is' {
  function isElement(value: any): value is ReactElement;
}

/**
 * Check whether the given element is an element of the given component
 *
 * ```tsx
 * import { FC, PropsWithChildren } from 'react';
 *
 * interface FooProps {
 *   x: number;
 *   y?: string;
 * }
 * const Foo: FC<FooProps> = () => <div />;
 *
 * const element = <Foo x={42} y="foo bar">baz</Foo>;
 * if (isElementOf(element, Foo)) {
 *   const { props } = element;
 *   // `props` type is `PropsWithChildren<FooProps>`
 *   console.log(props);
 *   // { x: 42, y: "foo bar", children: "baz" }
 * }
 *
 * console.log(isElementOf(element, 'div'));
 * // => `false`
 * console.log(isElementOf(<div/>, Foo));
 * // => `false`
 * console.log(isElementOf(<div/>, 'a'));
 * // => `false`
 * console.log(isElementOf(<div/>, 'div'));
 * // => `true`
 * ```
 *
 * @param element
 * @param component
 */
export function isElementOf<T extends ElementType>(
  element: any,
  component: T,
): element is ReactElement<ComponentPropsWithoutRef<T>, T> {
  return isElement(element) && element.type === component;
}
