import { colors, ListHeader, ListRow, Border, Spacing } from 'tosslib';

import type { SavingsProduct } from 'api/types';
import { formatCurrency } from '@utils';
import { ProductList } from './ProductList';

type Props = {
  selectedProduct: SavingsProduct | null;
  selectedProductId: string | null;
  monthlyAmount: number | null;
  term: number | null;
  targetAmount: number | null;
  recommendedProducts: SavingsProduct[];
  onSelect: (productId: string) => void;
};

const roundToThousand = (value: number) => Math.round(value / 1000) * 1000;
const toRateFactor = (annualRate: number) => 1 + annualRate * 0.5;

export function CalculationResult({
  selectedProduct,
  selectedProductId,
  monthlyAmount,
  term,
  targetAmount,
  recommendedProducts,
  onSelect,
}: Props) {
  const hasSelection = Boolean(selectedProduct);
  const rateFactor = selectedProduct ? toRateFactor(selectedProduct.annualRate) : null;
  const targetValue = targetAmount ?? 0;

  // 예상 수익 금액
  const expectedReturn =
    rateFactor && monthlyAmount !== null && term !== null ? monthlyAmount * term * rateFactor : null;

  // 목표 금액과의 차이
  const diffFromTarget = expectedReturn !== null ? targetValue - expectedReturn : null;

  // 추천 월 납입 금액
  const recommendedMonthly = rateFactor && term !== null ? roundToThousand(targetValue / (term * rateFactor)) : null;

  const displayCurrency = (value: number | null) => (value === null ? '-' : `${formatCurrency(value)}원`);

  return (
    <>
      <Spacing size={8} />
      {!hasSelection && <ListRow contents={<ListRow.Texts type="1RowTypeA" top="상품을 선택해주세요." />} />}

      {hasSelection && (
        <>
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="예상 수익 금액"
                topProps={{ color: colors.grey600 }}
                bottom={displayCurrency(expectedReturn)}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="목표 금액과의 차이"
                topProps={{ color: colors.grey600 }}
                bottom={displayCurrency(diffFromTarget)}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
          <ListRow
            contents={
              <ListRow.Texts
                type="2RowTypeA"
                top="추천 월 납입 금액"
                topProps={{ color: colors.grey600 }}
                bottom={displayCurrency(recommendedMonthly)}
                bottomProps={{ fontWeight: 'bold', color: colors.blue600 }}
              />
            }
          />
        </>
      )}

      <Spacing size={8} />
      <Border height={16} />
      <Spacing size={8} />

      <ListHeader title={<ListHeader.TitleParagraph fontWeight="bold">추천 상품 목록</ListHeader.TitleParagraph>} />
      <Spacing size={12} />

      <ProductList
        products={recommendedProducts}
        selectedProductId={selectedProductId}
        onSelect={onSelect}
        emptyMessage="추천할 상품이 없습니다."
      />
    </>
  );
}
