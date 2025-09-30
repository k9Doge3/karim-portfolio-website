"use client"

import { useState, useCallback } from "react"
import { handleError, showErrorToast, type AppError } from "@/lib/error-handler"

interface AsyncState<T> {
  data: T | null
  loading: boolean
  error: AppError | null
}

interface UseAsyncOptions {
  showErrorToast?: boolean
  initialData?: any
}

export function useAsync<T>(asyncFunction: () => Promise<T>, options: UseAsyncOptions = {}) {
  const { showErrorToast: showToast = true, initialData = null } = options

  const [state, setState] = useState<AsyncState<T>>({
    data: initialData,
    loading: false,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const data = await asyncFunction()
      setState({ data, loading: false, error: null })
      return data
    } catch (error) {
      const appError = handleError(error, "useAsync")
      setState((prev) => ({ ...prev, loading: false, error: appError }))

      if (showToast) {
        showErrorToast(appError)
      }

      throw appError
    }
  }, [asyncFunction, showToast])

  const reset = useCallback(() => {
    setState({ data: initialData, loading: false, error: null })
  }, [initialData])

  return {
    ...state,
    execute,
    reset,
  }
}

export function useAsyncCallback<T extends any[], R>(
  asyncFunction: (...args: T) => Promise<R>,
  options: UseAsyncOptions = {},
) {
  const { showErrorToast: showToast = true } = options

  const [state, setState] = useState<AsyncState<R>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async (...args: T) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await asyncFunction(...args)
        setState({ data, loading: false, error: null })
        return data
      } catch (error) {
        const appError = handleError(error, "useAsyncCallback")
        setState((prev) => ({ ...prev, loading: false, error: appError }))

        if (showToast) {
          showErrorToast(appError)
        }

        throw appError
      }
    },
    [asyncFunction, showToast],
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}
