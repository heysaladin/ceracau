import { SIGNUP_PAGE_TYPING } from '../../constants';

const initialSignupPageState = {
    inputText: {
        fullName: '',
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
    }
}

export default function signupPage(state=initialSignupPageState, action){
    switch(action.type){  
        case SIGNUP_PAGE_TYPING:
            switch(action.payload.name){
                case 'fullName':
                    return {
                        ...state,
                        inputText: {
                            ...state.inputText,
                            fullName: action.payload.value
                        }
                    };
                case 'username':
                    return {
                        ...state,
                        inputText: {
                            ...state.inputText,
                            username: action.payload.value
                        }
                    };
                case 'email':
                    return {
                        ...state,
                        inputText: {
                            ...state.inputText,
                            email: action.payload.value
                        }
                    };
                case 'password':
                    return {
                        ...state,
                        inputText: {
                            ...state.inputText,
                            password: action.payload.value
                        }
                    };
                case 'passwordConfirmation':
                    return {
                        ...state,
                        inputText: {
                            ...state.inputText,
                            passwordConfirmation: action.payload.value
                        }
                    };
                default: return state;
            }
            
        default: return state;
    }
}