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






