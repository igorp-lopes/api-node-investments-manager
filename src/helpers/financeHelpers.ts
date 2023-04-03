export function calculateMeanQuotaValue(
  previousMeanQuotaValue: number,
  previousQuotas: number,
  currentQuotaValue: number,
  currentQuotas: number,
) {
  return (
    (previousMeanQuotaValue * previousQuotas +
      currentQuotaValue * currentQuotas) /
    (previousQuotas + currentQuotas)
  );
}
