import Component from '../Component.js';

class ToDoItem extends Component {

    onRender(dom) {
        const item = this.props.item;
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.inactive-button');
        inactiveButton.addEventListener('click', () => {
            console.log(item, 'inactive!');
            onUpdate(item);
        });

        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            console.log(item, 'deleted!');
            onRemove(item);
        });
    }

    renderHTML() {
        const item = this.props.item;
        
        return /*html*/`
        <li class="to-do-item">
            <button class="mark-done"> ☐ </button>
            <div class="to-do-text">
                <p>
                    ${item.name}
                </p>
            </div>
            <button class="remove-button"> ⎋ </button>
        </li>
        `;
    }
}

export default ToDoItem;