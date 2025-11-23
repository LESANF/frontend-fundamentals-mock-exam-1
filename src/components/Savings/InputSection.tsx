import { SelectBottomSheet, Spacing, TextField } from 'tosslib';

import { formatCurrency, parseNumberInput } from '@utils';

type Props = {
  targetAmount: number | null;
  monthlyAmount: number | null;
  term: number | null;
  onChangeTargetAmount: (value: number | null) => void;
  onChangeMonthlyAmount: (value: number | null) => void;
  onChangeTerm: (value: number | null) => void;
};

export function InputSection({
  targetAmount,
  monthlyAmount,
  term,
  onChangeTargetAmount,
  onChangeMonthlyAmount,
  onChangeTerm,
}: Props) {
  const handleTargetChange = (value: string | { target: { value: string } }) => {
    const parsedValue = typeof value === 'string' ? value : value.target.value;
    onChangeTargetAmount(parseNumberInput(parsedValue));
  };

  const handleMonthlyChange = (value: string | { target: { value: string } }) => {
    const parsedValue = typeof value === 'string' ? value : value.target.value;
    onChangeMonthlyAmount(parseNumberInput(parsedValue));
  };

  const handleTermChange = (value: number | string) => {
    const next = typeof value === 'string' ? Number(value) : value;
    onChangeTerm(Number.isNaN(next) ? null : next);
  };

  return (
    <>
      <TextField
        label="목표 금액"
        placeholder="목표 금액을 입력하세요"
        suffix="원"
        value={formatCurrency(targetAmount)}
        onChange={handleTargetChange}
      />
      <Spacing size={16} />
      <TextField
        label="월 납입액"
        placeholder="희망 월 납입액을 입력하세요"
        suffix="원"
        value={formatCurrency(monthlyAmount)}
        onChange={handleMonthlyChange}
      />
      <Spacing size={16} />
      <SelectBottomSheet
        label="저축 기간"
        title="저축 기간을 선택해주세요"
        value={term ?? undefined}
        onChange={handleTermChange}
      >
        <SelectBottomSheet.Option value={6}>6개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={12}>12개월</SelectBottomSheet.Option>
        <SelectBottomSheet.Option value={24}>24개월</SelectBottomSheet.Option>
      </SelectBottomSheet>
    </>
  );
}
