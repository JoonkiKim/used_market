import { ChangeEvent, useEffect, useState } from "react";
// 항상 useState를 import해와서 써야된다
import { useMutation } from "@apollo/client";

import { Address } from "react-daum-postcode";

import BoardWriteUI from "./BoardWrite.presenter";

import { useRouter } from "next/router";
import { MyDataTransfer, UPDATE_BOARD } from "./BoardWrite.queries";
import {
  IMutation,
  IMutationCreateBoardArgs,
  IMutationUpdateBoardArgs,
  IQuery,
  IUpdateBoardInput,
} from "../../../../commons/types/generated/types";

interface IBoardWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard">;
  isOpen?: boolean;
  // Query함수 통해서 {data} 받아올때의 타입은 코드젠에 있는 내용으로 한다!
}

export default function BoardWrite(props: IBoardWriteProps) {
  const [writer, setWriter] = useState("");
  const [password, setPw] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [writerError, setWriterError] = useState("");
  const [pwError, setPwError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const [myfx] = useMutation<
    Pick<IMutation, "createBoard">,
    IMutationCreateBoardArgs
  >(MyDataTransfer);
  //

  const [updateBoard] = useMutation<
    Pick<IMutation, "updateBoard">,
    IMutationUpdateBoardArgs
  >(UPDATE_BOARD);

  const router = useRouter();

  const [isActive, setIsActive] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [addressData, setAddressData] = useState<Address | undefined>();
  const [addressDataDetail, setAddressDataDetail] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [fileUrls, setfileUrls] = useState(["", "", ""]);

  // container에서 FETCH_BOARD를 통한 data생성을 안하는 이유는 등록하기 페이지에서 이걸 할필요가 없기 때문. 따라서 edit에서 data를 만들어줘서 거기서부터 props로 넘겨준다 (원칙상 container에 만드는게 맞는것 같았지만, 업무는 효율로 하는거다. edit에 있는게 효율적이다)

  // 일단 이렇게 input박스마다 나눠서 함수를 만들어주는게 맞다!

  // event를 매개변수로 쓸때 전부다 ChangeEvent<HTMLInputElement>로 타입 정의해줘야 한다
  function onChangeWriter(event: ChangeEvent<HTMLInputElement>): void {
    setWriter(event.target.value);
    if (event.target.value !== "") {
      setWriterError("");
    }
    if (event.target.value && password && title && content) {
      setIsActive(true);
    }
    // 다시 input박스에 뭐가 입력되면 (빈칸이 아니라면) 에러메시지를 없애준다
  }
  function onChangePw(event: ChangeEvent<HTMLInputElement>) {
    setPw(event.target.value);
    if (event.target.value !== "") {
      setPwError("");
    }
    if (writer && event.target.value && title && content) {
      setIsActive(true);
    }
  }
  function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    if (event.target.value !== "") {
      setTitleError("");
    }
    if (writer && password && event.target.value && content) {
      setIsActive(true);
    }
  }
  // 만약에 textarea태그를 썼으면 ChangeEvent<HTMLTextAreaElement>를 썼어야 함
  function onChangeContent(event: ChangeEvent<HTMLInputElement>) {
    setContent(event.target.value);
    if (event.target.value !== "") {
      setContentError("");
    }
    if (writer && password && title && event.target.value) {
      setIsActive(true);
    }
  }

  function onChangeAddressDetail(event: ChangeEvent<HTMLInputElement>) {
    setAddressDataDetail(event.target.value);
  }

  const onChangeYoutubeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setYoutubeUrl(event.target.value);
  };

  const onToggleModal = () => {
    setIsOpen((prev) => !prev);
  };
  const onToggleAlertModal = () => {
    setIsModalAlertOpen((prev) => !prev);
  };

  const handleComplete = (data: Address) => {
    console.log(data);
    setAddressData(data);
    onToggleModal();
  };

  const onSubmit = async (): Promise<void> => {
    // <거짓에 대하여>
    // 대부분은 참이고, 아래의 것들만 외우면 된다
    // 숫자 0, 빈문자열 "", false, null, undefined, NaN
    // 참<>거짓 바꾸는 기호는 느낌표 !

    if (!writer) {
      setWriterError("작성자가 입력되지 않았습니다!");
    }
    if (!password) {
      setPwError("비밀번호가 입력되지 않았습니다!");
    }
    if (!title) {
      setTitleError("제목이 입력되지 않았습니다!");
    }
    if (!content) {
      setContentError("내용이 입력되지 않았습니다!");
      return;
    }

    if (writer && password && title && content) {
      try {
        const result = await myfx({
          //
          variables: {
            createBoardInput: {
              writer,
              password,
              title,
              contents: content,
              youtubeUrl,
              boardAddress: {
                zipcode: addressData?.zonecode,
                address: addressData?.address,
                addressDetail: addressDataDetail,
              },
              images: [...fileUrls],
              // 배열스테이트에 대한 복사는 [...원본스테이트] 이렇게 한다

              // 왼쪽에 써있는 이름들은 서버에서 정의한대로 써야된다.
              // 그 내용은 플레이그라운드 docs에서 볼 수 있다
              // + 객체에서 키와 값이 동일하게 생겼으면 값이름을 생략할 수 있다 -> short-handproperty
            },
          },
        });
        console.log(result);
        // alert("회원가입이 완료되었습니다!");
        // 전부다 뭐가 입력되어있으면 회원가입 완료 메시지 출력

        if (!result.data) {
          setModalMessage("시스템에 문제가 있습니다");
          onToggleAlertModal();
          return;
        }

        router.push(`/boards/${result.data.createBoard._id}`);
        // pages는 안 써줘도 된다
      } catch (error) {
        if (error instanceof Error) setModalMessage(error.message);
        onToggleAlertModal();
      }
    }
  };

  const onClickUpdate = async () => {
    const currentFiles = JSON.stringify(fileUrls);
    const defaultFiles = JSON.stringify(props.data?.fetchBoard.images);
    const isChangedFiles = currentFiles !== defaultFiles;
    // 기존 이미지 주소랑 새로운 이미지 주소가 다를때만 true를 반환하게

    // 아무것도 수정 안했을때 알러트도 날려주기

    // 아래의 코드를 if else의 형태로 작성하면 else가 많아졌을때 코드 확인이 어려워서 유지보수가 어려움
    // 유지보수의 용이성을 위해 '맞으면 뭘 하고'의 형태가 아니라 '에러부터 걸러내고 다 괜찮으면 뭘 해라'의 형태로 한다 => early-exit 패턴이라고 부름. 에러부터 내보내고 실행한다

    // => 이런 과정을 '리팩토링'이라고 부름 : 결과는 똑같은데 내용이 더 쉬워짐

    if (
      !title &&
      !content &&
      !addressData &&
      !addressDataDetail &&
      !isChangedFiles
    ) {
      // alert("수정한 내용이 없습니다");
      setModalMessage("수정한 내용이 없습니다");
      onToggleAlertModal();

      return;
      // 에러를 내보내고 아래를 실행하면 안되니까 return으로 멈춰준다
    }
    if (!password) {
      // alert("비밀번호를 입력해주세요");
      setModalMessage("비밀번호를 입력해주세요");
      onToggleAlertModal();
      return;
    }

    const updateBoardInput: IUpdateBoardInput = {};
    // password와 boardId는 밑에서 만들어주면 타입이 미리 적용되는 문제를 해결할 수 있다
    if (title) {
      updateBoardInput.title = title;
    }

    if (content) {
      updateBoardInput.contents = content;
    }
    if (youtubeUrl) {
      updateBoardInput.youtubeUrl = youtubeUrl;
    }
    if (addressData || addressDataDetail) {
      updateBoardInput.boardAddress = {};
      if (addressData) {
        updateBoardInput.boardAddress.zipcode = addressData.zonecode;
        updateBoardInput.boardAddress.address = addressData.address;
      }
      if (addressDataDetail) {
        updateBoardInput.boardAddress.addressDetail = addressDataDetail;
      }
    }
    if (isChangedFiles) updateBoardInput.images = fileUrls;

    try {
      // 여기서 updateBoard를 쓰려면 queries에서 updateBoard를 정의해주고 import까지 해서 써야된다

      if (typeof router.query.boardId !== "string") {
        // alert("시스템에 문제가 있습니다");
        setModalMessage("시스템에 문제가 있습니다");
        onToggleAlertModal();
        return;
      }
      const result = await updateBoard({
        variables: {
          password,
          // 위에서 string이 아닌것들을 걸러주었으니까 여기서는 router.query.boardId만 써주면됨
          boardId: router.query.boardId,
          // boardId: String(router.query.boardId),
          // 혹은 이렇게 string으로 감싸주면 해결!
          updateBoardInput,
        },
      });

      if (!result.data) {
        // alert("시스템에 문제가 있습니다");
        setModalMessage("시스템에 문제가 있습니다");
        onToggleAlertModal();
        return;
      }
      router.push(`/boards/${result.data.updateBoard._id}`);
    } catch (error) {
      // error가 Error의 인스턴스이면 Error가 갖고 있는 기능인 message를 사용할 수 있다
      if (error instanceof Error) setModalMessage(error.message);
      onToggleAlertModal();
    }
  };

  const onChangeUrl = (fileUrl: string, index: number) => {
    const newfileUrl = [...fileUrls]; // 배열을 복사하여 새로운 배열 생성
    // 특정 인덱스의 주소를 새로 인자로 받아온 주소로 바꿈
    newfileUrl[index] = fileUrl;
    setfileUrls(newfileUrl);
  };

  // ** 수정하기 페이지에서 이미지 defaultValue하는 법
  // 이렇게 다시 나아중에 그려주기만 하면 된다...! 겁나 편하다
  // 이미 담겨있는 이미지가 있는 상태에서 그게 있는지 확인하고, 있으면 기존 이미지를 그려주고 없으면 멈추고 다른 데이터를 기다린다
  useEffect(() => {
    const images = props.data?.fetchBoard.images;
    if (images !== undefined && images !== null) setfileUrls([...images]);
  }, [props.data]);

  return (
    <BoardWriteUI
      aa={onChangeWriter}
      bb={onChangePw}
      cc={onChangeTitle}
      dd={onChangeContent}
      onSubmit={onSubmit}
      onClickUpdate={onClickUpdate}
      writerError={writerError}
      pwError={pwError}
      titleError={titleError}
      contentError={contentError}
      isActive={isActive}
      isEdit={props.isEdit}
      data={props.data}
      isOpen={isOpen}
      onToggleModal={onToggleModal}
      handleComplete={handleComplete}
      addressData={addressData}
      youtubeUrl={youtubeUrl}
      onChangeYoutubeUrl={onChangeYoutubeUrl}
      onChangeAddressDetail={onChangeAddressDetail}
      // props반환할때 그냥 같은 이름으로 해주면 훨씬 편하다!
      onToggleAlertModal={onToggleAlertModal}
      isModalAlertOpen={isModalAlertOpen}
      modalMessage={modalMessage}
      onChangeUrl={onChangeUrl}
      fileUrls={fileUrls}
    />
  );
}
