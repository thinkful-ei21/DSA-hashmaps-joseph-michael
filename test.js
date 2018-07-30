'use strict';
const myArr = ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'];
const anagram = arr => {
  const hashMap = new Map();
  let id = 0;
  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    for (let j = 0; j < word.length; j++) {
      hashMap.set(word[j]);
    }
  }

  hashMap.forEach((value, key) => {
    value = id++;
    hashMap.set(key, value * 2);
  });

  let groupedAnagrams = [];
  let anagrams = [];
  let newHashMap = new Map();

  for (let i = 0; i < arr.length; i++) {
    let word = arr[i];
    let wordTotal = 0;

    for (let j = 0; j < word.length; j++) {
      wordTotal += hashMap.get(word[j]);
    }
    newHashMap.set(word, wordTotal);
    
    if (newHashMap.get(word) === wordTotal) {
      anagrams = [...anagrams, [word]];
    }
  }

  // newHashMap.forEach((value, key) => {
  //   if (newHashMap.get(key) === value) {
  //     anagrams.push(key);
  //   }
  // });

  console.log(newHashMap);
}; 

anagram(myArr);

// e: 0
// a: 2
// s: 4
// t: 6
// c: 8
// r: 10