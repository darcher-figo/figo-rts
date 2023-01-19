import { buildWorkerScript } from './build.worker';

function workerCode() {
  globalThis.addEventListener('message', (event: MessageEvent<string>): void => {
    if (event.data === 'GET') {
      fetch('https://dummyjson.com/products?skip=0&limit=100')
        .then((response: Response) => response.json())
        .then((json: unknown) => postMessage(JSON.stringify(json)))
        .catch(console.error);
    }
  });
}

const worker = buildWorkerScript(workerCode);

export default worker;
