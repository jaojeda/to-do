import Component from '../Component.js';

class NewItemForm extends Component {

    onRender(dom) {
        const onAdd = this.props.onAdd;
        const form = dom.querySelector('form');
        const input = dom.querySelector('input[name=item]');
        const error = dom.querySelector('p.error');

        form.addEventListener('submit', event => {
            event.preventDefault();

            const item = {
                task: input.value
            };
            error.textContent = '';
    
            onAdd(item)
                .then(() => {
                    form.reset();
                    document.activeElement.blur();
                })
                .catch(err => {
                    error.textContent = err;
                });
        });

    }

    renderHTML() {
        return /*html*/`
            <section class="item-form-section">
                <form class="item-form">
                    <input name="item" required>
                    <button>Add</button>
                </form>
                <p class="error"></p>
            </section>
        `;
    }
}

export default NewItemForm;