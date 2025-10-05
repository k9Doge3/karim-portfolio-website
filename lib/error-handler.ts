import { toast } from "@/hooks/use-toast"

export interface AppError extends Error {
  code?: string
  statusCode?: number
  context?: Record<string, any>
}

export class NetworkError extends Error implements AppError {
  code = "NETWORK_ERROR"
  statusCode: number

  constructor(message: string, statusCode = 500) {
    super(message)
    this.name = "NetworkError"
    this.statusCode = statusCode
  }
}

export class AuthenticationError extends Error implements AppError {
  code = "AUTH_ERROR"
  statusCode = 401

  constructor(message = "Authentication required") {
    super(message)
    this.name = "AuthenticationError"
  }
}

export class ValidationError extends Error implements AppError {
  code = "VALIDATION_ERROR"
  statusCode = 400
  context: Record<string, any>

  constructor(message: string, context: Record<string, any> = {}) {
    super(message)
    this.name = "ValidationError"
    this.context = context
  }
}

export class NotFoundError extends Error implements AppError {
  code = "NOT_FOUND"
  statusCode = 404

  constructor(resource = "Resource") {
    super(`${resource} not found`)
    this.name = "NotFoundError"
  }
}

export function handleError(error: unknown, context?: string): AppError {
  console.error(`[v0] Error in ${context || "unknown context"}:`, error)

  // Check if it's already one of our custom error classes
  if (
    error instanceof NetworkError ||
    error instanceof AuthenticationError ||
    error instanceof ValidationError ||
    error instanceof NotFoundError
  ) {
    return error
  }

  if (error instanceof Error) {
    // Convert common error types
    if (error.message.includes("fetch")) {
      return new NetworkError("Network request failed")
    }

    if (error.message.includes("auth") || error.message.includes("unauthorized")) {
      return new AuthenticationError()
    }

    if (error.message.includes("not found")) {
      return new NotFoundError()
    }

    // Generic error wrapper - create a new Error that implements AppError
    const appError = Object.assign(new Error(error.message), {
      code: "UNKNOWN_ERROR" as const,
      statusCode: 500,
    }) as AppError

    return appError
  }

  // Fallback for non-Error objects
  const fallbackError = Object.assign(new Error("An unexpected error occurred"), {
    code: "UNKNOWN_ERROR" as const,
    statusCode: 500,
  }) as AppError

  return fallbackError
}

export function showErrorToast(error: AppError | Error, customMessage?: string) {
  const message = customMessage || error.message || "An error occurred"

  toast({
    variant: "destructive",
    title: "Error",
    description: message,
  })
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  return "An unexpected error occurred"
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  context?: string,
  showToast = true,
): Promise<T | null> {
  try {
    return await operation()
  } catch (error) {
    const appError = handleError(error, context)

    if (showToast) {
      showErrorToast(appError)
    }

    return null
  }
}

export function createAsyncHandler<T extends any[]>(handler: (...args: T) => Promise<void>, context?: string) {
  return async (...args: T) => {
    try {
      await handler(...args)
    } catch (error) {
      const appError = handleError(error, context)
      showErrorToast(appError)
    }
  }
}

// Retry utility for failed operations
export async function withRetry<T>(operation: () => Promise<T>, maxRetries = 3, delay = 1000): Promise<T> {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Unknown error")

      if (attempt === maxRetries) {
        throw lastError
      }

      console.log(`[v0] Retry attempt ${attempt}/${maxRetries} failed:`, lastError.message)
      await new Promise((resolve) => setTimeout(resolve, delay * attempt))
    }
  }

  throw lastError!
}
