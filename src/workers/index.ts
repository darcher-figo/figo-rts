import { buildWorkerScript } from './build.worker';

function workerCode() {
  onmessage = async (event: MessageEvent<string>): Promise<void> => {
    if (event.data === 'GET') {
      const data = await fetch('https://dummyjson.com/products?skip=0&limit=100');
      const json = JSON.stringify((await data.json()) as unknown);

      postMessage(json);
    }
  };
}

const worker = buildWorkerScript(workerCode);

export default worker;
