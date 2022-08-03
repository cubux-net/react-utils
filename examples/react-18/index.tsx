// import 'react-app-polyfill/stable';
import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { svgRot90L } from '@cubux/react-utils';
import { SvgFC, svgRot90R } from '@cubux/react-utils/svg';

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

const IconR1: SvgFC = svgRot90R(SvgIcon);
const IconL1: SvgFC = svgRot90L(SvgIcon);

const App: FC = () => {
  return (
    <div>
      <h1>Foo bar</h1>
      <div>
        <IconL1 />
        <SvgIcon />
        <IconR1 />
      </div>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
