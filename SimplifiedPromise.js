class SimplifiedPromise {
  constructor(executor) {
    this._state = 'pending';
    this._value = undefined;
    this._onFulfilled = [];
    this._onRejected = [];

    const resolve = (value) => {
      if (this._state !== 'pending') return;
      this._state = 'fulfilled';
      this._value = value;
      this._onFulfilled.forEach((callback) => callback(value));
    };

    const reject = (reason) => {
      if (this._state !== 'pending') return;
      this._state = 'rejected';
      this._value = reason;
      this._onRejected.forEach((callback) => callback(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  static all(promises) {
    return new SimplifiedPromise((resolve, reject) => {
      let results = [];
      let remaining = promises.length;

      promises.forEach((promise, index) => {
        promise.then((value) => {
          results[index] = value;
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        }).catch(reject);
      });
    });
  }
}

SimplifiedPromise.prototype.then = function(onFulfilled, onRejected) {
  return new SimplifiedPromise((resolve, reject) => {
    const handleFulfilled = (value) => {
      try {
        const result = onFulfilled ? onFulfilled(value) : value;
        if (result instanceof SimplifiedPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    };

    const handleRejected = (reason) => {
      try {
        const result = onRejected ? onRejected(reason) : reason;
        if (result instanceof SimplifiedPromise) {
          result.then(resolve, reject);
        } else {
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    };

    if (this._state === 'pending') {
      this._onFulfilled.push(handleFulfilled);
      this._onRejected.push(handleRejected);
    } else if (this._state === 'fulfilled') {
      handleFulfilled(this._value);
    } else if (this._state === 'rejected') {
      handleRejected(this._value);
    }
  });
};

SimplifiedPromise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected);
};

SimplifiedPromise.prototype.finally = function(onFinally) {
  return new SimplifiedPromise((resolve, reject) => {
    const handleFinally = () => {
      try {
        onFinally();
        if (this._state === 'fulfilled') {
          resolve(this._value);
        } else if (this._state === 'rejected') {
          reject(this._value);
        }
      } catch (error) {
        reject(error);
      }
    };

    if (this._state === 'pending') {
      this._onFulfilled.push(handleFinally);
      this._onRejected.push(handleFinally);
    } else {
      handleFinally();
    }
  });
};

// Example usage:
const promise = new SimplifiedPromise((resolve, reject) => {
  setTimeout(() => {
    resolve('Hello, World!');
  }, 1000);
});

promise
  .then((value) => {
    console.log(value); // "Hello, World!"
    return new SimplifiedPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('Next value');
      }, 1000);
    });
  })
  .then((value) => {
    console.log(value); // "Next value"
    return new SimplifiedPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('Final value');
      }, 1000);
    });
  })
  .then((value) => {
    console.log(value); // "Final value"
  })
  .catch((error) => {
    console.error(error);
  })
  .finally(() => {
    console.log('Done');
  });