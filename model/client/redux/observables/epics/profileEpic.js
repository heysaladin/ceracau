import { FETCHING_PROFILE, FETCHING_PROFILE_ABORTED } from '../../constants';
import { fetchingProfileSuccess, fetchingProfileFailure } from '../../actions/PageActions/profilePage';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const profileEpic = action$ => 
	action$.ofType(FETCHING_PROFILE)
		.mergeMap(action => 
			Observable.fromPromise(axios.get(`/profile/${action.payload}`))
				.map(res => fetchingProfileSuccess(res.data))
				.takeUntil(action$.ofType(FETCHING_PROFILE_ABORTED))
				.catch(error => Observable.of(fetchingProfileFailure(error)))
        )
            