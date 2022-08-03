import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { DevInfo, getDevInfo } from '../dev';
import { flipH, flipV, rot180, rot90L, rot90R, transform } from './transform';
import { SvgFC } from './types';

const SvgIcon: SvgFC = (props) => (
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

describe('transform', () => {
  describe('string', () => {
    const ModifiedSvg = transform(SvgIcon, 'rotate(30deg)');

    expect(getDevInfo(ModifiedSvg)).toEqual<DevInfo>({
      Orig: SvgIcon,
      type: 'transform',
      tag: 'rotate(30deg)',
      comment: undefined,
    });

    expect(ModifiedSvg.displayName).toMatch(/\.transform\{rotate\(30deg\)}$/);

    it('default', () => {
      expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
    });
    it('extra', () => {
      expect(
        render(
          <ModifiedSvg
            version="1.0"
            style={{ transformOrigin: '40%, 40%', transform: 'scaleX(-1)' }}
          />,
        ).asFragment(),
      ).toMatchSnapshot();
    });
  });

  describe('callback', () => {
    const ModifiedSvg = transform(SvgIcon, (prev) =>
      prev ? 'rotate(30deg),' + prev : 'rotate(40deg)',
    );

    const info = getDevInfo(ModifiedSvg);
    expect(info).not.toBeUndefined();
    expect(info!.Orig).toBe(SvgIcon);
    expect(info!.type).toEqual('transform');
    expect(info!.tag).toEqual('function');
    expect(info!.comment).toMatch(
      /^function\b.*rotate\(30deg\),.*rotate\(40deg\)/s,
    );

    expect(ModifiedSvg.displayName).toMatch(/\.transform\{function}$/s);

    it('default', () => {
      expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
    });
    it('extra', () => {
      expect(
        render(
          <ModifiedSvg
            version="1.0"
            style={{ transformOrigin: '40%, 40%', transform: 'scaleX(-1)' }}
          />,
        ).asFragment(),
      ).toMatchSnapshot();
    });
  });
});

describe('flipH', () => {
  const ModifiedSvg = flipH(SvgIcon);

  it('default', () => {
    expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
  });
  it('extra', () => {
    expect(
      render(
        <ModifiedSvg
          version="1.0"
          style={{ transformOrigin: '40%, 40%', transform: 'rotate(30deg)' }}
        />,
      ).asFragment(),
    ).toMatchSnapshot();
  });
});

describe('flipV', () => {
  const ModifiedSvg = flipV(SvgIcon);

  it('default', () => {
    expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
  });
  it('extra', () => {
    expect(
      render(
        <ModifiedSvg
          version="1.0"
          style={{ transformOrigin: '40%, 40%', transform: 'rotate(30deg)' }}
        />,
      ).asFragment(),
    ).toMatchSnapshot();
  });
});

describe('rot90L', () => {
  const ModifiedSvg = rot90L(SvgIcon);

  it('default', () => {
    expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
  });
  it('extra', () => {
    expect(
      render(
        <ModifiedSvg
          version="1.0"
          style={{ transformOrigin: '40%, 40%', transform: 'rotate(30deg)' }}
        />,
      ).asFragment(),
    ).toMatchSnapshot();
  });
});

describe('rot90R', () => {
  const ModifiedSvg = rot90R(SvgIcon);

  it('default', () => {
    expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
  });
  it('extra', () => {
    expect(
      render(
        <ModifiedSvg
          version="1.0"
          style={{ transformOrigin: '40%, 40%', transform: 'rotate(30deg)' }}
        />,
      ).asFragment(),
    ).toMatchSnapshot();
  });
});

describe('rot180', () => {
  const ModifiedSvg = rot180(SvgIcon);

  it('default', () => {
    expect(render(<ModifiedSvg />).asFragment()).toMatchSnapshot();
  });
  it('extra', () => {
    expect(
      render(
        <ModifiedSvg
          version="1.0"
          style={{ transformOrigin: '40%, 40%', transform: 'rotate(30deg)' }}
        />,
      ).asFragment(),
    ).toMatchSnapshot();
  });
});
