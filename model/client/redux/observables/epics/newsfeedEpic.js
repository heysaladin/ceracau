import { POSTING_CONTENT, 
		 POSTING_ABORTED, 
		 FETCHING_INITIAL_POSTS, 
		 INITIAL_POSTS_ABORTED,
		 FETCHING_RECENT_POSTS,
		 RECENT_POSTS_ABORTED,
		 SUBMITTING_COMMENT,
		 SUBMITTING_COMMENT_ABORTED } from '../../constants';
import { postingSuccess, 
		 postingFailure,
		 initialPostsSuccess,
		 initialPostsFailure,		  
		 recentPostsSuccess,
		 recentPostsFailure,
		 getRecentPosts} from '../../actions/PageActions/newsfeedPage';
import {
		submittingCommentSuccess,
		submittingCommentFailure } from '../../actions/eachPost';

import 'rxjs';
import { Observable } from 'rxjs/Observable';
import axios from 'axios';

export const postingContentEpic = action$ => 
	action$.ofType(POSTING_CONTENT)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/posts/submit', action.payload))
				.flatMap(res => Observable.of(postingSuccess(res), getRecentPosts(action.payload.latestPost)))
				.takeUntil(action$.ofType(POSTING_ABORTED))
				.catch(error => Observable.of(postingFailure(error)))
		)

export const initialPostsEpic = action$ => 
	action$.ofType(FETCHING_INITIAL_POSTS)
		.mergeMap(action => 
			Observable.fromPromise(axios.get('/api/posts/initial'))
				.map(res => initialPostsSuccess(res.data))
				.takeUntil(action$.ofType(INITIAL_POSTS_ABORTED))
				.catch(error => Observable.of(initialPostsFailure(error)))
		)

export const recentPostsEpic = action$ => 
	action$.ofType(FETCHING_RECENT_POSTS)
		.mergeMap(action => 
			Observable.fromPromise(axios.get(`/api/posts/recent/latestPost?date=${action.payload}`))
				.map(res => recentPostsSuccess(res.data))
				.takeUntil(action$.ofType(RECENT_POSTS_ABORTED))
				.catch(error => Observable.of(recentPostsFailure(error)))
		)

export const commentEpic = action$ =>
	action$.ofType(SUBMITTING_COMMENT)
		.mergeMap(action => 
			Observable.fromPromise(axios.post('/api/posts/comment/submit', action.payload))
				.map(res => submittingCommentSuccess(res.data))
				.takeUntil(action$.ofType(SUBMITTING_COMMENT_ABORTED))
				.catch(error => Observable.of(submittingCommentFailure(error)))
		)