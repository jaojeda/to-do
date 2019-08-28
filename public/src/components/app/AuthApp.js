import Component from '../Component.js';
import Header from './Header.js';
import SignUp from './auth/SignUp.js';
import SignIn from './auth/SignIn.js';
import store from '../services/store.js';
import { signUp as userSignUp, signIn as userSignIn } from '../services/tasks-api.js';

function success(user) {
    console.log(user);
    store.setToken(user.token);
    const searchParams = new URLSearchParams(location.search);
    location = searchParams.get('redirect') || './';
}

class AuthApp extends Component {

    onRender(dom) {
        const header = new Header();
        const headerDOM = header.renderDOM();
        dom.prepend(headerDOM);

        const errors = dom.querySelector('.errors');
        const signUpContainer = dom.querySelector('.sign-up-container');
        const signInContainer = dom.querySelector('.sign-in-container');

        const signUp = new SignUp({
            onSignUp: newUser => {
                errors.textContent = '';

                return userSignUp(newUser)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signUpContainer.appendChild(signUp.renderDOM());

        const signIn = new SignIn({
            onSignIn: credentials => {
                errors.textContent = '';

                return userSignIn(credentials)
                    .then(user => {
                        success(user);
                    })
                    .catch(err => {
                        errors.textContent = err;
                    });
            }
        });
        signInContainer.appendChild(signIn.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <main>
                    <div class="input-container">
                        <p class="errors"></p>
                        <section class="sign-up-container"></section>
                        <section class="sign-in-container"></section>
                    </div>       
                </main>  
            </div>  
        `;
    }
}

export default AuthApp;