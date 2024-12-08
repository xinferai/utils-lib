// src/read-raw.ts

/**
 * Read the response body and headers
 * @param response 
 * @param readLines 
 * @returns Object containing the body text and headers
 */
export async function readRaw(
    response: Response, 
    readLines?: (x: string[], y: string) => void,
): Promise<{ bodyText: string, headers: any}> {

    if (!response || !response.body) {
        throw new Error('No response or body');
    }

    const headers: any = {};
    response.headers.forEach((value: string, key: string) => {
      headers[key] = value;
    });
  
    let bodyText = '';

    const reader = response.body.getReader();
  
    let lastLine = '';

    while (true) {
      const { done, value } = await reader.read();
      
      if (done) {
        break;
      }
      
      const text = new TextDecoder().decode(value);
      
      bodyText += text;

      const lines = (lastLine + text).split('\n');
      lastLine = lines.pop() || '';
      
      if (readLines) readLines(lines, lastLine);
    }

    return { bodyText, headers };
}