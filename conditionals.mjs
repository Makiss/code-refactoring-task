function when(condition, callback) {
  if (condition) {
    callback();
  }
}

function withTryCatch(tryFn, catchFn) {
  return function (...args) {
    try {
      return tryFn(...args);
    } catch (e) {
      catchFn(e);
    }
  };
}

export { when, withTryCatch };
