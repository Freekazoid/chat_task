import k1 from '../img/k1.png';
import k2 from '../img/k2.png';
import a from '../img/a.png';
import m from '../img/m.png';

const attr = [
    {
      name: 'Clan',
      dropChance: 0.45,
      img: Math.floor(Math.random() * 2)?k1:k2
    },
    {
      name: 'Admin',
      dropChance: 0.25,
      img: a
    },
    {
      name: 'Moder',
      dropChance: 0.1,
      img: m
    },
    {
      name: 'free',
      dropChance: 0.7
  }
  ];
  
  const lerp = (min, max, value) => ((1 - value) * min + value * max);
  
  const chance = function(items=attr) {
    const total = items.reduce((accumulator, item) => (accumulator += item.dropChance), 0);
    const chance = lerp(0, total, Math.random());
  
    let current = 0;
    for (const item of items) {
        if (current <= chance && chance < current + item.dropChance) {
            return item;
        }
  
        current += item.dropChance;
    }
  };
  export default chance;