var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');
const prompt = require('prompt-sync')();
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
createMenu = () => {
  console.log('Witaj w menu:');
  console.log('1. Wyswietl wszystkie rekordy');
  console.log('2. Dodaj ');
  console.log('3. Update ');
  console.log('4. Usun ');
  console.log('5. Wyjscie');
};
function addTask() {
  taskId++;
  const taskManager = prompt('Task Manager: ');
  const timeRepair = prompt('TimeRepair: ');
  let userRef = firebase.database().ref('tasks/' + taskId);
  let object = {
    taskManager: taskManager,
    timeRepair: timeRepair,
  };

  userRef.set(object).then().catch();
  console.log('Added!');
}
function deleteTask(deleteTaskId) {
  let userRef = firebase.database().ref('tasks/' + deleteTaskId);
  userRef.remove();
  console.log('Usunieto');
}

function updateTask(deleteTaskId,taskManager, timeRepair) {
    let userRef = firebase.database().ref('tasks/' + deleteTaskId);
  var updateData = {
    taskManager: taskManager,
    timeRepair: timeRepair,
  };
  userRef.update(updateData);
}

action = (number) => {
  switch (parseInt(number)) {
    case 1:
      console.log('wybrales wyswietlenie bazy');
      break;
    case 2:
      addTask();
      break;
    case 3:
      const updateTaskId = prompt('Podaj id do update:');
      const taskManager = prompt('Task Manager: ');
      const timeRepair = prompt('TimeRepair: ');
      updateTask(updateTaskId, taskManager, timeRepair);
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
};

const number = prompt('Twoj wybor to: ');
action(number);
