import { pick, debounce } from './common';

describe('pick util 단위테스트', () => {
  it('단일 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a')).toEqual({ a: 'A' });
  });

  it('2개 이상의 인자로 전달된 키의 값을 객체에 담아 반환한다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj, 'a', 'b')).toEqual({ a: 'A', b: { c: 'C' } });
  });

  it('대상 객체로 아무 것도 전달 하지 않을 경우 빈 객체가 반환된다', () => {
    expect(pick()).toEqual({});
  });

  it('propNames를 지정하지 않을 경우 빈 객체가 반환된다', () => {
    const obj = {
      a: 'A',
      b: { c: 'C' },
      d: null,
    };

    expect(pick(obj)).toEqual({});
  });
});

describe('debounce util 단위 테스트', () => {
  const wait = 300;

  beforeEach(() => {
    vi.useFakeTimers(); // 타이머 정의하는 함수
    vi.setSystemTime(new Date('2024-12-25')); // 현재 시간 정의하는 함수
  });

  it('특정 시간이 지난 후 함수가 호출된다.', () => {
    const spy = vi.fn();

    const debounceFunction = debounce(spy, wait);
    // 타이머 모킹
    debounceFunction();

    vi.advanceTimersByTime(wait); // 실제 시간을 조작하는 함수

    expect(spy).toHaveBeenCalled();
  });
  it('연이어 호출해도 마지막 호출 기준으로 지정된 타이머 시간이 지난 경우에만 함수가 호출된다.', () => {
    const spy = vi.fn();

    const debounceFunction = debounce(spy, wait);

    debounceFunction();

    // 최초 호출 후 0.2초 후 호출
    vi.advanceTimersByTime(200);
    debounceFunction();
    // 두번째 호출 후 0.1초 후 호출
    vi.advanceTimersByTime(100);
    debounceFunction();
    // 세번째 호출 후 0.2초 후 호출
    vi.advanceTimersByTime(100);
    debounceFunction();
    // 네번째 호출 후 0.3초 후 호출
    vi.advanceTimersByTime(wait);
    debounceFunction();

    // 다섯번 호출했지만 실제 spy함수는 단 한번만 호출
    expect(spy).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    vi.useRealTimers();
  });
});
