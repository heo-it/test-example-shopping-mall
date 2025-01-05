import { useState } from 'react';

// NOTE: 테스트 목록
// - 호출 시 initialValue를 지정하지 않는 경우 isModalOpened 상태가 false로 설정된다.
// - 호출 시 initialValue를 지정하는 경우 isModalOpened 상태가 해당 값으로 설정된다.
// - toggleIsModalOpened 함수를 호출하면 isModalOpened 상태를 반전시킨다.
const useConfirmModal = (initialValue = false) => {
  const [isModalOpened, setIsModalOpened] = useState(initialValue);

  const toggleIsModalOpened = () => {
    setIsModalOpened(!isModalOpened);
  };

  return {
    toggleIsModalOpened,
    isModalOpened,
  };
};

export default useConfirmModal;
