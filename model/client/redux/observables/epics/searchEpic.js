import { SEARCHING, SEARCHING_ABORTED, PROCESSING_FOLLOW, PROCESSING_FOLLOW_ABORTED } from '../../constants';
import { searchingSuccess, searchingFailure } from '../../actions/search';
import { processingFollowSuccess, processingFollowFailure } from '../../actions/follow';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const searchEpic = action$ => 
	action$.ofType(SEARCHING)
		.mergeMap(action => 
			Observable.fromPromise(axios.get(`/search/str/${action.payload}`))
				.flatMap(res => Observable.of(searchingSuccess(res.data)))
				.takeUntil(action$.ofType(SEARCHING_ABORTED))
				.catch(error => Observable.of(searchingFailure(error)))
        )
            
export const followEpic = action$ => 
	action$.ofType(PROCESSING_FOLLOW)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/users/follow', action.payload))
				.map(res => processingFollowSuccess(res.data))
				.takeUntil(action$.ofType(PROCESSING_FOLLOW_ABORTED))
				.catch(error => Observable.of(processingFollowFailure(error)))
		)