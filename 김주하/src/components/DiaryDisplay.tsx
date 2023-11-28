import React from "react";
import {
  DiaryContainer,
  ResultTitle,
  Divider,
  CardContainer,
  CardTitle,
  CardContent,
  ActionListItem,
} from "./CommonStyles";
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
  MessageTwoTone,
  SoundTwoTone,
} from "@ant-design/icons";
import { Image } from "antd";
import styled from "styled-components";

interface DiaryDisplayProps {
  data: {
    title: string;
    summary: string;
    thumbnail: string;
    emotional_content: string;
    emotional_result: string;
    analysis: string;
    action_list: string[];
  };
  isLoading: boolean;
}

const ThumbnailImage = styled(Image)`
  max-width: 100%;
  border-radius: 8px;
  margin-bottom: 15px;
`;

const DiaryDisplay: React.FC<DiaryDisplayProps> = ({ data, isLoading }) => {
  return (
    <DiaryContainer>
      {isLoading && (
        <>
          불러오는중...
          <LoadingOutlined />
        </>
      )}
      <ResultTitle>{data.title}</ResultTitle>
      <Divider />
      <CardContainer>
        <CardTitle>
          <CheckCircleTwoTone
            twoToneColor="#52c41a"
            style={{ marginRight: "6px" }}
          />
          요약
        </CardTitle>
        <CardContent>{data.summary}</CardContent>
      </CardContainer>
      <ThumbnailImage src={data.thumbnail} alt="Thumbnail" />
      <Divider />
      <CardContainer>
        <CardTitle>
          <HeartTwoTone twoToneColor="#eb2f96" style={{ marginRight: "6px" }} />
           오늘의 일기
        </CardTitle>
        <CardContent>{data.emotional_content}</CardContent>
      </CardContainer>
      <Divider />
      <CardContainer>
        <CardTitle>
          <SmileTwoTone twoToneColor="#faad14" style={{ marginRight: "6px" }}/>
          내가 느낀 감정
        </CardTitle>
        <CardContent>{data.emotional_result}</CardContent>
      </CardContainer>
      <Divider />
      <CardContainer>
        <CardTitle>
          <MessageTwoTone
            twoToneColor="#1890ff"
            style={{ marginRight: "6px" }}
          />
          심리 분석
        </CardTitle>
        <CardContent>{data.analysis}</CardContent>
      </CardContainer>
      <Divider />
      <CardContainer>
        <CardTitle>
          <SoundTwoTone twoToneColor="#1890ff" style={{ marginRight: "6px" }}/>
          GPT 조언
        </CardTitle>
        <CardContent>
          {data.action_list.map((action, index) => (
            <ActionListItem key={index}>{action}</ActionListItem>
          ))}
        </CardContent>
      </CardContainer>
    </DiaryContainer>
  );
};

export default DiaryDisplay;
