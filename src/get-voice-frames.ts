// src/has-voice.ts

/**
 * Get number of voice frames in an audioData.
 * It works in both Node.js and browser environments
 * @param audioData the audio data
 * @param sampleRate sample rate in Hz
 * @param minEnergy Minimum energy threshold for voice, default 333
 * @param frameSeconds Frame size in seconds, default 20ms frames
 * @returns 
 */
export function getVoiceFrames(
  audioData: Uint8Array | Buffer, 
  sampleRate: number, 
  minEnergy: number = 333, // Minimum energy threshold for voice
  frameSeconds: number = 0.02 // Frame size in seconds, default 20ms frames
): number {

  if (!(audioData instanceof Uint8Array)) {
    audioData = new Uint8Array(audioData);
  }

  const samples = bytesToPcm16(audioData);
  
  // Constants for voice detection
  const frameSize = Math.floor(sampleRate * frameSeconds);
  
  let voiceFrameCount = 0;
  
  // Analyze frames
  for (let start = 0; start < samples.length; start += frameSize) {
    const end = Math.min(start + frameSize, samples.length);
    
    // Calculate frame energy
    let energy = 0;
    for (let i = start; i < end; i++) {
      energy += Math.abs(samples[i]);
    }
    energy /= (end - start);
    //console.log(energy > minEnergy ? '* energy' : '  energy', energy);
    // Count frames that exceed the energy threshold
    if (energy > minEnergy) {
      voiceFrameCount++;
    }
  }
  
  return voiceFrameCount;
}

// Convert byte array to 16-bit PCM samples
function bytesToPcm16(bytes: Uint8Array): Int16Array {
  const samples = new Int16Array(bytes.length / 2);
  for (let i = 0; i < bytes.length; i += 2) {
    // Combine two bytes into one 16-bit sample (little-endian)
    samples[i / 2] = (bytes[i + 1] << 8) | bytes[i];
  }
  return samples;
}