import { CSSProperties, FC, SVGProps } from 'react';

export type SvgFC = FC<SVGProps<SVGSVGElement>>;
export type CssTransform = NonNullable<CSSProperties['transform']>;
export type CalcTransform = (prev: CssTransform | undefined) => CssTransform;
