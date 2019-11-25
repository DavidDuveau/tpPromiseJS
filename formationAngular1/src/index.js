
import { HearthstoneApi } from './scripts/api.js';
import { SetType } from './set-type.js';
import { ClassType } from './class-type.js';

const hearthstoneApi = new HearthstoneApi();


hearthstoneApi.info().then((allInfo) => {
    console.log(allInfo.sets);
    console.log(allInfo.classes);

    let typeTable = [];
    allInfo.sets.forEach(element => {
        let elementSetType = new SetType(element);
        typeTable.push(elementSetType);
    });
    console.log(typeTable);

    const allCardSet = allInfo.sets.map(n => new SetType(n));
    allCardSet.forEach(e => {
        hearthstoneApi.set(e.name).then(cardSet => e.cards = cardSet)
    })
    console.log(allCardSet);

    let classTable = [];
    allInfo.classes.forEach(element2 => {
        let elementClassType = new ClassType(element2);
        classTable.push(elementClassType);
    });
    console.log(classTable);

    //correction avec une promiseAll
    const allPromiseSet = allInfo.sets
        .map(n => new SetType(n))
        .map(setType => {
            return hearthstoneApi.set(setType.name).then((cards => {
                if (Array.isArray(cards)) {
                    setType.cards = cards;
                }
                console.log('-------------', setType);
                return setType;
            }));
        });

    const allPromiseClasses = allInfo.classes
        .map(n => new ClassType(n))
        .map(classType => {
            return hearthstoneApi.classes(classType.name).then((cards => {
                if (Array.isArray(cards)) {
                    classType.cards = cards;
                }
                console.log('-------------', classType);
                return classType;
            }));
        });

    // Promise.all([
    //     Promise.all(allPromiseClasses),
    //     Promise.all(allPromiseSet)]).then(results => {
    //         console.log('all with cards', results);
    //     })

})
