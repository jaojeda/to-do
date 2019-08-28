import Component from '../Component.js';
import Header from './Header.js';

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    <div class="input-container">
                        <section class="sign-up"></section>
                        <section class="sign-in"></section>
                    </div>       
                </main>  
            </div>  
        `;
    }
}

export default AuthApp;