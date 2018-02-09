import { AUTHENTICATING_USER, AUTHENTICATION_ABORTED } from '../../constants';
import { loginSuccess, loginFailure, setToken } from '../../actions/PageActions/loginPage';
import { getInitialPosts } from '../../actions/PageActions/newsfeedPage';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const loginEpic = action$ => 
	action$.ofType(AUTHENTICATING_USER)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/auth', action.payload))
				.flatMap((res) => Observable.of(loginSuccess(res), setToken(res), getInitialPosts()))
				.takeUntil(action$.ofType(AUTHENTICATION_ABORTED))
				.catch(error => Observable.of(loginFailure(error)))
		)