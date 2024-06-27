import inquirer from 'inquirer';
import chalk from 'chalk';


enum ToDoStatus {
  PENDING = "Pending",
  COMPLETED = "Completed"
}

interface ToDoItem {
  id: number;
  title: string;
  status: ToDoStatus;
}

class ToDoList {
  private todos: ToDoItem[] = [];
  private nextId: number = 1;

  greetUser() {
    console.log(chalk.green("\n\t Welcome to My To-Do List App! \n"));
  }

  sayGoodbye() {
    console.log(chalk.red.bold("\n\t Thank you for using My To-Do List App!.Goodbye! and have a Nice Day!!"));
  }

  addToDo(title: string) {
    let newToDo: ToDoItem = {
      id: this.nextId++,
      title,
      status: ToDoStatus.PENDING
    };
    this.todos.push(newToDo);
    console.log(chalk.blue(`To-Do item added: ${title}`));
  }

  updateToDoStatus(id: number, status: ToDoStatus) {
    const todo = this.todos.find(item => item.id === id);
    if (todo) {
      todo.status = status;
      console.log(chalk.blue(`To-Do item with id ${id} updated to ${status}`));
    } else {
      console.log(chalk.red(`To-Do item with id ${id} not found`));
    }
  }

  showToDos() {
    console.log(chalk.yellowBright.bold("\n\t To-Do List:"));
    this.todos.forEach(todo => {
      console.log(chalk.cyan(`${todo.id}. ${todo.title} - ${todo.status}`));
    });
  }
}

async function create() {
  const myToDoList = new ToDoList();
  myToDoList.greetUser();

  let continueLoop = true;
  while (continueLoop) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'add',
        message:chalk.yellow.bold('What would you like to do?'),
        choices: ['Add To-Do', 'Update To-Do', 'Show To-Dos', 'Exit']
      }
    ]);

    switch (answers.add) {
      case 'Add To-Do':
        const addAnswer = await inquirer.prompt([
          {
            name: 'title',
            type: 'input',
            message: 'Enter the title of the to-do item:'
          }
        ]);
        myToDoList.addToDo(addAnswer.title);
        break;
      
      case 'Update To-Do':
        let updateAnswers = await inquirer.prompt([
          {                    
            name: 'id',
            type: 'input',
            message: chalk.green.bold('Enter to-do item Id to update:')
          },
          {
            name: 'status',
            type: 'list',
            message: chalk.redBright('Select the new status:'),
            choices: [ToDoStatus.PENDING, ToDoStatus.COMPLETED]
          }
        ]);
        myToDoList.updateToDoStatus(parseInt(updateAnswers.id), updateAnswers.status as ToDoStatus);
        break;
      
      case 'Show To-Dos':
        myToDoList.showToDos();
        break;

      case 'Exit':
        continueLoop = false;
        myToDoList.sayGoodbye();
        break;
    }
  }
}
await create();
