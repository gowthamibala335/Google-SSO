import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SpeechToText = () => {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    console.log("Transcript updated:", transcript);
  }, [transcript]);
  const startListening = () => {
    SpeechRecognition.startListening({ continuous: true });
    console.log("Started listening");
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
    console.log("Stopped listening");
  };

  return (
    <div>
      <h1>Speech to Text</h1>
      <div>
        <button onClick={startListening} disabled={listening}>Start Listening</button>
        <button onClick={stopListening} disabled={!listening}>Stop Listening</button>
        <button onClick={resetTranscript}>Reset</button>
      </div>
      <div>
        <h2>Transcription:</h2>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
