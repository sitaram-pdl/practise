function getNumberSuffix(num) {
  const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' });
  return formatter.format(num);
}

export default getNumberSuffix;
