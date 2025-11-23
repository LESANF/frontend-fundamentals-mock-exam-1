import { Assets, colors, ListRow } from 'tosslib';

import type { SavingsProduct } from 'api/types';
import { formatCurrency } from '@utils';

import { Container } from './ProductList.styles';

type Props = {
  product: SavingsProduct;
  selected?: boolean;
  onClick?: () => void;
};

export function ProductListItem({ product, selected = false, onClick }: Props) {
  return (
    <Container>
      <ListRow
        contents={
          <ListRow.Texts
            type="3RowTypeA"
            top={product.name}
            topProps={{ fontSize: 16, fontWeight: 'bold', color: colors.grey900 }}
            middle={`연 이자율: ${product.annualRate}%`}
            middleProps={{ fontSize: 14, color: colors.blue600, fontWeight: 'medium' }}
            bottom={`${formatCurrency(product.minMonthlyAmount)}원 ~ ${formatCurrency(product.maxMonthlyAmount)}원 | ${product.availableTerms}개월`}
            bottomProps={{ fontSize: 13, color: colors.grey600 }}
          />
        }
        right={selected ? <Assets.Icon name="icon-check-circle-green" /> : undefined}
        onClick={onClick}
      />
    </Container>
  );
}
