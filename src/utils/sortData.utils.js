const sortData = (a, b, value) => {
  if (value === 'stockCode') {
    return Number(a[value]) - Number(b[value]);
  }

  let valueA, valueB;

  if (value === 'category') {
    valueA = a[value].name.toUpperCase();
    valueB = b[value].name.toUpperCase();
  } else {
    valueA = a[value].toUpperCase();
    valueB = b[value].toUpperCase();
  }

  if (valueA < valueB) {
    return -1;
  }
  if (valueA > valueB) {
    return 1;
  }
  return 0;
};

export default sortData;
