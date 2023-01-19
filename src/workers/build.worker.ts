export const buildWorkerScript = (workerCode: () => void): string => {
  const code = workerCode.toString();
  const init = code.indexOf('{') + 1;
  const last = code.lastIndexOf('}');
  const data = code.slice(init, last);
  const blob = new Blob([data], { type: 'application/javascript' });
  return URL.createObjectURL(blob);
};
