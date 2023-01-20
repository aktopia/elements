const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export function formatCount(count: number) {
  return formatter.format(count);
}
