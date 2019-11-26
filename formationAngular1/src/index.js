import { getAllSetAndClasses } from './scripts/get-all.js';
import { ClassType } from './class/class-Type.js';
import { SetType } from './class/set-Type.js';
import { HearthstoneApi } from './scripts/api.js';


const hearthstoneApi = new HearthstoneApi();
hearthstoneApi.info().then((allInfo) => {

  //   /*getting all set*/
  //   const allPromiseSets = allInfo.sets
  //     .map(n => new SetType(n))
  //     .map(setType => {
  //       return hearthstoneApi.set(setType.name).then((cards => {
  //         if (Array.isArray(cards)) {
  //           setType.cards = cards;
  //         }
  //         return setType;
  //       }));
  //     }); Promise.all(allPromiseSets).then(results => console.log(results));


  //   /*getting all classe*/
  //   const allPromiseClasses = allInfo.classes
  //     .map(n => new ClassType(n))
  //     .map(classType => {
  //       return hearthstoneApi.classes(classType.name).then((cards => {
  //         if (Array.isArray(cards)) {
  //           classType.cards = cards;
  //         }
  //         return classType;
  //       }));
  //     });

  //   Promise.all(allPromiseClasses).then(results => console.log(results));

  // })

  // getAllSetAndClasses().then((results) => {
  //   console.log('all with cards', results);
  // }, (reason) => {
  //   console.log('Error', reason);
  // });

  /*intersection between two arrays, 
  no duplicates (filter + find)*/

  function getCards(setName, className) {
    return Promise.all([
      hearthstoneApi.set(setName),
      hearthstoneApi.classes(className)
    ]).then(([setsCards, classesCards]) => {
      let cardCards = setsCards
        .filter(cardSet => classesCards
          .find(cardClass => cardSet.cardId === cardClass.cardId))
      console.log(cardCards)
      return cardCards;
    });
  }

  getCards('Classic', 'Warrior');

});
