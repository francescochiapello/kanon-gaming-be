const getRandomNumber = () => {
  return Math.floor(Math.random() * 8);
};

const CHERRIE = 'cherry';
const LEMON = 'lemon';
const APPLE = 'apple';
const BANANA = 'banana';

export default function spinSlotMachine () {
  const r1 = ['cherry', 'lemon', 'apple', 'lemon', 'banana', 'banana', 'lemon', 'lemon'];
  const r2 = ['lemon', 'apple', 'lemon', 'lemon', 'cherry', 'apple', 'banana', 'lemon'];
  const r3 = ['lemon', 'apple', 'lemon', 'apple', 'cherry', 'lemon', 'banana', 'lemon'];

  const first = r1[getRandomNumber()];
  const second = r2[getRandomNumber()];
  const third = r3[getRandomNumber()];

  let coins = 0;

  if (first === second) { // win
    if (first === CHERRIE && second === CHERRIE && third === CHERRIE) {
      coins = 50;
    } else if (first === CHERRIE && second === CHERRIE) {
      coins = 40;
    } else if (first === APPLE && second === APPLE && third === APPLE) {
      coins = 20;
    } else if (first === APPLE && second === APPLE) {
      coins = 10;
    } else if (first === BANANA && second === BANANA && third === BANANA) {
      coins = 15;
    } else if (first === BANANA && second === BANANA) {
      coins = 5;
    } else if (first === LEMON && second === LEMON && third === LEMON) {
      coins = 3;
    }
  } // else no win

  return {
    coins
  };
}