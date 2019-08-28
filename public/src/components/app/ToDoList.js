import Component from '../Component.js';
import ToDoItem from './ToDoItem.js';

class ToDoList extends Component {

    onRender(list) {
        const items = this.props.items;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        items.forEach(item => {
            const toDoItem = new ToDoItem({ item, onUpdate, onRemove });
            list.appendChild(toDoItem.renderDOM());
        });

    }
    renderHTML() {
        return /*html*/`
            <div class="to-do-container">
                <h2 class="to-do-header">To Do</h2>
                <ul class="to-do-list"></ul>
            </div>   
        `;
    }
}

export default ToDoList;