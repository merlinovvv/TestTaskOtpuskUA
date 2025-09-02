import type { BaseQueryFn } from "@reduxjs/toolkit/query";

// Тип для query, чтобы можно было передавать любую функцию из api.js + её аргументы
export interface CustomQueryArgs<
  Fn extends (...args: any[]) => Promise<Response> = (
    ...args: any[]
  ) => Promise<Response>,
> {
  fn: Fn;
  args?: Parameters<Fn>;
}

/**
 * BaseQuery-адаптер для RTK Query, чтобы дёргать мок-методы как endpoint.
 * Оборачивает Response → JSON через toJson и нормализует ошибки.
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
