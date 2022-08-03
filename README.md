# `@cubux/react-utils`

[![NPM latest](https://img.shields.io/npm/v/@cubux/react-utils.svg)](https://www.npmjs.com/package/@cubux/react-utils)

Utility functions related to React.

## Install

```sh
npm i @cubux/react-utils
```

## API

### `deprecated()` function

Wrap a component to emit deprecation warning.

```ts
function deprecated<T extends React.ComponentType<any>>(
  Origin: T,
  options?: Options,
): React.ComponentType<React.ComponentProps<T>>
```

The `options` object can have the following properties:

| property  | type      | default | description                                                                                                                         |
|-----------|-----------|---------|-------------------------------------------------------------------------------------------------------------------------------------|
| `comment` | `string`  | —       | Extra comment to emit in console warning. Can also be obtained later with `getDevInfo()`.                                           |
| `tag`     | `string`  | —       | A `tag` property to bypass to `setDevInfo()`. Can be obtained later with `getDevInfo()`.                                            |
| `withRef` | `boolean` | `false` | Whether to use `React.forwardRef()`, so `ref` React attribute can be used to refer to underlying element of the `Origin` component. |

A `getDevInfo()` can be used in development env to get details about deprecation.
This can be used on "dev only" internal pages.

**Notice:** Component's (static) properties like `propTypes`, `defaultProps`,
etc. are not touched because it was not necessary yet.

Does nothing in production env and returns origin component as is.

See also: `DevInfo`, `getDevInfo()`.

```tsx
import { deprecated, getDevInfo } from '@cubux/react-utils';

function OldComponentOrigin() {
  return <div>...</div>;
}

const OldComponent = deprecated(OldComponentOrigin, {
  comment: 'Use `NewComponent` instead.',
});

if (process.env.NODE_ENV === 'development') {
  console.log(getDevInfo(OldComponent));
}
```

### `DevInfo` type

```ts
interface DevInfo {
  type: string;
  tag?: string;
  Orig?: React.ComponentType<any>;
  comment?: string;
}
```

See also: `getDevInfo()`, `setDevInfo()`.

### `getDevInfo()` function

Get `DevInfo` for the given generated component.

```ts
function getDevInfo<T extends DevInfo = DevInfo>(
  subject: ComponentType<any>,
): T | undefined
```

Does nothing in production env and always returns `undefined`.

An example can be found in `deprecated()`.

See also: `setDevInfo()`.

### `setDevInfo()` function

Set given `DevInfo` for the given component.

```ts
function setDevInfo<T extends DevInfo>(
  subject: ComponentType<any>,
  info: T,
): void
```

Does nothing in production env.

See also: `getDevInfo()`.

### `isElementOf()` function

Check whether the given element is an element of the given component.

```ts
function isElementOf<T extends React.ElementType>(
  element: any,
  component: T,
): element is React.ReactElement<React.ComponentPropsWithoutRef<T>, T>
```

**NOTICE:** The `react-is` peer dependency must be installed to use this
function.

Enhanced version of `isElement()` from `react-is` package to use as Type Guard
function.

```tsx
import { FC, PropsWithChildren } from 'react';

interface FooProps {
  x: number;
  y?: string;
}
const Foo: FC<FooProps> = () => <div />;

const element = <Foo x={42} y="foo bar">baz</Foo>;
if (isElementOf(element, Foo)) {
  const { props } = element;
  // `props` type is `PropsWithChildren<FooProps>`
  console.log(props);
  // { x: 42, y: "foo bar", children: "baz" }
}

console.log(isElementOf(element, 'div'));
// => `false`
console.log(isElementOf(<div/>, Foo));
// => `false`
console.log(isElementOf(<div/>, 'a'));
// => `false`
console.log(isElementOf(<div/>, 'div'));
// => `true`
```

### `SvgFC` type

A `React.FunctionComponent` component receiving properties for `<svg/>` element.

```ts
type SvgFC = React.FC<React.SVGProps<SVGSVGElement>>
```

A component of this signature can be given for example with `svgo` package,
which is used internally in CRA `react-scripts` for SVG files imports like
following:

```ts
// You are using CRA `react-scripts`, so
import { ReactComponent } from './file.svg';
```

Or writing such component manually:

```tsx
const MySvg: SvgFC = (props) => (
  <svg
    {...props}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M2,5 h12 v6 z" />
  </svg>
);
```

### `svgTransform` function

Creates new `SvgFC` component by reusing origin `SvgFC` applying a CSS
`transform`.

```ts
type CssTransform = string;
type CalcTransform = (prev: CssTransform | undefined) => CssTransform;

function svgTransform(
  Orig: SvgFC,
  transform: CssTransform | CalcTransform,
): SvgFC
```

A `getDevInfo()` can be used in development env to get details about underlying
transform. This can be used on "dev only" internal pages.

```tsx
const MySvg: SvgFC = (props) => (
  <svg
    {...props}
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="currentColor"
  >
    <path d="M2,5 h12 v6 z" />
  </svg>
);

const MySvg1 = svgTransform(MySvg, 'scaleX(0.75), rotate(45deg)');
```

See also: `getDevInfo()`.

### `svgFlipH()` function

Creates new `SvgFC` applying horizontal flip to origin `SvgFC` with CSS
transform.

```ts
function svgFlipH(Orig: SvgFC): SvgFC
```

Uses `svgTransform()` internally with `'scaleX(-1)'` transform value.

See also: `transform()`, `svgFlipV()`, `svgRot180()`.

### `svgFlipV()` function

Creates new `SvgFC` applying vertical flip to origin `SvgFC` with CSS
transform.

```ts
function svgFlipV(Orig: SvgFC): SvgFC
```

Uses `svgTransform()` internally with `'scaleY(-1)'` transform value.

See also: `transform()`, `svgFlipH()`, `svgRot180()`.

### `svgRot180()` function

Creates new `SvgFC` applying rotation 180 deg to origin `SvgFC` with CSS
transform.

```ts
function svgRot180(Orig: SvgFC): SvgFC
```

Uses `svgTransform()` internally with `'rotate(180deg)'` transform value.

See also: `transform()`, `svgFlipH()`, `svgFlipV()`.

### `svgRot90L()` function

Creates new `SvgFC` applying rotation 90 deg anti-clockwise to origin `SvgFC`
with CSS transform.

```ts
function svgRot90L(Orig: SvgFC): SvgFC
```

Uses `svgTransform()` internally with `'rotate(-90deg)'` transform value.

See also: `transform()`, `svgRot180()`.

### `svgRot90R()` function

Creates new `SvgFC` applying rotation 90 deg clockwise to origin `SvgFC` with
CSS transform.

```ts
function svgRot90R(Orig: SvgFC): SvgFC
```

Uses `svgTransform()` internally with `'rotate(90deg)'` transform value.

See also: `transform()`, `svgRot180()`.
