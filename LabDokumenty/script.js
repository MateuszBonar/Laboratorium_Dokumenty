var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const prompt = require('prompt-sync')();

let choose = true;
const data = new Date();
const time = data.getTime();
let taskId = time;

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

function addTask(taskManager, timeRepair) {
  taskId++;
  let userRef = firebase.database().ref('tasks/' + taskId);
  let object = {
    taskManager: taskManager,
    timeRepair: timeRepair,
  };
  
  userRef.set(object).then().catch();
  console.log('Dodalem do bazy danych!');
}
function deleteTask(deleteTaskId){
  let userRef = this.database.ref('tasks/' + deleteTaskId);
  userRef.remove();
  console.log('Usunieto');
};

createMenu = () => {
  console.log('Witaj w menu:');
  console.log('1. Wyswietl wszystkie rekordy');
  console.log('2. Dodaj ');
  console.log('3. Update ');
  console.log('4. Usun ');
  console.log('5. Wyjscie');
};



action = (choose) => {
  switch (parseInt(choose)) {
    case 1:
      console.log('wybrales wyswietlenie bazy');
      break;
    case 2:
      const taskManager = prompt('Task Manager: ');
      const timeRepair = prompt("Czas naprawy: ");
      addTask(taskManager, timeRepair);
      break;
    case 3:
      console.log('Wybrales udpate');
      break;
    case 4:
      const deleteTaskId = prompt('Podaj id do usuniecia:');
      deleteTask(deleteTaskId);
      break;
    case 5:
      choose = false;
      console.log('Konczymy program');
      stopScript();
      break;
  }
}

while (choose) {
  console.log('----------------------------------');
  createMenu();
  console.log('----------------------------------');
  const choose = prompt('Twoj wybor to: ');
  action(choose);
}
