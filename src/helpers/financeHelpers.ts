export function calculateMeanQuotaValue(
  previousMeanQuotaValue: number,
  previousQuotas: number,
  currentQuotaValue: number,
  newQuotas: number,
) {
  return (
    (previousMeanQuotaValue * previousQuotas + currentQuotaValue * newQuotas) /
    (previousQuotas + newQuotas)
  );
}
