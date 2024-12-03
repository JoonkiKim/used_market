import styled from "@emotion/styled";
import { Modal } from "antd";

interface IPropsActive {
  isActive?: Boolean;
}

export const MarketWrapper = styled.div`
  box-sizing: border-box;
  width: 1200px;
  border: 1px solid white;
  box-shadow: 7px 7px 39px #bdbdbd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 200px;
`;

export const Title = styled.h3`
  font-size: 36px;
  margin-bottom: 80px;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TopLineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  /* background-color: red; */
  width: 996px;
  justify-content: space-between;
`;

export const InputTxtWrapper = styled.div`
  width: 996px;
  margin-bottom: 50px;
  /* background-color: blue; */
`;

export const InputTxtCaption = styled.div`
  width: 996px;
  font-weight: 500;
  margin-bottom: 10px;
`;

export const InputTxtInput = styled.input`
  width: 996px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const InputNumberInput = styled.input`
  width: 996px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none; /* Chrome, Safari에서 스핀 버튼 제거 */
    margin: 0;
  }
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const PwWrapper = styled.div`
  width: 486px;
  padding-bottom: 50px;
`;

export const PwCaption = styled.div`
  width: 996px;
  font-weight: 500;
  padding-bottom: 10px;
`;

export const PwInput = styled.input`
  width: 486px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const TitleInputWrapper = styled.div`
  width: 996px;
  padding-bottom: 50px;
`;

export const TitleCaption = styled.div`
  width: 996px;
  font-weight: 500;
  padding-bottom: 10px;
`;

export const TitleInput = styled.input`
  width: 996px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const ContentInputWrapper = styled.div`
  width: 996px;
  padding-bottom: 15px;
`;

export const ContentCaption = styled.div`
  width: 996px;
  font-weight: 500;
  padding-bottom: 10px;
`;

export const ContentInput = styled.input`
  width: 996px;
  height: 480px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  color: #bdbdbd;

  /* padding: 14px; */
  font-size: 16px;
  font-weight: 400;

  // Q. 내용을 작성해주세요 가 좌상단 고정되는걸 모르겠음
  // textarea태그를 사용하면 알아서 됨
`;

export const AdressWrapper = styled.div`
  width: 450px;
`;

export const AdressCaption = styled.div`
  width: 450px;
  font-weight: 500;
  padding-bottom: 10px;
`;

export const PostCodeInput = styled.input`
  width: 77px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;

  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */
    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const FirstLineWrapper = styled.div`
  width: 220px;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 20px;
`;

export const PostSearchButton = styled.button`
  background-color: black;
  width: 124px;
  height: 55px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  color: white;
  font-size: 16px;
  // Q. 버튼 정렬하는 방식 찾아보기
`;

export const AdressInputWrapper = styled.div`
  width: 450px;
  padding-bottom: 20px;
`;

export const AdressInput = styled.input`
  width: 450px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  padding-bottom: 20px;
`;

export const MapWrapper = styled.div`
  width: 450px;
`;

export const LocationWrapper = styled.div`
  width: 996px;
  /* background-color: green; */

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const YoutubeInputWrapper = styled.div`
  width: 996px;
  padding-bottom: 50px;
  padding-top: 20px;
`;

export const YoutubeCaption = styled.div`
  width: 996px;
  font-weight: 500;
  padding-bottom: 10px;
`;

export const YoutubeInput = styled.input`
  width: 996px;
  height: 52px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  &::placeholder {
    color: #bdbdbd; /* 원하는 색상으로 변경 */

    font-size: 16px; /* 원하는 크기로 변경 */
    padding-left: 5px;
  }
`;

export const PictureInputWrapper = styled.div`
  width: 996px;
  /* background-color: blue; */
  margin-bottom: 20px;
`;

export const PictureCaption = styled.div`
  width: 996px;
  font-weight: 500;
  padding-bottom: 20px;
`;

export const ButtonWrapper = styled.div`
  width: 300px;
  /* background-color: red; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PictureSquare = styled.div`
  background-color: gray;
  width: 78px;
  height: 78px;
  border-radius: 0;
  border: 1px solid #bdbdbd;
  color: #4f4f4f;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.div`
  font-size: 15px;
  padding-bottom: 5px;
  font-weight: 500;
`;

export const MainSettingWrapper = styled.div`
  width: 996px;
  margin-bottom: 100px;
`;

export const MainSettingCaption = styled.div`
  width: 996px;
  font-weight: 500;
  margin-bottom: 20px;
`;

export const MsButtonWrapper = styled.div`
  width: 996px;
  display: flex;
  flex-direction: row;
`;

export const MsWrapper = styled.div`
  width: 100px;

  display: flex;
  flex-direction: row;
  /* justify-content: space-around; */
  align-items: center;
  padding-top: 3px;
  font-size: 16px;
  font-weight: 500;
`;

export const MainSettingInput = styled.input`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

export const RegisterButton = styled.button`
  width: 179px;
  height: 52px;
  background-color: ${(props: IPropsActive) =>
    props.isActive ? "yellow" : ""};
  border-radius: 0;
  border: 0px;
  color: black;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 100px;
`;

export const ErMes = styled.div`
  color: red;
  font-size: 16px;
`;

export const ModalAlert = styled(Modal)``;

export const ImageWrapper = styled.div`
  display: flex;
  flex: row;
  /* background-color: blue; */
`;