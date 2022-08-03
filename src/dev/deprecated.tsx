import React, {
  ComponentClass,
  ComponentProps,
  ComponentRef,
  ComponentType,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
} from 'react';
import { DevInfo, setDevInfo } from './devInfo';

const _DEV = process.env.NODE_ENV !== 'production';

interface Options extends Omit<DevInfo, 'Orig' | 'type'> {
  /**
   * Whether to use `forwardRef()` for wrapped component
   *
   * When `false` (by default) the result component is just `FC`, so `ref={}`
   * React attribute cannot be used.
   *
   * Setting this property to `true` cause the result to be
   * `ForwardRefExoticComponent`.
   */
  withRef?: boolean;
}
interface OptionsWithRef extends Options {
  /** @inheritDoc */
  withRef: true;
}
interface OptionsWithoutRef extends Options {
  /** @inheritDoc */
  withRef?: false;
}

interface DeprecatedDecorator {
  /**
   * Wrap a component to emit deprecation warning
   *
   * A `getDevInfo()` can be used in development env to get details about
   * deprecation. This can be used on "dev only" internal pages.
   *
   * Does nothing in production env and returns origin component as is.
   *
   * ```tsx
   * function OldComponentOrigin() {
   *   return <div>...</div>;
   * }
   *
   * const OldComponent = deprecated(OldComponentOrigin, {
   *   comment: 'Use `NewComponent` instead.',
   * });
   * ```
   */
  <T extends ComponentClass<any>>(
    Orig: T,
    options: OptionsWithRef,
  ): ComponentType<
    PropsWithoutRef<ComponentProps<T>> & RefAttributes<ComponentRef<T>>
  >;

  /**
   * Wrap a component to emit deprecation warning
   *
   * A `getDevInfo()` can be used in development env to get details about
   * deprecation. This can be used on "dev only" internal pages.
   *
   * Does nothing in production env and returns origin component as is.
   *
   * ```tsx
   * function OldComponentOrigin() {
   *   return <div>...</div>;
   * }
   *
   * const OldComponent = deprecated(OldComponentOrigin, {
   *   comment: 'Use `NewComponent` instead.',
   * });
   * ```
   */
  <P, E>(
    Orig: ForwardRefExoticComponent<P & RefAttributes<E>>,
    options: OptionsWithRef,
  ): ComponentType<P & RefAttributes<E>>;

  /**
   * Wrap a component to emit deprecation warning
   *
   * A `getDevInfo()` can be used in development env to get details about
   * deprecation. This can be used on "dev only" internal pages.
   *
   * Does nothing in production env and returns origin component as is.
   *
   * ```tsx
   * function OldComponentOrigin() {
   *   return <div>...</div>;
   * }
   *
   * const OldComponent = deprecated(OldComponentOrigin, {
   *   comment: 'Use `NewComponent` instead.',
   * });
   * ```
   */
  <T extends ComponentType<any>>(
    Orig: T,
    options?: OptionsWithoutRef,
  ): ComponentType<PropsWithoutRef<ComponentProps<T>>>;
}

/**
 * Wrap a component to emit deprecation warning
 *
 * A `getDevInfo()` can be used in development env to get details about
 * deprecation. This can be used on "dev only" internal pages.
 *
 * Does nothing in production env and returns origin component as is.
 *
 * ```tsx
 * function OldComponentOrigin() {
 *   return <div>...</div>;
 * }
 *
 * const OldComponent = deprecated(OldComponentOrigin, {
 *   comment: 'Use `NewComponent` instead.',
 * });
 * ```
 */
export const deprecated: DeprecatedDecorator = _DEV
  ? <T extends ComponentType<any>>(
      Orig: T,
      { withRef, ...opt }: Options = {},
    ) => {
      function warn() {
        console.warn(
          'Deprecated component',
          Orig.displayName ?? Orig.name,
          Orig,
          'rendered.',
          opt.comment ?? '',
          new Error(),
        );
      }

      let C: ComponentType<ComponentProps<T>>;
      if (withRef) {
        const O: ComponentType<ComponentProps<T> & RefAttributes<any>> = Orig;
        C = forwardRef<any, ComponentProps<T>>((props, ref) => {
          warn();
          return <O {...props} ref={ref} />;
        }) as any;
      } else {
        C = (props: ComponentProps<T>) => {
          warn();
          return <Orig {...props} />;
        };
      }
      C.displayName = `${Orig.displayName ?? Orig.name}.deprecated${
        opt.tag ? `.${opt.tag}` : ''
      }`;
      setDevInfo(C, { ...opt, Orig, type: 'deprecated' });
      return C;
    }
  : <T extends ComponentType<any>>(Orig: T) => Orig;
