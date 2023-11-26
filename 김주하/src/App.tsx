import { useCallback, useEffect } from 'react';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';

interface AppProps {}

function App({}: AppProps) {
  // OpenAI API 호출
  const fetchOpenApi = useCallback(() => {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY || '', // .env 파일이 있을 경우에만 사용
    });

    const request: CreateCompletionRequest = {
      model: 'text-davinci-003',
      prompt: 'Say this is a test',
      temperature: 0,
      max_tokens: 7,
    };

    new OpenAIApi(configuration)
      .createCompletion(request)
      .then((res) => {
        const { data } = res;

        console.log(data);
      })
      .catch((error) => {
        console.error('OpenAI API 호출 중 오류 발생:', error);
      });
  }, []);

  useEffect(() => {
    fetchOpenApi(); // Mount 시 호출한다.
  }, []);

  return <div className="App">openai</div>;
}

export default App;
