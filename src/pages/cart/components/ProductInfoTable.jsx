import { TableContainer, Table, TableBody, Paper } from '@mui/material';
import React from 'react';

import ProductInfoTableRow from '@/pages/cart/components/ProductInfoTableRow';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';
import { pick } from '@/utils/common';

/** NOTE: 통합 테스트로 작성하면
 * cart state 변경에 따른 UI 변경도 검증 -> 실제 앱의 기능과 유사함
 *
 * ProductInfoTableRow에서도 state나 액션을 가져오도록 컴포넌트를 구성하게 되면
 * -> 상태 관리 코드 산재 -> 로직 파악 및 테스트 파악 어려움!
 *
 * => state, api에 대한 제어 코드를 통한 테스트 대상 컴포넌트로 응집 -> 유지 보수성 향상, 테스트 단위로 나누기 좋음
 */
const ProductInfoTable = () => {
  const { cart, removeCartItem, changeCartItemCount } = useCartStore(state =>
    pick(state, 'cart', 'removeCartItem', 'changeCartItemCount'),
  );
  const { user } = useUserStore(state => pick(state, 'user'));

  return (
    <TableContainer component={Paper} sx={{ wordBreak: 'break-word' }}>
      <Table aria-label="장바구니 리스트">
        <TableBody>
          {Object.values(cart).map(item => (
            <ProductInfoTableRow
              key={item.id}
              item={item}
              user={user}
              removeCartItem={removeCartItem}
              changeCartItemCount={changeCartItemCount}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductInfoTable;
