// tests/append-wav-file.test.ts

import fs from 'fs';
import { appendWavFile } from '../src/append-wav-file';
import { getPcmHeader } from '../src/get-pcm-header';
import { AudioPcmParams } from '../src/types';

// Mock fs and getPcmHeader modules
jest.mock('fs');
jest.mock('../src/get-pcm-header');

describe('appendWavFile', () => {
  const mockAudioPcmParams: AudioPcmParams = {
    sampleRate: 44100,
    channels: 2,
    bitsPerSample: 16
  };
  const mockAudioData = Buffer.from('test audio data');
  const mockHeader = Buffer.from('mock header');

  beforeEach(() => {
    jest.clearAllMocks();
    (getPcmHeader as jest.Mock).mockReturnValue(mockHeader);
  });

  it('should create new file if it does not exist', () => {
    // Mock fs.existsSync to return false (file doesn't exist)
    (fs.existsSync as jest.Mock).mockReturnValue(false);
    
    const mockWriteStream = {
      write: jest.fn(),
      end: jest.fn()
    };
    (fs.createWriteStream as jest.Mock).mockReturnValue(mockWriteStream);

    appendWavFile('test.wav', mockAudioData, mockAudioPcmParams);

    expect(fs.createWriteStream).toHaveBeenCalledWith('test.wav');
    expect(mockWriteStream.write).toHaveBeenCalledWith(mockHeader);
    expect(mockWriteStream.write).toHaveBeenCalledWith(mockAudioData);
    expect(mockWriteStream.end).toHaveBeenCalled();
    expect(getPcmHeader).toHaveBeenCalledWith(mockAudioData.length, mockAudioPcmParams);
  });

  it('should update existing file if it exists', () => {
    // Mock fs.existsSync to return true (file exists)
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    
    // Mock file stats
    (fs.statSync as jest.Mock).mockReturnValue({ size: 1044 }); // 44 bytes header + 1000 bytes data
    
    // Mock file descriptor operations
    (fs.openSync as jest.Mock).mockReturnValue(1);
    (fs.writeSync as jest.Mock).mockReturnValue(undefined);
    (fs.appendFileSync as jest.Mock).mockReturnValue(undefined);
    (fs.closeSync as jest.Mock).mockReturnValue(undefined);

    appendWavFile('test.wav', mockAudioData, mockAudioPcmParams);

    expect(fs.openSync).toHaveBeenCalledWith('test.wav', 'r+');
    expect(fs.writeSync).toHaveBeenCalledWith(1, mockHeader, 0, 44, 0);
    expect(fs.appendFileSync).toHaveBeenCalledWith('test.wav', mockAudioData);
    expect(fs.closeSync).toHaveBeenCalledWith(1);
    expect(getPcmHeader).toHaveBeenCalledWith(1000 + mockAudioData.length, mockAudioPcmParams);
  });

  it('should handle file operation errors', () => {
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.statSync as jest.Mock).mockImplementation(() => {
      throw new Error('File access error');
    });

    expect(() => {
      appendWavFile('test.wav', mockAudioData, mockAudioPcmParams);
    }).toThrow('File access error');
  });
});