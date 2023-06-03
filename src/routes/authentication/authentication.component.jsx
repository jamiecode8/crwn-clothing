import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth 
} from '../../utils/firebase/firebase.utils'

import SignUpForm from '../../components/sign-up-form/sign-up-form.component.jsx'
import SignInForm from '../../components/sign-in-form/sign-in-form.component.jsx'

const authentication = () => {

    return (
        <div>
            <h1>Sign In Page</h1>
            <SignInForm />
            <SignUpForm />
        </div>
    );
};

export default authentication;