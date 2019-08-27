import Component from '../Component.js';
import Header from './Header.js';

class ToDoApp extends Component {

    onRender(dom){
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);

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