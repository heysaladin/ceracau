import { AUTHENTICATING_USER, AUTHENTICATION_ABORTED } from '../../constants';
import { REGISTERING_USER, REGISTRATION_ABORTED } from '../../constants';
import { signupSuccess, signupFailure, navigateTo } from '../../actions/PageActions/signupPage';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const signupEpic = (action$, store) => 
	action$.ofType(REGISTERING_USER)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/register', action.payload))
				.flatMap((res) => Observable.of(signupSuccess(res), navigateTo('/')))
				.takeUntil(action$.ofType(REGISTRATION_ABORTED))
				.catch(error => Observable.of(signupFailure(error)))
		)