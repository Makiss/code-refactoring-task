function ifElse(condition, onTrue, onFalse) {
  return condition ? onTrue() : onFalse();
}

function when(condition, onTrue) {
  if (condition) {
    return onTrue();
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

export { ifElse, when, withTryCatch };
