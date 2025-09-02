import type { BaseQueryFn } from "@reduxjs/toolkit/query";

export interface CustomQueryArgs<
  Fn extends (...args: any[]) => Promise<Response> = (
    ...args: any[]
  ) => Promise<Response>,
> {
  fn: Fn;
  args?: Parameters<Fn>;
}

/**
 * BaseQuery-адаптер для RTK Query.
 */
export const customBaseQuery = (): BaseQueryFn<
  CustomQueryArgs,
  unknown,
  { status: number; data: string; message?: string }
> => {
  return async ({ fn, args }) => {
    return fn(...(args || []))
      .then(async (data: Response) => ({ data: await data.json() }))
      .catch(async (e: Response) => ({ error: await e.json() }));
  };
};
