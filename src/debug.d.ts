declare module 'debug/src/browser.js' {
  const debug: (namespace: string) => (...args: any[]) => void;
  export default debug;
}

declare module 'debug/src/node.js' {
  const debug: (namespace: string) => (...args: any[]) => void;
  export default debug;
}