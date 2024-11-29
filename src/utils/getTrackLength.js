const getTrackLength = (file) => {
  return new Promise((resolve, reject) => {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();

    const reader = new FileReader();

    reader.onload = () => {
      audioContext.decodeAudioData(
        reader.result,
        (buffer) => {
          // The duration of the audio is given in seconds
          const duration = buffer.duration;
          resolve(duration); // Resolve the promise with the duration
        },
        (err) => {
          reject("Error decoding audio data: " + err); // Reject the promise if there's an error decoding
        }
      );
    };

    reader.onerror = (error) => {
      reject("Error reading file: " + error); // Reject if there's an error reading the file
    };

    reader.readAsArrayBuffer(file); // Read the file as an ArrayBuffer
  });
};

export default getTrackLength;
