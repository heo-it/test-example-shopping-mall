import { Typography } from '@mui/material';
import React from 'react';

import ProductImagesSwiper from '@/pages/productDetail/components/ProductImagesSwiper';
import { formatPrice } from '@/utils/formatter';

// NOTE: props 받아서 랜더링 하는 컴포넌트(UI 컴포넌트)는 스토리북 캡쳐으로 테스트하는게 좋다.
// 별도의 상태 변경이나, 비즈니스 로직이 없는 컴포넌트는 스토리북으로 테스트하는게 좋다.
const ProductInfoArea = ({ product }) => {
  return (
    <>
      <ProductImagesSwiper images={product.images} />
      <Typography
        variant="h5"
        noWrap
        textAlign="center"
        fontStyle="oblique"
        mt={4}
      >
        {product.title}
      </Typography>
      <Typography
        variant="h6"
        noWrap
        textAlign="center"
        fontStyle="oblique"
        mt={2}
      >
        {formatPrice(product.price)}
      </Typography>
    </>
  );
};

export default ProductInfoArea;
