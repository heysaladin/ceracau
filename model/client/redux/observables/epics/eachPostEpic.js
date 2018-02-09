import { ON_COMMENT_FOCUSED, FETCHING_COMMENTS_ABORTED, PROCESSING_LIKE, PROCESSING_LIKE_ABORTED } from '../../constants';
import { fetchingCommentsSuccess, fetchingCommentsFailure,
        processingLikeSuccess, processingLikeFailure } from '../../actions/eachPost';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const fetchCommentsEpic = action$ => 
	action$.ofType(ON_COMMENT_FOCUSED)
		.mergeMap(action => 
			Observable.fromPromise(axios.get(`/api/posts/comment/fetch/${action.pureId}`))
				.map((res) => fetchingCommentsSuccess(res.data))
				.takeUntil(action$.ofType(FETCHING_COMMENTS_ABORTED))
				.catch(error => Observable.of(fetchingCommentsFailure(error)))
        )
        
export const likeEpic = action$ => 
	action$.ofType(PROCESSING_LIKE)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/posts/like/submit', action.payload))
				.map((res) => processingLikeSuccess(res.data))
				.takeUntil(action$.ofType(PROCESSING_LIKE_ABORTED))
				.catch(error => Observable.of(processingLikeFailure(error)))
        )
            
