import { screen } from '@testing-library/react';
import React from 'react';

import { pageRoutes } from '@/apiRoutes';
import EmptyNotice from '@/pages/cart/components/EmptyNotice';
import render from '@/utils/test/render';

// NOTE: 실제 모듈을 모킹한 모듈로 대체하여 테스트 실행
// NOTE: useNavigate 함수를 모킹하여 navigate 함수를 호출하는지 확인 -> 호출 여부만 테스트 단계에서 판단하면 되기 때문에 스파이 함수로 모킹
const navigationFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom'); // NOTE: 실제 모듈에서 일부만 재정의하기 위한 함수
  return { ...original, useNavigate: () => navigationFn }; // NOTE: useNavigate 함수를 navigationFn으로 대체
});

it('"홈으로 가기" 링크를 클릭할경우 "/"경로로 navigate함수가 호출된다', async () => {
  const { user } = await render(<EmptyNotice />);

  await user.click(screen.getByRole('link', { name: '홈으로 가기' }));
  expect(navigationFn).toHaveBeenCalledWith(pageRoutes.main);
});
