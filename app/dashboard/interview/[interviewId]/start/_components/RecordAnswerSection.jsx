"use client"
import React, { useState, useEffect } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Image from 'next/image';
import Webcam from 'react-webcam';
import { Button } from '@/components/ui/button';

const RecordAnswerSection = () => {
  const [isClient, setIsClient] = useState(false);

  // Ensure the component is running in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    // Log errors for debugging
    if (error) {
      console.error("Speech-to-text error:", error);
    }

    // Log speech results
    console.log("Speech results:", results);
  }, [error, results]);

  // Only render the component if it's on the client side
  if (!isClient) {
    return null;
  }

  return (
    <div className='flex items-center justify-center flex-col '>
      <div className='flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/webcam.svg'} width={200} height={200} className='absolute' />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: '100%', zIndex: 10 }}
        />
      </div>
      <Button variant="outline" className="my-10">Record Answer</Button>

      <h1>Recording: {isRecording.toString()}</h1>
      {error ? (
        <p>Error occurred: {error.message}</p>
      ) : (
        <button onClick={() => isRecording ? stopSpeechToText() : startSpeechToText()}>
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </button>
      )}

      <ul>
        {results.map((result) => (
          <li key={result.timestamp}>{result.transcript}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
  );
};

export default RecordAnswerSection;
