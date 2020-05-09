var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const prompt = require('prompt-sync')();
const data = new Date();
const time = data.getTime();
let animalId = time;

var firebaseConfig = {
  apiKey: 'AIzaSyBzn2jQ_x5v9oHj3OS7Sjn_tLlmBH2Z2ps',
  authDomain: 'dokumenty-e21f0.firebaseapp.com',
  databaseURL: 'https://dokumenty-e21f0.firebaseio.com',
  projectId: 'dokumenty-e21f0',
  storageBucket: 'dokumenty-e21f0.appspot.com',
  messagingSenderId: '516616653776',
  appId: '1:516616653776:web:fc4176193dfc76a966c7d5',
};
firebase.initializeApp(firebaseConfig);
createMenu = () => {
  console.log('Witaj w menu:');
  console.log('1. Wyswietl wszystkie zwierzeta');
  console.log('2. Dodaj ');
  console.log('3. Update ');
  console.log('4. Usun ');
  console.log('5. Wypisz po danym id: ');
  console.log('6. Wypisz po imieniu ');
  console.log('7. Wyjscie');
};
function addAnimal(nameAnimal,age) {
  animalId++;
  let userRef = firebase.database().ref('zoo/' + animalId);
  let object = {
    nameAnimal: nameAnimal,
    age: age,
  };

  userRef.set(object).then().catch();
  console.log('Dodano!');
}
function deleteAnimal(deleteAnimalId) {
  let userRef = firebase.database().ref('zoo/' + deleteAnimalId);
  userRef.remove();
  console.log('Usunieto');
}
function updateAnimal(updateAnimalId, nameAnimal, age) {
  let userRef = firebase.database().ref('zoo/' + updateAnimalId);
  var updateData = {
    nameAnimal: nameAnimal,
    age: age,
  };
  userRef.update(updateData);
  console.log("Zmieniono!")
}
function printData() {
  let userDataRef = firebase.database().ref('zoo').orderByKey();
  userDataRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      console.log(key +" -> "); console.log(childData);
    });
  });
}
function printByNameAnimal(name){
  let userDataRef = firebase.database().ref('zoo').orderByKey();
  userDataRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      if(childData === name)
      {
        console.log(key +" -> "+childData);
      }
     
    });
  });
}
function printDataById(printDataId){
  let userDataRef = firebase.database().ref('zoo/'+printDataId).orderByKey();
  userDataRef.once('value').then(function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      let key = childSnapshot.key;
      let childData = childSnapshot.val();
      console.log(key +" -> "); console.log(childData);
    });
  });
}
fillData = ()=>{
  addAnimal("Kaczuszka", 11);
  addAnimal("Kotek",22);
  addAnimal("Zyrafa",40);
  addAnimal("Lew",12);
  addAnimal('Malpka',5);
}

action = (number) => {
  switch (parseInt(number)) {
    case 1:
      printData();
      console.log('wybrales wyswietlenie bazy');
      break;
    case 2:
      const nameAnimal = prompt('Nazwa zwierzatka: ');
      const age = prompt('Wiek: ');
      addAnimal(nameAnimal,age);
      break;
    case 3:
      const updateAnimalId = prompt('Podaj id do update:');
      const nameAnimalUpdate = prompt('Imie zwierzatka ');
      const ageUpdate = prompt('Wiek: ');
      updateAnimal(updateAnimalId, nameAnimalUpdate, ageUpdate);
      break;
    case 4:
      const deleteAnimalId = prompt('Podaj id do usuniecia:');
      deleteAnimal(deleteAnimalId);
      break;
    case 5:
      const printDataId = prompt('Podaj id do wypisania: ')
      printDataById(printDataId);
      break;
    case 6:
      const name = prompt("Poda nazwe zwierzatka: ")
      printByNameAnimal(name)
      break;
    case 7:
      choose = false;
      console.log('Konczymy program');
      stopScript();
      break;
  }
};
createMenu();
fillData();
const number = prompt('Twoj wybor to: ');
action(number);
