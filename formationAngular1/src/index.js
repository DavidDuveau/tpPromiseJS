import { getAllSetAndClasses } from './scripts/get-all.js';
import { ClassType } from './class/classType.js';
import { SetType } from './class/setType.js';



//Set
const allPromiseSets = allInfo.sets
  .map(n => new SetType(n))
  .map(setType => {
    return hearthstoneApi.set(setType.name).then((cards => {
      if (Array.isArray(cards)) {
        setType.cards = cards;
      }
      return setType;
    }));
  }); Promise.all(allPromiseSets).then(results => console.log(results));


// Class
const allPromiseClasses = allInfo.classes
  .map(n => new ClassType(n))
  .map(classType => {
    return hearthstoneApi.classes(classType.name).then((cards => {
      if (Array.isArray(cards)) {
        classType.cards = cards;
      }
      return classType;
    }));
  });

Promise.all(allPromiseClasses).then(results => console.log(results));



getAllSetAndClasses().then((results) => {
  console.log('all with cards', results);
}, (reason) => {
  console.log('Error', reason);
});

