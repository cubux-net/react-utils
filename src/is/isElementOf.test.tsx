import { FC, HTMLAttributes, PropsWithChildren, PureComponent } from 'react';
import { isElementOf } from './isElementOf';

interface FuncProps {
  x: number;
  y?: string;
}
const Func: FC<FuncProps> = () => <div />;

interface ClsProps {
  a: string;
  b?: boolean;
}
class Cls extends PureComponent<ClsProps> {
  render() {
    return <div />;
  }
}

describe('test', () => {
  const func = (
    <Func x={42} y="foo bar">
      <b>baz</b>
    </Func>
  );
  const cls = (
    <Cls a="lorem ipsum" b>
      <b>baz</b>
    </Cls>
  );
  const div = (
    <div id="foo-bar" className="lorem _ipsum">
      <b>baz</b>
    </div>
  );

  it('fc', () => {
    if (!isElementOf(func, Func)) {
      throw new Error('Not an <Func/>');
    }
    const p = func.props;
    expect(p).toEqual<PropsWithChildren<FuncProps>>({
      x: 42,
      y: 'foo bar',
      children: <b>baz</b>,
    });
  });

  it('class', () => {
    if (!isElementOf(cls, Cls)) {
      throw new Error('Not an <Cls/>');
    }
    const p = cls.props;
    expect(p).toEqual<PropsWithChildren<ClsProps>>({
      a: 'lorem ipsum',
      b: true,
      children: <b>baz</b>,
    });
  });

  it('html', () => {
    if (!isElementOf(div, 'div')) {
      throw new Error('Not an <div/>');
    }
    const p = div.props;
    expect(p).toEqual<HTMLAttributes<HTMLDivElement>>({
      id: 'foo-bar',
      className: 'lorem _ipsum',
      children: <b>baz</b>,
    });
  });

  it('falsy', () => {
    expect(isElementOf(func, Cls)).toBeFalsy();
    expect(isElementOf(func, 'div')).toBeFalsy();
    expect(isElementOf(cls, Func)).toBeFalsy();
    expect(isElementOf(cls, 'div')).toBeFalsy();
    expect(isElementOf(div, Func)).toBeFalsy();
    expect(isElementOf(div, Cls)).toBeFalsy();
    expect(isElementOf(div, 'a')).toBeFalsy();
  });
});
