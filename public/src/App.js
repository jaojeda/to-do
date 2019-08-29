import ToDoApp from './components/app/ToDoApp.js';

const app = new ToDoApp();
document.body.prepend(app.renderDOM());