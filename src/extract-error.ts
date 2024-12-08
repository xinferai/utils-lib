// src/extract-error.ts

/**
 * Extract the error message from an Error object
 * @param error error object
 * @returns error message
 */
export function extractError(error: Error): string {
  let message = error.message;
  if (error.cause && (error.cause as { message: string }).message) {
    message += ', ' + (error.cause as { message: string }).message;
  }
  if (!message) {
    message = error.toString();
  }
  return message;
}