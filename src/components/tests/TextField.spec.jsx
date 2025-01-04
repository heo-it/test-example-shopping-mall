import { screen } from '@testing-library/react';
import React from 'react';

import TextField from '@/components/TextField';
import render from '@/utils/test/render';

it('className props에 따라 css class가 변경된다.', async () => {
  render(<TextField className="product-name" />);

  const textInput = screen.getByRole('input');

  expect(textInput).toHaveClass('product-name');
});

it('placeholder props에 따라 placeholder가 변경된다.', async () => {
  render(<TextField placeholder="상품명을 입력해주세요." />);

  const textInput = screen.getByPlaceholderText('상품명을 입력해주세요.');

  expect(textInput).toBeInTheDocument();
});

/** NOTE - 스파이 함수
 * 테스트 함수에서 특정 함수가 호출 되었는지, 함수의 인자로 어떤 값이 전달 되었는지 등을 확인할 수 있는 함수
 */
it('텍스트를 입력할 때마다 onChange 핸들러가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onChange={spy} />);

  const textInput = screen.getByRole('input');

  await user.type(textInput, '상품명');

  expect(spy).toHaveBeenCalledWith('상품명');
});

it('엔터키를 입력하면 onEnter 핸들러가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onEnter={spy} />);

  const textInput = screen.getByRole('input');

  await user.type(textInput, '상품명{Enter}');

  expect(spy).toHaveBeenCalledWith('상품명');
});

it('포커스가 활성화 되면 onFocus 핸들러가 호출된다.', async () => {
  const spy = vi.fn();
  const { user } = await render(<TextField onFocus={spy} />);

  const textInput = screen.getByRole('input');

  await user.click(textInput);

  expect(spy).toHaveBeenCalled();
});

it('포커스가 활성화 되면 border 스타일이 활성화 된다.', async () => {
  const { user } = await render(<TextField />);

  const textInput = screen.getByRole('input');

  await user.click(textInput);

  expect(textInput).toHaveStyle({
    borderWidth: '2px',
    borderColor: 'rgb(25, 118, 210)',
  });
});
