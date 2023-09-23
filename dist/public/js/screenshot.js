import './jquery-3.7.0.min.js'

const request = (type, url, data) => new Promise((resolve, reject) => {
  $.ajax({
    type,
    url,
    data,
    success: e => resolve(e),
    error: e => reject(e)
  })
});
async function asyncInterval(callback, interval) {
  let running = true;

  while (running) {
    const startTime = Date.now();
    let timeoutId;

    const promise = new Promise((resolve) => {
      timeoutId = setTimeout(() => {
        resolve(callback());
      }, interval);
    });

    try {
      await promise;
      clearTimeout(timeoutId);
    } catch (error) {
      clearTimeout(timeoutId);
    }

    const endTime = Date.now();
    const elapsedTime = endTime - startTime;

    if (elapsedTime < interval) {
      await new Promise((resolve) => setTimeout(resolve, interval - elapsedTime));
    }
  }
}

const print = async () => {
  const base64 = await request('GET', '/img-screenshot');

  document.body.innerHTML = `<img src="data:image/png;base64,${base64}">`
}

print().then(() => {
  asyncInterval(async () => {
    await print();
  }, .5 * 1000)
});