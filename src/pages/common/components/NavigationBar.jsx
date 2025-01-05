import { AppBar, Box, Toolbar, Typography, Skeleton } from '@mui/material';
import Cookies from 'js-cookie';
import React, { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import { pageRoutes } from '@/apiRoutes';
import ApiErrorBoundary from '@/pages/common/components/ApiErrorBoundary';
import CartButton from '@/pages/common/components/CartButton';
import ConfirmModal from '@/pages/common/components/ConfirmModal';
import LoginButton from '@/pages/common/components/LoginButton';
import LogoutButton from '@/pages/common/components/LogoutButton';
import useConfirmModal from '@/pages/common/hooks/useConfirmModal';
import useProfile from '@/pages/common/hooks/useProfile';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { isModalOpened, toggleIsModalOpened } = useConfirmModal();
  const { isLogin, setIsLogin, setUserData } = useUserStore(state =>
    pick(state, 'isLogin', 'setIsLogin', 'setUserData'),
  );
  const { cart, initCart } = useCartStore(state =>
    pick(state, 'cart', 'initCart'),
  );
  const handleClickModalAgree = () => {
    remove();
    setIsLogin(false);
    Cookies.remove('access_token');
    toggleIsModalOpened();
  };
  // 유저 데이터를 API 호출해서 가져옴 -> 여러 컴포넌트가 조합된 영역에서 발생 -> 통합 테스트 검증 필요
  // API 응답 모킹 -> 일관된 테스트 환경 구성 가능
  // 모든 API 호출을 Tanstack Query에서 담당 -> 설정 해야함
  const { data, remove } = useProfile({
    config: {
      onSuccess: profile => {
        setUserData(profile);
        initCart(profile.id);
      },
      enabled: !!isLogin,
    },
  });
  const handleClickLogo = () => {
    navigate(pageRoutes.main);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={handleClickLogo}
              style={{ cursor: 'pointer' }}
            >
              Wish Mart
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              {isLogin ? (
                <ApiErrorBoundary>
                  <Suspense
                    fallback={<Skeleton sx={{ width: 100, height: 30 }} />}
                  >
                    <CartButton cart={cart} />
                    <LogoutButton data={data} onClick={toggleIsModalOpened} />
                  </Suspense>
                </ApiErrorBoundary>
              ) : (
                <LoginButton />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <ConfirmModal
        title="로그아웃 확인"
        description="로그아웃 하시겠습니까?"
        handleClickDisagree={toggleIsModalOpened}
        handleClickAgree={handleClickModalAgree}
        isModalOpened={isModalOpened}
      />
    </>
  );
};

export default NavigationBar;
