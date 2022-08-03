import '@testing-library/jest-dom';
import React, { Component, FC, forwardRef } from 'react';
import { render } from '@testing-library/react';
import { deprecated } from './deprecated';
import { DevInfo, getDevInfo } from './devInfo';

describe('deprecated', () => {
  describe('fc', () => {
    const Comp: FC<{ x: number }> = ({ x }) => <code>{x}</code>;
    const CompFix = jest.fn(Comp);
    (CompFix as any as FC).displayName = 'CompFix_display_name';

    const Wrapped = deprecated(CompFix, {
      comment: 'Lorem ipsum dolor.',
    });

    afterEach(() => {
      CompFix.mockClear();
    });

    it('self', () => {
      expect(getDevInfo(Wrapped)).toEqual<DevInfo>({
        type: 'deprecated',
        Orig: CompFix,
        comment: 'Lorem ipsum dolor.',
      });
    });

    it('render', () => {
      const cw = jest.spyOn(console, 'warn');
      cw.mockImplementation();

      render(<Wrapped x={42} />);

      expect(CompFix).toHaveBeenCalledTimes(1);
      expect(CompFix).toHaveBeenNthCalledWith(1, { x: 42 }, {});

      expect(cw).toHaveBeenCalledTimes(1);
      const callArgs = cw.mock.calls[0];
      expect(callArgs[0]).toBe('Deprecated component');
      expect(callArgs[1]).toBe('CompFix_display_name');
      expect(callArgs[2]).toBe(CompFix);
      expect(callArgs[3]).toBe('rendered.');
      expect(callArgs[4]).toBe('Lorem ipsum dolor.');
      expect(callArgs[5]).toBeInstanceOf(Error);
      cw.mockReset();
    });
  });

  describe('forward ref', () => {
    const Comp = forwardRef<HTMLElement, { x: number }>(({ x }, ref) => (
      <code ref={ref}>{x}</code>
    ));
    Comp.displayName = 'Comp_display_name';

    const Wrapped = deprecated(Comp, { withRef: true });

    it('self', () => {
      expect(getDevInfo(Wrapped)).toEqual<DevInfo>({
        type: 'deprecated',
        Orig: Comp,
      });
    });

    it('render without ref', () => {
      const cw = jest.spyOn(console, 'warn');
      cw.mockImplementation();

      render(<Wrapped x={42} />);

      expect(cw).toHaveBeenCalledTimes(1);
      const callArgs = cw.mock.calls[0];
      expect(callArgs[0]).toBe('Deprecated component');
      expect(callArgs[1]).toBe('Comp_display_name');
      expect(callArgs[2]).toBe(Comp);
      expect(callArgs[3]).toBe('rendered.');
      expect(callArgs[4]).toBe('');
      expect(callArgs[5]).toBeInstanceOf(Error);
      cw.mockReset();
    });

    it('render with ref', () => {
      const ref = jest.fn<void, [HTMLElement | null]>(() => {});

      const cw = jest.spyOn(console, 'warn');
      cw.mockImplementation();

      render(<Wrapped ref={ref} x={42} />).unmount();

      expect(cw).toHaveBeenCalledTimes(1);
      const callArgs = cw.mock.calls[0];
      expect(callArgs[0]).toBe('Deprecated component');
      expect(callArgs[1]).toBe('Comp_display_name');
      expect(callArgs[2]).toBe(Comp);
      expect(callArgs[3]).toBe('rendered.');
      expect(callArgs[4]).toBe('');
      expect(callArgs[5]).toBeInstanceOf(Error);
      cw.mockReset();

      expect(ref).toHaveBeenCalledTimes(2);
      expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLElement);
      expect(ref.mock.calls[1][0]).toBe(null);
    });
  });

  describe('class', () => {
    class Comp extends Component<{ x: number }> {
      render() {
        return <code>{this.props.x}</code>;
      }
    }

    const Wrapped = deprecated(Comp, { withRef: true });

    it('self', () => {
      expect(getDevInfo(Wrapped)).toEqual<DevInfo>({
        type: 'deprecated',
        Orig: Comp,
      });
    });

    it('render without ref', () => {
      const cw = jest.spyOn(console, 'warn');
      cw.mockImplementation();

      render(<Wrapped x={42} />);

      expect(cw).toHaveBeenCalledTimes(1);
      const callArgs = cw.mock.calls[0];
      expect(callArgs[0]).toBe('Deprecated component');
      expect(callArgs[1]).toBe('Comp');
      expect(callArgs[2]).toBe(Comp);
      expect(callArgs[3]).toBe('rendered.');
      expect(callArgs[4]).toBe('');
      expect(callArgs[5]).toBeInstanceOf(Error);
      cw.mockReset();
    });

    it('render with ref', () => {
      const ref = jest.fn<void, [Comp | null]>(() => {});

      const cw = jest.spyOn(console, 'warn');
      cw.mockImplementation();

      render(<Wrapped ref={ref} x={42} />).unmount();

      expect(cw).toHaveBeenCalledTimes(1);
      const callArgs = cw.mock.calls[0];
      expect(callArgs[0]).toBe('Deprecated component');
      expect(callArgs[1]).toBe('Comp');
      expect(callArgs[2]).toBe(Comp);
      expect(callArgs[3]).toBe('rendered.');
      expect(callArgs[4]).toBe('');
      expect(callArgs[5]).toBeInstanceOf(Error);
      cw.mockReset();

      expect(ref).toHaveBeenCalledTimes(2);
      expect(ref.mock.calls[0][0]).toBeInstanceOf(Comp);
      expect(ref.mock.calls[1][0]).toBe(null);
    });
  });
});
