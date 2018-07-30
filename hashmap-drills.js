'use strict';

class HashMap {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
  }
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i); // "<<" left-shifts (bitwise) binary
      hash = hash & hash; // will transform integer to 32-bit (bitwise operator)
    }
    console.log(hash >>> 0);
    return hash >>> 0; // hash is gonna return an integer between 0 and this._capacity
    // if resulting hash is negative, will convert to positive
  }

  set(key, value) { // set(key = 'Michael', value = 'true')
    const loadRatio = (this.length + 1) / this._capacity; // loadRatio = (0 + 1) / 8 = 12.5%
    if (loadRatio > HashMap.MAX_LOAD_RATIO) { // if 0.125 is greater than 0.9
      this._resize(this._capacity * HashMap.SIZE_RATIO); // resize (8 * 3)
    }

    const index = this._findSlot(key); // this_findSlot(key) is 
    this._slots[index] = {
      key,
      value
    };
    this.length++;
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

}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

const test = () => {
  HashMap._hashString('joseph');
};
test();