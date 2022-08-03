import React, { useMemo } from 'react';
import { setDevInfo } from '../dev';
import { CalcTransform, CssTransform, SvgFC } from './types';

const _DEV = process.env.NODE_ENV !== 'production';

/**
 * Creates new SVG FC applying a CSS `transform` to origin SVG FC.
 *
 * @param Orig Origin SVG FC to reuse
 * @param transform CSS transform to apply
 */
export function transform(
  Orig: SvgFC,
  transform: CssTransform | CalcTransform,
): SvgFC {
  let C: SvgFC;
  let tag: string;
  if (typeof transform === 'function') {
    C = ({ style, ...rest }) => (
      <Orig
        {...rest}
        style={useMemo(
          () => ({ ...style, transform: transform(style?.transform) }),
          [style],
        )}
      />
    );

    tag = 'function';
    if (_DEV) {
      setDevInfo(C, {
        Orig,
        type: 'transform',
        tag,
        comment: transform.toString(),
      });
    }
  } else {
    C = ({ style, ...rest }) => (
      <Orig
        {...rest}
        style={useMemo(
          () => ({
            ...style,
            transform:
              style?.transform !== undefined
                ? transform + ', ' + style.transform
                : transform,
          }),
          [style],
        )}
      />
    );

    tag = transform;
    if (_DEV) {
      setDevInfo(C, {
        Orig,
        type: 'transform',
        tag,
      });
    }
  }
  C.displayName = `${Orig.displayName ?? Orig.name}.transform{${tag}}`;
  return C;
}

/**
 * Creates new SVG FC applying horizontal flip to origin SVG FC with CSS
 * transform
 *
 * @param Orig Origin SVG FC to reuse
 */
export function flipH(Orig: SvgFC) {
  return transform(Orig, 'scaleX(-1)');
}

/**
 * Creates new SVG FC applying vertical flip to origin SVG FC with CSS transform
 *
 * @param Orig Origin SVG FC to reuse
 */
export function flipV(Orig: SvgFC) {
  return transform(Orig, 'scaleY(-1)');
}

/**
 * Creates new SVG FC applying rotation 90 deg anti-clockwise to origin SVG FC
 * with CSS transform
 *
 * @param Orig Origin SVG FC to reuse
 */
export function rot90L(Orig: SvgFC) {
  return transform(Orig, 'rotate(-90deg)');
}

/**
 * Creates new SVG FC applying rotation 90 deg clockwise to origin SVG FC with
 * CSS transform
 *
 * @param Orig Origin SVG FC to reuse
 */
export function rot90R(Orig: SvgFC) {
  return transform(Orig, 'rotate(90deg)');
}

/**
 * Creates new SVG FC applying rotation 180 deg to origin SVG FC with CSS transform
 *
 * @param Orig Origin SVG FC to reuse
 */
export function rot180(Orig: SvgFC) {
  return transform(Orig, 'rotate(180deg)');
}
