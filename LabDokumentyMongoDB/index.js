const prompt = require('prompt-sync')();
const mongo = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
const client = new mongo.MongoClient('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

createMenu = () => {
  console.log('Witaj w menu:');
  console.log('1. Wyswietl wszystkie rekordy');
  console.log('2. Dodaj ');
  console.log('3. Update ');
  console.log('4. Usun ');
  console.log('5. Wypisz po ID');
  console.log('6. Wyszukaj po nazwie zwierzeta');
  console.log('7. Wyjscie');
};

addAnimal = () => {
  const animalName = prompt('Name: ');
  const ageAnimal = prompt('Age: ');
  animals.insertOne(
    {
      nameAnimal: animalName,
      age: ageAnimal,
    },
    (err) => {
      if (err) {
        console.log('Error');
      } else {
        console.log('Dodano!');
      }
    }
  );
};
updateAnimal = () => {
  const animalToUpdate = prompt('Jakie id zwierzecia chcesz updatowac? : ');
  const animalToUpdateName = prompt('Podaj nowa nazwe: ');
  const animalToUpdateAge = prompt('Podaj nowy wiek zwierzecia: ');
  animals.findOneAndUpdate(
    { _id: ObjectId(animalToUpdate) },
    {
      $set: {
        nameAnimal: animalToUpdateName,
        age: animalToUpdateAge,
      },
    },
    function (err) {
      if (err) {
        console.log('Cos poszlo nie tak');
      } else {
        console.log('Update pomyslny!');
      }
    }
  );
};
deleteAnimal = () => {
  const animalId = prompt('Id zwierzatka do usuniecia: ');
  animals.deleteOne({ _id: mongo.ObjectID(animalId) });
};
printAnimal = () => {
  animals.find({}).toArray((err, animalList) => {
    if (err) {
      console.log('Bledne zapytanie');
    } else {
      console.log('Zwierzęta:', animalList);
    }
  });
};
printAnimalById = () => {
  const printAnimalId = prompt('Jakie zwierze chcesz wyszukac (ID): ');
  animals.findOne({ _id: ObjectId(printAnimalId) }, (err, result) => {
    if (err) throw err;
    console.log('Nazwa: ' + result.nameAnimal + '  wiek:  ' + result.age);
  });
};
printAnimalByName = () => {
   const printAnimalName = prompt('Jakie zwierze chcesz wyszukac: ');
  animals.find({nameAnimal:printAnimalName}).toArray((err, animalList) => {
    if (err) {
      console.log('Bledne zapytanie');
    } else {
      console.log('Zwierzęta:', animalList);
    }
  });
};
action = (number) => {
  switch (parseInt(number)) {
    case 1:
      printAnimal();
      break;
    case 2:
      addAnimal();
      break;
    case 3:
      updateAnimal();
      break;
    case 4:
      deleteAnimal();
      break;
    case 5:
      printAnimalById();
      break;
    case 6:
      printAnimalByName();
      break;
    case 7:
      console.log('Konczymy program');
      client.close();
      break;
  }
};

var db;
var animals;
client.connect(() => {
  db = client.db('test');
  animals = db.collection('animals');
  createMenu();
  const number = prompt('Twoj wybor to: ');
  action(number);
});
