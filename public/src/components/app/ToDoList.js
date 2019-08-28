import Component from '../Component.js';
import ToDoItem from './ToDoItem.js';

class ToDoList extends Component {

    onRender(list) {
        const items = this.props.items;
        console.log(items);
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        items.forEach(item => {
            const toDoItem = new ToDoItem({ item, onUpdate, onRemove });
            list.appendChild(toDoItem.renderDOM());
        });

    }
    renderHTML() {
        return /*html*/`
            <ul class="to-do-list"></ul>
        `;
    }
}

export default ToDoList;