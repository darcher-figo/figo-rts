declare module 'comlink-loader!*' {
  class WebpackWorker extends Worker {
    constructor();
    processData(data: unknown): Promise<unknown>;
  }

  export = WebpackWorker;
}
