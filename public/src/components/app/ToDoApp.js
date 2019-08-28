import Component from '../Component.js';
import Header from './Header.js';
import ToDoList from './ToDoList.js';
import NewItemForm from './NewItemForm.js';
import { getItems, addItem, updateItem, removeItem } from '../services/tasks-api.js';

class ToDoApp extends Component {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);

        const main = dom.querySelector('main');

        const toDoList = new ToDoList({
            items: [],
            onUpdate: item => {

                return updateItem(item)
                    .then(updated => {
                        const items = this.state.items;
                        const index = items.indexOf(item);
                        items.splice(index, 1, updated);
                        toDoList.update({ items });
                    });

            },
            onRemove: item => {
                return removeItem(item.id)
                    .then(() => {
                        const items = this.state.items;
                        const index = items.indexOf(item);
                        items.splice(index, 1);
                        toDoList.update({ items });
                    });
            }
        });
        main.appendChild(toDoList.renderDOM()); 

        const itemForm = new NewItemForm({
            onAdd: item => {
                return addItem(item)
                    .then(saved => {
                        const items = this.state.items;
                        items.push(saved);
                        toDoList.update({ items });
                    });
            }
        });
        main.appendChild(itemForm.renderDOM());

        getItems({ showAll: true })
            .then(items => {
                this.state.items = items;
                toDoList.update({ items });
            })
            .catch(err => {
                console.log(err);// eslint-disable-line no-console
            });
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