import './style.css';

function todo_item(title, description, dueDate, priority) {
  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;
}

export default function printMe() {
  console.log("It's a me, Mario! And Luigi!");
}
