const activeCaseSorting = (fullData, isAsc) => {

  const arrangedData = [ ...fullData ];

  arrangedData.sort((obj1, obj2) => {

    const entryOne = Object.entries(obj1?.Data?.total);
    const entryTwo = Object.entries(obj2?.Data?.total);

    let valActiveOne = 0;
    let valActiveTwo = 0;

    for (const [ val, numeric ] of entryOne) {
      if (val === 'vaccinated' || val === 'tested')
        continue;
      if (val === 'confirmed')
        valActiveOne += numeric;
      else
        valActiveOne -= numeric;
    }

    for (const [ val, numeric ] of entryTwo) {
      if (val === 'vaccinated' || val === 'tested')
        continue;
      if (val === 'confirmed')
        valActiveTwo += numeric;
      else
        valActiveTwo -= numeric;
    }

    return isAsc ? valActiveOne - valActiveTwo : valActiveTwo - valActiveOne;

  });

  return arrangedData;
}


const sortByNumericHeaders = (name, fullData, isAsc) => {

  const arrangedData = [ ...fullData ];

  let whereToFind = 'total';

  if (name === 'population')
    whereToFind = 'meta';

  arrangedData.sort((obj1, obj2) => {

    let populfirst = obj1?.Data?.[ `${whereToFind}` ]?.[ `${name}` ];
    let populsecond = obj2?.Data?.[ `${whereToFind}` ]?.[ `${name}` ];

    if (!populfirst) populfirst = 0;
    if (!populsecond) populsecond = 0;

    return isAsc ? populfirst - populsecond : populsecond - populfirst;

  });
  return arrangedData;
}


const stateDistrictSort = (fullData, isAsc) => {

  const arrangedData = [ ...fullData ];

  arrangedData.sort((obj1, obj2) => {
    return isAsc ? obj1[ 'name' ].localeCompare(obj2[ 'name' ]) : obj2[ 'name' ].localeCompare(obj1[ 'name' ]);
  })

  return arrangedData;

}

export const dataSorting = (id, fullData, isAsc) => {

  let idname = '';
  if (id === 'pn' || id === 'te' || id === 'cn' || id === 'rc' || id === 'dc') {
    switch (id) {
      case 'pn':
        idname = "population";
        break;
      case 'te': idname = 'tested';
        break;
      case 'cn': idname = 'confirmed';
        break;
      case 'rc': idname = 'recovered';
        break;
      case 'dc': idname = 'deceased';
        break;
      default:
    }
    return sortByNumericHeaders(idname, fullData, isAsc);
  }

  if (id === 'st')
    return stateDistrictSort(fullData, isAsc);

  else if (id === 'ae')
    return activeCaseSorting(fullData, isAsc);
}
