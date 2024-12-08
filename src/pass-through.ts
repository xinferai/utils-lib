// src/pass-through.ts

/**
 * Pass through the response body
 * @param response 
 * @param onFinish 
 * @returns Object containing the readable stream and headers
 */
export async function passThrough(
    response: Response, 
    onFinish?: (x: string) => void
): Promise<{ readableStream: ReadableStream, headers: Headers}> {

    if (!response || !response.body) {
        throw new Error('No response or body');
    }

    const headers = new Headers();
    response.headers.forEach((value: string, key: string) => {
      headers.set(key, value);
    });
  
    // solve the content decoding issue with vertexai
    if (headers.has('content-encoding')) {
      headers.delete('content-encoding');
    }

    const reader = response.body.getReader();
  
    const readableStream = new ReadableStream({
      
      async start(controller) {
  
        const chunks: Uint8Array[] = [];
    
        async function pump() {
  
          const { done, value } = await reader.read();
  
          if (done) {
            controller.close();
            if (onFinish) {
              const bodyText = chunks.map(chunk => new TextDecoder().decode(chunk)).join('');
              chunks.length = 0;
              onFinish(bodyText);
            }
            return;
          }
  
          controller.enqueue(value);
  
          if (onFinish) chunks.push(value);
          
          pump();
        }
        
        pump();
      }
    });
    
    return { readableStream, headers };
}