import type { Ref } from 'vue-demi'
import { ref } from 'vue-demi'

export interface PromiseReturn<T, U = Error> {
  data: Ref<T>
  loading: Ref<boolean>
  promise: () => Promise<T>
  error: Ref<U>
}

export interface Options {
  immediate?: boolean
}

/**
 *
 * @param p function return promise
 * @param options
 * @param args pass to `p` arguments
 * @returns return `PromiseReturn`
 */
export function usePromise<T, U = Error>(p: (...args: any[]) => Promise<T>, options?: Options, ...args: any[]): PromiseReturn<T, U> {
  const loading = ref(false)
  const data = ref()
  const error = ref()
  function promise() {
    // eslint-disable-next-line prefer-rest-params
    const params = arguments.length > 0 ? [...arguments] : [...args]
    loading.value = true
    return p(...params).then<T>((res: T) => {
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
    promise()

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
export function useAwaitPromise<T, U = Error>(p: (...args: any[]) => Promise<T>, options?: Options, ...args: any[]): Promise<PromiseReturn<T, U>> {
  const { promise, loading, data, error } = usePromise(p, {
    ...options,
    immediate: false,
  }, args)
  return promise().then<PromiseReturn<T, U>>((): any => {
    return {
      promise,
      loading,
      data,
      error,
    }
  })
}
