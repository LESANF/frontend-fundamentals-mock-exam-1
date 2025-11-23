import { useMemo, useState } from 'react';

import Header from '@components/Header';
import Meta from '@components/Meta';
import { CalculationResult, InputSection, ProductList } from '@components/Savings';
import { useGetSavingsProducts } from 'api/queries';
import { Border, Spacing, Tab } from 'tosslib';

export function SavingsCalculatorPage() {
  const openGraphImageUrl = new URL(`${import.meta.env.BASE_URL}toss-og-image.png`, window.location.origin).href;

  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number | null>(null);
  const [term, setTerm] = useState<number | null>(12);
  const [activeTab, setActiveTab] = useState<'products' | 'results'>('products');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const { data, isLoading } = useGetSavingsProducts();

  const selectedProduct = useMemo(
    () => data?.find(product => product.id === selectedProductId) ?? null,
    [data, selectedProductId]
  );

  const filteredProducts = useMemo(() => {
    if (!data) {
      return [];
    }

    return data.filter(product => {
      const matchesTerm = term === null ? true : product.availableTerms === term;
      const matchesMonthly =
        monthlyAmount === null
          ? true
          : monthlyAmount > product.minMonthlyAmount && monthlyAmount < product.maxMonthlyAmount;

      return matchesTerm && matchesMonthly;
    });
  }, [data, monthlyAmount, term]);

  const recommendedProducts = useMemo(() => {
    if (!filteredProducts.length) {
      return [];
    }
    return [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  }, [filteredProducts]);

  return (
    <>
      <Meta userName={'김동한'} openGraphImageUrl={openGraphImageUrl} />
      <Header title={'적금 계산기'} />
      <Spacing size={16} />

      <InputSection
        targetAmount={targetAmount}
        monthlyAmount={monthlyAmount}
        term={term}
        onChangeTargetAmount={setTargetAmount}
        onChangeMonthlyAmount={setMonthlyAmount}
        onChangeTerm={setTerm}
      />

      <Spacing size={24} />
      <Border height={16} />
      <Spacing size={8} />

      <Tab onChange={value => setActiveTab(value as 'products' | 'results')}>
        <Tab.Item value="products" selected={activeTab === 'products'}>
          적금 상품
        </Tab.Item>
        <Tab.Item value="results" selected={activeTab === 'results'}>
          계산 결과
        </Tab.Item>
      </Tab>

      {activeTab === 'products' && (
        <ProductList
          products={filteredProducts}
          isLoading={isLoading}
          selectedProductId={selectedProductId}
          onSelect={setSelectedProductId}
        />
      )}

      {activeTab === 'results' && (
        <CalculationResult
          selectedProduct={selectedProduct}
          selectedProductId={selectedProductId}
          monthlyAmount={monthlyAmount}
          term={term}
          targetAmount={targetAmount}
          recommendedProducts={recommendedProducts}
          onSelect={setSelectedProductId}
        />
      )}
    </>
  );
}
