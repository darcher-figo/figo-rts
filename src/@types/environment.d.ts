declare namespace NodeJS {
  interface ProcessEnvironment {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
  }
}
