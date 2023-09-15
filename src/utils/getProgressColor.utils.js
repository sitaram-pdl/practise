function getProgressColor(value) {
  if (value < 30) return '#E3696A';
  if (value < 60) return '#EBE2A2';
  return '#1b9876';
}

export default getProgressColor;
