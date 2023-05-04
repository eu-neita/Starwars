const setClickSort = (planetsData, handleSelectOnSort, sortRadio) => {
  let newDataSort = [...planetsData];
  const magickNumber = -1;
  if (sortRadio === 'ASC') {
    newDataSort = newDataSort
      .sort((a, b) => {
        const numA = Number(a[handleSelectOnSort]);
        const numB = Number(b[handleSelectOnSort]);
        if (Number.isNaN(numA)) {
          return 1;
        }
        if (Number.isNaN(numB)) {
          return magickNumber;
        }
        return numA - numB;
      });
  }
  if (sortRadio === 'DESC') {
    newDataSort = newDataSort
      .sort((a, b) => {
        const numA = Number(a[handleSelectOnSort]);
        const numB = Number(b[handleSelectOnSort]);
        if (Number.isNaN(numA)) {
          return 1;
        }
        if (Number.isNaN(numB)) {
          return magickNumber;
        }
        return numB - numA;
      });
  }
  return [...newDataSort];
};

export default setClickSort;
