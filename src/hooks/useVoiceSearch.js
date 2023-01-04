import {useEffect, useState} from 'react';
// import Voice from '@react-native-community/voice';

export const useVoiceSearch = () => {
  const [result, setResult] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Voice.onSpeechStart = onSpeechStartHandler;
    // Voice.onSpeechEnd = onSpeechEndHandler;
    // Voice.onSpeechResults = onSpeechResultsHandler;
    // return () => {
    //     Voice.destroy().then(Voice.removeAllListeners);
    // }
  }, []);

  const onSpeechStartHandler = e => {
    console.log('start handler ===>: ', e);
  };
  const onSpeechEndHandler = e => {
    setVisible(false);
    console.log('end handler ===>: ', e);
  };
  const onSpeechResultsHandler = e => {
    let text = e.value[0];
    setResult(text);
    console.log('result handler ===>: ', e);
  };

  const startVoiceSearch = async () => {
    setVisible(true);
    try {
      // await Voice.start('en-Us')
    } catch (error) {
      console.log('error raised', error);
    }
  };

  return {
    result,
    setResult,
    visible,
    setVisible,
    startVoiceSearch,
    onSpeechResultsHandler,
    onSpeechEndHandler,
    onSpeechStartHandler,
  };
};
