import { useMemo, useState } from 'react';

import type { SavingsProduct } from 'api/types';

export function useSavingsCalculator(products?: SavingsProduct[] | null) {
  const [targetAmount, setTargetAmount] = useState<number | null>(null);
  const [monthlyAmount, setMonthlyAmount] = useState<number | null>(null);
  const [term, setTerm] = useState<number | null>(12);

  const filteredProducts = useMemo(() => {
    if (!products) {
      return [];
    }

    return products.filter(product => {
      const matchesTerm = term === null ? true : product.availableTerms === term;
      const matchesMonthly =
        monthlyAmount === null
          ? true
          : monthlyAmount > product.minMonthlyAmount && monthlyAmount < product.maxMonthlyAmount;

      return matchesTerm && matchesMonthly;
    });
  }, [products, monthlyAmount, term]);

  const recommendedProducts = useMemo(() => {
    if (!filteredProducts.length) {
      return [];
    }
    return [...filteredProducts].sort((a, b) => b.annualRate - a.annualRate).slice(0, 2);
  }, [filteredProducts]);

  return {
    targetAmount,
    setTargetAmount,
    monthlyAmount,
    setMonthlyAmount,
    term,
    setTerm,
    filteredProducts,
    recommendedProducts,
  };
}
