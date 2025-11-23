import { Assets, colors, ListRow } from 'tosslib';

import type { SavingsProduct } from 'api/types';
import { Container } from './ProductList.styles';

type Props = {
  products: SavingsProduct[];
  isLoading?: boolean;
  selectedProductId?: string | null;
  onSelect?: (productId: string) => void;
};

export function ProductList({ products, isLoading, selectedProductId, onSelect }: Props) {
  if (isLoading) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="불러오는 중..." />} />;
  }

  if (!products.length) {
    return <ListRow contents={<ListRow.Texts type="1RowTypeA" top="조건에 맞는 상품이 없습니다." />} />;
  }

  return (
    <>
      {products.map(product => (
        <Container key={product.id}>
          <ListRow
            contents={
              <ListRow.Texts
                type="3RowTypeA"
                top={product.name}
                topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
                middle={`연 이자율: ${product.annualRate}%`}
                middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
                bottom={`${product.minMonthlyAmount.toLocaleString()}원 ~ ${product.maxMonthlyAmount.toLocaleString()}원 | ${product.availableTerms}개월`}
                bottomProps={{ fontSize: 13, color: colors.grey600 }}
              />
            }
            right={product.id === selectedProductId ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
            onClick={() => onSelect?.(product.id)}
          />
        </Container>
      ))}
    </>
  );
}
