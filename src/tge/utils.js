export function array2DCopy(array){
  const resultArray = [];
  for(const line of array){
    resultArray.push([...line]);
  }
  return resultArray;
}