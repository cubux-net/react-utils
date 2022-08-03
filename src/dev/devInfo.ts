import { ComponentType } from 'react';

export interface DevInfo {
  type: string;
  tag?: string;
  Orig?: ComponentType<any>;
  comment?: string;
}

let devInfo: WeakMap<ComponentType<any>, DevInfo>;
const _DEV = process.env.NODE_ENV !== 'production';
if (_DEV) {
  devInfo = new WeakMap();
}

export function setDevInfo<T extends DevInfo>(
  subject: ComponentType<any>,
  info: T,
) {
  if (_DEV) {
    devInfo!.set(subject, info);
  }
}

export function getDevInfo<T extends DevInfo = DevInfo>(
  subject: ComponentType<any>,
): T | undefined {
  if (_DEV) {
    return devInfo!.get(subject) as T | undefined;
  }
}
