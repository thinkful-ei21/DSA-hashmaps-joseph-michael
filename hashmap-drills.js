'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      throw new Error('Key error');
    }
    return this._slots[index].value;
  }

  set(key, value) { // set(key = 'Michael', value = 'true')
    const loadRatio = (this.length + 1) / this._capacity; // loadRatio = (0 + 1) / 8 = 12.5%
    if (loadRatio > HashMap.MAX_LOAD_RATIO) { // if 0.125 is greater than 0.9
      this._resize(this._capacity * HashMap.SIZE_RATIO); // resize (8 * 3)
    }

    const index = this._findSlot(key); // this_findSlot(key) is 
    
    if (!this._slots[index]) {
      this.length++;
    }

    this._slots[index] = {
      key,
      value,
      deleted: false
    };

  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key); // for 'michael', this will return 3329446136
    const start = hash % this._capacity; // start = 3329446136 % 8 = 0

    for (let i = start; i < start + this._capacity; i++) { // i = 0; i < (0 + 8); i++
      const index = i % this._capacity; // index = i % 8; i will always be less than this._capacity
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._deleted = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.deleted) {
        this.set(slot.key, slot.value);
      }
    }
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i); // "<<" left-shifts (bitwise) binary
      hash = hash & hash; // will transform integer to 32-bit (bitwise operator)
    }
    return hash >>> 0; // hash is gonna return an integer between 0 and this._capacity
    // if resulting hash is negative, will convert to positive
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;


const lor = new HashMap();

lor.set('Hobbit', 'Bilbo');
lor.set('Hobbit', 'Frodo');
lor.set('Wizard', 'Gandalf');
lor.set('Human', 'Aragon');
lor.set('Elf', 'Legolas');
lor.set('Maiar', 'The Necromancer');
lor.set('Maiar', 'Sauron');
lor.set('RingBearer', 'Gollum');
lor.set('LadyOfLight', 'Galadriel');
lor.set('HalfElven', 'Arwen');
lor.set('Ent', 'Treebeard');

// console.log(lor);

// console.log(lor.get('Ent'));

const lotr = new Map();

lotr.set('Hobbit', 'Bilbo');
lotr.set('Wizard', 'Frodo');
lotr.set('Goblin', 'Brodo');
lotr.set('Evil Thing', 'Filbo');


// console.log(lotr);

const palindrome = string => {
  const hashMap = new Map();
  let oddCount = 0;

  for (let i = 0; i < string.length; i++) { // iterate through string
    let letterCount = 1;
    if (hashMap.has(string[i])) {
      letterCount++;
    }
    hashMap.set(string[i], letterCount); // input item into hashMap
  }

  hashMap.forEach(value => {
    if (value % 2 === 1) {
      oddCount++;
    }
  });

  if (oddCount > 1) {
    console.log(false);
  } else {
    console.log(true);
  }
};
palindrome('ddafadd');

// tree = false, not a palindrome
// t: 1
// r: 1
// e: 2

// racecar = true
// r: 2
// a: 2
// c: 2
// e: 1
// acecarr = true

// to determine palindrome - get count of each character in string
// 1 count can be odd, the rest needs to be even

// Anagrams:
// e: 1
// a: 2
// t: 3
// s: 4
// c: 5
// r: 6

// east = 1243 = 10;
// teas = 10;
// acre = 2 5 6 1 = 14;
// care = 14;

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