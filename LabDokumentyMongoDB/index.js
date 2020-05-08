const mongo = require('mongodb');
const prompt = require('prompt-sync')();
//let animals;
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
  console.log('5. Wyjscie');
};

addAnimal = () => {
    const animalName = prompt('Imie zwierzatka: ');
  const ageAnimal = prompt('Wiek zwierzatka: ');
  animals.insertOne(
    {
      nameAnimal: animalName,
      age: ageAnimal,
    },
    (err) => {
      if (err) {
        console.log('Nie dodano wpisu');
      } else {
        console.log('Wpis dodano');
      }
    }
  );
};

connectDatabase = () => {
  client.connect((err) => {
    if (err) {
      console.log('Błąd połączenia');
    } else {
      console.log('Połączenie udane');
      const db = client.db('test');
      animals = db.collection('animals');

      // animals.deleteOne({_id: mongo.ObjectID()});

      //    animals.find({}).toArray((err,animalList)=> {
      //        if(err){
      //            console.log("Bledne zapytanie")
      //        }
      //        else{
      //            console.log("Zwierzęta:", animalList)
      //        }
      //    })
    }
  });
};
// client.connect((err) => {
//   if (err) {
//     console.log('Błąd połączenia');
//   } else {
//     console.log('Połączenie udane');

//     const db = client.db('test');

//     const animals = db.collection('animals');

//     // animals.insertOne(
//     //   {
//     //     nameAnimal: 'Kura',
//     //     age: '45',
//     //   },
//     //   (err) => {
//     //     if (err) {
//     //       console.log('Nie dodano wpisu');
//     //     } else {
//     //       console.log('Wpis dodano');
//     //     }
//     //   }
//     // );

//     // clients.updateMany(
//     //   {
//     //     age: {
//     //       $lt: 30,
//     //     },
//     //   },
//     //   {
//     //     $set: {
//     //       active: true,
//     //     },
//     //   },
//     //   (err) => {
//     //     if (err) {
//     //       console.log('Błąd Aktualizacji ;(');
//     //     } else {
//     //       console.log('Aktualizacja okej !');
//     //     }
//     //     client.close();
//     //   }
//     // );

//    // animals.deleteOne({_id: mongo.ObjectID()});

// //    animals.find({}).toArray((err,animalList)=> {
// //        if(err){
// //            console.log("Bledne zapytanie")
// //        }
// //        else{
// //            console.log("Zwierzęta:", animalList)
// //        }
// //    })
//   }
// });

action = (number) => {
  switch (parseInt(number)) {
    case 1:
      //printData();
      console.log('wybrales wyswietlenie bazy');
      break;
    case 2:
        addAnimal()
        break;  
    case 7:
      console.log('Konczymy program');
      stopScript();
      break;
  }
};
connectDatabase();
createMenu();
const number = prompt('Twoj wybor to: ');
action(number);
