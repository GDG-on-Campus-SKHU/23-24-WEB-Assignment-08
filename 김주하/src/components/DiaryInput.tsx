import { Input, Button, message } from "antd";
import { useState } from "react";
import { Title } from "./CommonStyles";
import styled from "styled-components";
import { FileImageOutlined } from "@ant-design/icons";
import html2canvas from "html2canvas";

const { TextArea } = Input;

interface DiaryInputProps {
  isLoading: boolean;
  onSubmit: (input: string) => void;
  messageApi: {
    open: (config: { type: string; content: string }) => void;
  };
}

const DiaryInput: React.FC<DiaryInputProps> = ({ isLoading, onSubmit, messageApi }) => {
  const [userInput, setUserInput] = useState<string>("");

  const handleUserInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    if (!userInput) {
      messageApi.open({
        type: "error",
        content: "일과를 적어주세요.",
      });
      return;
    }
    messageApi.open({
      type: "success",
      content: "생성 요청 완료",
    });
    onSubmit(userInput);
    setUserInput(""); // 값을 초기화하도록 수정
  };

  const captureAndDownload = async () => {
    const nodeToCapture = document.getElementById("capture") as HTMLElement | null;

    if (nodeToCapture) {
      html2canvas(nodeToCapture, {
        allowTaint: true,
        useCORS: true,
      }).then(function (canvas) {
        const image = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = image;
        a.download = "gpt-diary-result.png";
        a.click();
      });
    }
  };

  return (
    <div>
      <Title>오늘의 일기</Title>
      <TextArea
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘 일어난 일들을 간단히 적어주세요."
        style={{ height: "200px" }}
      />
      <ButtonContainer>
        <Button loading={isLoading} onClick={handleClick}>
          오늘 하루 분석하기
        </Button>
        <Button
          icon={<FileImageOutlined />}
          loading={isLoading}
          onClick={captureAndDownload}
        >
          저장
        </Button>
      </ButtonContainer>
      <canvas id="canvas" style={{ display: "none" }}></canvas>
    </div>
  );
};

export default DiaryInput;

const ButtonContainer = styled.div`
  margin: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 5px;
`;
