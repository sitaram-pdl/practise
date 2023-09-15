function checkGreenHolderTemp(score) {
  /* 75 - 100 */
  if (score < 3) {
    let newScore = 100 - (score * 25) / 3;
    if (newScore > 99) newScore = 99;
    return {
      score: Math.round(newScore),
      activeClassName: 'green-bg',
    };
  }
  /* 35 - 75 */
  if (score < 6) {
    let newScore = 75 - ((score - 3) * 40) / 3;
    return {
      score: Math.round(newScore),
      activeClassName: 'orange-bg',
    };
  }

  // 0 - 35
  let newScore = 35 - ((score - 6) * 35) / 4;
  if (newScore < 1) newScore = 1;
  return {
    score: Math.round(newScore),
    activeClassName: 'red-bg',
  };
}

function checkGreenHolder(score) {
  if (score < 35) return 'red-bg';
  if (score < 75) return 'orange-bg';
  return 'green-bg';
}

export default checkGreenHolder;
