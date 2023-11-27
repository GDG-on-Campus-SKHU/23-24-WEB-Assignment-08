import React from "react";
import { useParams } from "react-router-dom";
import { Cultural } from "../App";
import "./detail.css";

interface DetailProps {
  culturalList: Cultural[];
}

const Detail: React.FC<DetailProps> = ({ culturalList }) => {
  const { title } = useParams<{ title?: string }>();
  const decodedTitle = title ? decodeURIComponent(title) : "";
  const cultural = culturalList.find(
    (item) => item.imgList[0]?.imgUrl === decodedTitle
  );

  if (!cultural) {
    return <div>Not found</div>;
  }
  return (
    <div className="detail">
      <h3>{cultural.title}</h3>
      <p>카테고리 : {cultural.category}</p>
      <p>공공누리 유형 : {cultural.publicType}</p>
      <p>등록일자 : {cultural.regYmd}</p>
      <p>소유자명 : {cultural.ownrNm}</p>
      <p>기관명 : {cultural.instNm}</p>
      <p>기관전화번호 : {cultural.instTelno}</p>

      <img
        className="img-list"
        src={cultural.imgList[0]?.imgUrl}
        alt={`Cultural ${decodedTitle}`}
      />
    </div>
  );
};

export default Detail;
