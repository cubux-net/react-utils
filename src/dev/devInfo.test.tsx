import { FC } from 'react';
import { DevInfo, getDevInfo, setDevInfo } from './devInfo';

it('dev info', () => {
  const Num: FC<{ x: number }> = ({ x }) => <code>{x}</code>;
  const DoubleNum: FC<{ x: number }> = ({ x }) => <Num x={x * 2} />;

  const info: DevInfo = {
    Orig: Num,
    type: 'math',
    tag: '*2',
  };

  expect(getDevInfo(DoubleNum)).toBeUndefined();
  setDevInfo(DoubleNum, info);
  expect(getDevInfo(DoubleNum)).toBe(info);
});
