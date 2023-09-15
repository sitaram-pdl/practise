function convertTime(milliSecond) {
  const minutes = Math.floor(milliSecond / 60000);
  const seconds = Math.floor((milliSecond % 60000) / 1000);

  if (minutes < 1 && seconds < 1) {
    return milliSecond.toFixed(4) + ' ms';
  }

  return minutes + ':' + String(seconds).padStart(2, 0) + ' s';
}

export default convertTime;
