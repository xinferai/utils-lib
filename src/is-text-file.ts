// src/is-text-file.ts

/**
 * check if the given file is a text file
 * @param fileName file name or path
 * @param fileType optional, fileType MIME type of the file
 * @returns true if text file, false otherwise
 */
export function isTextFile(fileName: string, fileType?: string): boolean {
  const textExtensions = [
    '.txt', '.html', '.htm', '.css', '.js', '.ts', '.tsx', '.json',
    '.c', '.cpp', '.cxx', '.cc', '.h', '.hpp', '.py', '.java', '.cs',
    '.xml', '.yaml', '.yml', '.md', '.markdown', '.csv', '.tsv',
    '.sh', '.bat', '.ps1', '.psm1', '.bash', '.zsh', '.fish', '.awk',
    '.php', '.phps', '.phtml', '.rb', '.pl', '.pm', '.cgi', '.jsp', 
    '.jspx', '.asp', '.aspx', '.mdx', '.rmd', '.r', '.rds', '.rda', 
    '.jl', '.m', '.f',
  ];
  if (textExtensions.some(extension => fileName.endsWith(extension))) {
    return true;
  }
  if (!fileType) {
    return false;
  }
  const textFileTypes = [
    'text/',
    'application/json',
    'application/xml',
    'application/javascript',
    'application/ecmascript',
    'application/typescript',
    'application/x-typescript',
    'application/x-javascript',
    'application/x-json',
    'application/x-yaml'
  ];
  return textFileTypes.some(type => fileType.startsWith(type));
};