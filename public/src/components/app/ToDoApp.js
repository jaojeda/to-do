import Component from '../Component.js';
import Header from './Header.js';
import ToDoList from './ToDoList.js';
import ToDoItem from './ToDoItem.js';
import NewItemForm from './NewItemForm.js';

class ToDoApp extends Component {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);

        const main = dom.querySelector('main');

        const toDoList = new ToDoList({
            items: [],
            onUpdate: item => {

                
            }
        }) 
    }

    renderHTML(){
        return /*html*/`
        <div>
            <main>       
            </main>  
        </div>
        `;
    }
}

export default ToDoApp;