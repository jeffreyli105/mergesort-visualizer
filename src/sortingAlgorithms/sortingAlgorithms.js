export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}
  
function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // values that we're comparing; push once to change color.
      animations.push({type: 'compare', bars: [i, j]});
      // values that we're comparing; push once to revert color.
      animations.push({type: 'revert', bars: [i, j]});
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // overwrite value at index k in the og array with value 
        // at index i in auxiliary array.
        animations.push({type: 'overwrite', index: k, newHeight: auxiliaryArray[i]});
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // overwrite value at index k in the og array with value 
        // at index j in auxiliary array.
        animations.push({type: 'overwrite', index: k, newHeight: auxiliaryArray[j]});
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // values that we're comparing; push once to change color.
      animations.push({type: 'compare', bars: [i, i]});
      // values that we're comparing; push once to revert color.
      animations.push({type: 'revert', bars: [i, i]});
      // overwrite value at index k in the og array with value 
      // at index i in auxiliary array.
      animations.push({type: 'overwrite', index: k, newHeight: auxiliaryArray[i]});
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // values that we're comparing; push once to change color.
      animations.push({type: 'compare', bars: [j, j]});
      // values that we're comparing; push once to revert color.
      animations.push({type: 'revert', bars: [j, j]});
      // overwrite value at index k in the og array with value 
      // at index j in auxiliary array.
      animations.push({type: 'overwrite', index: k, newHeight: auxiliaryArray[j]});
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
