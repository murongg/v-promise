import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'

export interface PromiseReturn<T, U = Error> {
  data: Ref<T>
  loading: Ref<boolean>
  promise: (...args: any[]) => Promise<T>
  error: Ref<U>
}

export interface Options {
  immediate?: boolean
}

export type PromiseFunction<T> = (...args: any[]) => Promise<T>
export type UsePromise<R = false> = <T, U = Error>(p: PromiseFunction<T>, options?: Options, ...args: any[]) => UsePromiseReturn<T, U, R>
export type UsePromiseReturn<T, U = Error, R = false> = R extends true ? Promise<PromiseReturn<T, U>> : PromiseReturn<T, U>

/**
 *
 * @param p function return promise
 * @param options
 * @param args pass to `p` arguments
 * @returns return `PromiseReturn`
 */

export const usePromise: UsePromise = (p, options, ...args) => {
  const loading = ref(false)
  const data = ref()
  const error = ref()
  function promise(...args: any[]) {
    loading.value = true
    return p(...args).then((res) => {
      data.value = res
      return res
    }).catch((err) => {
      error.value = err
      return err
    }).finally(() => {
      loading.value = false
    })
  }

  if (options?.immediate)
    promise(...args)

  return {
    loading,
    data,
    promise,
    error,
  }
}

/**
 *
 * @param p function return promise
 * @param options
 * @param args pass to `p` arguments
 * @returns return promise with `PromiseReturn`
 */

export const useAwaitPromise: UsePromise<true> = (p, options, ...args) => {
  const { promise, loading, data, error } = usePromise(p, {
    ...options,
    immediate: false,
  }, args)
  return promise(...args).then((): any => {
    return {
      promise,
      loading,
      data,
      error,
    }
  })
}
