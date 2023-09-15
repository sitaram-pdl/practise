export const filterData = ({
  scoreDetail,
  setCo2Score,
  setTreeScore,
  setFlightScore,
}) => {
  const co2ScoreInGram = scoreDetail.co2.gram * 10000;
  setCo2Score(getCo2Score(co2ScoreInGram));
  setTreeScore(getTreeScore(co2ScoreInGram));
  setFlightScore(getFlightScore(scoreDetail.energy));
};

export const getCo2Score = (co2ScoreInGram) => {
  let value = Math.round(co2ScoreInGram);
  let unit = co2ScoreInGram === 1 ? 'gram' : 'grams';

  if (co2ScoreInGram > 1000) {
    if (co2ScoreInGram > 1000000) {
      value = Math.round(co2ScoreInGram / 1000000);
      unit = value === 1 ? 'ton' : 'tons';
    } else {
      value = Math.round(co2ScoreInGram / 1000);
      unit = value === 1 ? 'kilogram' : 'kilograms';
    }
  }

  return { value, unit };
};

export const getTreeScore = (co2ScoreInGram) => {
  const co2ScoreInKg = co2ScoreInGram / 1000;
  let treeScoreInYear = co2ScoreInKg / 2200;
  const treeScore = {
    value: Math.round(treeScoreInYear),
    unit: treeScoreInYear == 1 ? 'year' : 'years',
  };
  if (treeScoreInYear < 1) {
    const treeScoreInDays = treeScoreInYear * 365;
    if (treeScoreInDays >= 1) {
      treeScore.value = Math.round(treeScoreInDays);
      treeScore.unit = treeScoreInDays == 1 ? 'day' : 'days';
    } else {
      const treeScoreInHours = treeScoreInDays * 24;
      if (treeScoreInHours >= 1) {
        treeScore.value = Math.round(treeScoreInHours);
        treeScore.unit = treeScoreInHours == 1 ? 'hour' : 'hours';
      } else {
        const treeScoreInMinutes = treeScoreInHours * 60;
        if (treeScoreInHours >= 1) {
          treeScore.value = Math.round(treeScoreInMinutes);
          treeScore.unit = treeScoreInMinutes == 1 ? 'minute' : 'minutes';
        }
      }
    }
  }
  return treeScore;
};

export const getFlightScore = (energy) => {
  const energyInKWH = energy * 10000;
  const flightScore = {
    energy: Math.round(energyInKWH),
    distance: Math.round(energyInKWH * 6.4),
  };
  return flightScore;
};

export const compareWebsite = ({ score, setScoreDetail }) => {
  if (score > 90) {
    setScoreDetail((prevScoreDetail) => ({
      ...prevScoreDetail,
      percentScore: 95,
    }));
  } else if (score > 70 && score <= 90) {
    setScoreDetail((prevScoreDetail) => ({
      ...prevScoreDetail,
      percentScore: 80,
    }));
  } else if (score <= 70 && score > 50) {
    setScoreDetail((prevScoreDetail) => ({
      ...prevScoreDetail,
      percentScore: 50,
    }));
  } else if (score < 50) {
    setScoreDetail((prevScoreDetail) => ({
      ...prevScoreDetail,
      percentScore: 30,
    }));
  }
};
