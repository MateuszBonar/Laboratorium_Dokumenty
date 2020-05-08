const mongo = require('mongodb');

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

client.connect((err) => {

    
  if (err) {
    console.log('Błąd połączenia');
  } else {
    console.log('Połączenie udane');

    const db = client.db('test');

    const animals = db.collection('animals');

    animals.insertOne(
      {
        nameAnimal: 'Kura',
        age: '45',
      },
      (err) => {
        if (err) {
          console.log('Nie dodano wpisu');
        } else {
          console.log('Wpis dodano');
        }
      }
    );

    // clients.updateMany(
    //   {
    //     age: {
    //       $lt: 30,
    //     },
    //   },
    //   {
    //     $set: {
    //       active: true,
    //     },
    //   },
    //   (err) => {
    //     if (err) {
    //       console.log('Błąd Aktualizacji ;(');
    //     } else {
    //       console.log('Aktualizacja okej !');
    //     }
    //     client.close();
    //   }
    // );

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

