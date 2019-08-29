import Component from '../Component.js';

class ToDoItem extends Component {

    onRender(dom) {
        const item = this.props.item;
  
        const onUpdate = this.props.onUpdate;
        const onRemove = this.props.onRemove;

        const inactiveButton = dom.querySelector('.mark-done');
        inactiveButton.addEventListener('click', () => {
            item.inactive = !item.inactive;
            onUpdate(item);
        });

        const removeButton = dom.querySelector('.remove-button');
        removeButton.addEventListener('click', () => {
            if(confirm(`Are you sure you want to remove "${item.task}"?`)) {
                onRemove(item);
            }
        });
    }

    renderHTML() {
        const item = this.props.item;

        return /*html*/`
        <li class="to-do-item">
            <button class="mark-done"> ${item.inactive ? '☑' : '☐'} </button>
            <div class="to-do-text">
                <p class ="${item.inactive ? 'inactive' : ''}">
                    ${item.task}
                </p>
            </div>
            <button class="remove-button"> ⎋ </button>
        </li>
        `;
    }
}

export default ToDoItem;