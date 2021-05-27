export const removeDuplicates = (array) => [...new Set(array)];

export const countDuplicates = (array) => {
  const uniqueValues = removeDuplicates(array);
  const counterUnique = uniqueValues.map((value) => ({ value, count: 0 }));
  return counterUnique.map(
    ({ value }) => ({ value, count: array.filter((arrayValue) => arrayValue === value).length }),
  );
};

export const getDuplicates = (array) => {
  const duplicates = countDuplicates(array);
  return duplicates.filter((value) => value.count > 1).map((duplicate) => duplicate.value);
};

export const arrayDiff = (a, b) => a.filter((e) => !b.includes(e));

export const arrayIntersection = (a, b) => a.filter((e) => b.includes(e));

export const randomNumber = (min, max) => Math.round(Math.random() * (max - min) + min);
