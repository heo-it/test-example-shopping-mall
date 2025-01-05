import { screen } from '@testing-library/react';
import React from 'react';

import ErrorPage from '@/pages/error/components/ErrorPage';
import render from '@/utils/test/render';

const navigationFn = vi.fn();

vi.mock('react-router-dom', async () => {
  const original = await vi.importActual('react-router-dom');
  return { ...original, useNavigate: () => navigationFn };
});

it('"뒤로 이동" 버튼 클릭시 뒤로 이동하는 navigate(-1) 함수가 호출된다', async () => {
  const { user } = await render(<ErrorPage />);

  const button = screen.getByRole('button', { name: '뒤로 이동' });
  await user.click(button);

  expect(navigationFn).toHaveBeenNthCalledWith(1, -1);
});
