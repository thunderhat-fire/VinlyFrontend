const getSideLength = (array) => {
  let total = 0;
  array.forEach((e) => {
    total += e.length;
  });
  let mins = Math.floor(total / 60);
  let secs = Math.round(total % 60);
  return { total: Math.round(total), mins, secs };
};

export default getSideLength;
