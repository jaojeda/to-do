import ToDoItem from '../src/components/app/ToDoItem.js';
const test = QUnit.test;

QUnit.module('To Do Item');

test('renders', assert => {
    const item = {
        id: 1,
        task: 'Do laundry',
        inactive: false
    };

    const expected = /*html*/`
    <li class="to-do-item">
        <button class="mark-done"> ☐ </button>
        <div class="to-do-text">
            <p> 
                Do laundry
            </p>
        </div>
        <button class="remove-button"> ⎋ </button>
    </li>
    `;

    const toDoItem = new ToDoItem({ item });
    const html = toDoItem.renderHTML();

    assert.htmlEqual(html, expected);
});