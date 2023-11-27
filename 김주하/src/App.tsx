import React, { useState, ReactElement } from "react";
import { CallGPT } from "./api/gpt";
import DiaryInput from "./components/DiaryInput";
import styled from "styled-components";
import DiaryDisplay from "./components/DiaryDisplay";
import { message } from "antd";
import logo from "./assets/logo.png";

// dummyData의 타입 정의
const dummyData: DiaryData = {
  title: "",
  thumbnail: "",
  summary: "",
  emotional_content: "",
  emotional_result: "",
  analysis: "",
  action_list: [],
};

// 타입 정의
interface DiaryData {
  title: string;
  thumbnail: string;
  summary: string;
  emotional_content: string;
  emotional_result: string;
  analysis: string;
  action_list: string[];
}

function App(): ReactElement {
  // 타입 적용
  const [data, setData] = useState<DiaryData>(dummyData);
  const [isLoading, setIsLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickAPICall = async (userInput: string) => {
    try {
      setIsLoading(true);
      // 타입 적용
      const response = (await CallGPT({ prompt: `${userInput}` })) as DiaryData;
      setData(response);
    } catch (error) {
      messageApi.error({
        content: (error as Error).message, // 'message' 프로퍼티 사용
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput: string) => {
    handleClickAPICall(userInput);
  };

  return (
    <AppContainer>
      {contextHolder}
      <AppTitle>
        일기 with GPT <img width={"100px"} src={logo} alt="logo"></img>
      </AppTitle>
      <DiaryInput
        messageApi={messageApi}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
      <div id="capture">
        <DiaryDisplay isLoading={isLoading} data={data} />
      </div>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
`;

const AppTitle = styled.div`
  width: 100%;
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  font-family: "Noto Serif KR";
`;
