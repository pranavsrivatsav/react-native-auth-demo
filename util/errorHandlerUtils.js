export function tryCatchWrapperAsync(inputFunction, errorHandler) {
  return async (...args) => {
    try {
      await inputFunction(...args);
    } catch (error) {
      errorHandler(error)
    }
  };
}