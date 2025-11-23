import { ListRow } from 'tosslib';

import type { SavingsProduct } from 'api/types';
import { ProductListItem } from './ProductListItem';

type Props = {
  products: SavingsProduct[];
  isLoading?: boolean;
  selectedProductId?: string | null;
  onSelect?: (productId: string) => void;
  emptyMessage?: string;
};

export function ProductList({
  products,
  isLoading,
  selectedProductId,
  onSelect,
  emptyMessage = '조건에 맞는 상품이 없습니다.',
}: Props) {
  if (isLoading) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="불러오는 중..." />} />;
  }

  if (!products.length) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top={emptyMessage} />} />;
  }

  return (
    <>
      {products.map(product => (
        <ProductListItem
          key={product.id}
          product={product}
          selected={product.id === selectedProductId}
          onClick={() => onSelect?.(product.id)}
        />
      ))}
    </>
  );
}
