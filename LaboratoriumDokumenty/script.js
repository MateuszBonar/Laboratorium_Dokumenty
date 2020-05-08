let choose = true;
const data = new Date();
const time = data.getTime();
let counter = time;
this.database = firebase.database();

createMenu = () => {
  console.log('Witaj w menu:');
  console.log('1. Wyswietl wszystkie rekordy');
  console.log('2. Dodaj ');
  console.log('3.Update ');
  console.log('4.Usun ');
  console.log('5.Wyjscie');
};
function addTask( taskManager, timeRepair) {
    console.log("Jestem w addTask");
    counter++;
    let object = {
        taskManager: taskManager,
        timeRepair: timeRepair
    };
    this.database.ref('users/' + counter).set(object);
    console.log("Dodalem do bazy danych!")
}

readAll = () => {
  console.log('Odczyt wszystkich');
};

update = () => {
  console.log('Update zadania ');
};
deleteTask = (taskId) => {
  let userRef = this.database.ref('tasks/' + taskId);
  userRef.remove();
};

action = (choose) => {
  switch (parseInt(choose)) {
    case 1:
      console.log('wybrales wyswietlenie bazy');
      break;
    case 2:
        console.log("Jestem w action")

        addTask("Mateusz Bonar", 25)
      break;
    case 3:
      console.log('Wybrales udpate');
      break;
    case 4:
      console.log('Usun');
      break;
    case 5:
      choose = false;
      console.log('Konczymy program');
      stopScript();
      break;
  }
};

while (choose) {
  createMenu();
  console.log('----------------------------------');
  choose = window.prompt('Podaj wybor: ');
  action(choose);
}
