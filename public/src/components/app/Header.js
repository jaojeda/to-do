import Component from '../Component.js';
import store from '../services/store.js';

class Header extends Component {

    onRender(dom) {
        if(store.hasToken()) {
            const button = dom.querySelector('.log-out');
            button.classList.remove('hidden');

            button.addEventListener('click', () => {
                store.removeToken();
                location = './';
            });
        }
    }
    renderHTML() {
        return /*html*/`
            <header>
                <h1>Checklist</h1>
                <button class="log-out hidden">Log Out</button>
            </header>
        `;
    }
}

export default Header;