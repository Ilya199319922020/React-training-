import React from 'react';
import profileReducer, { addProfileActionCreator } from './profileReducer';

let state = {
	postData: [
		{ like: 1, post: 'post 1', id: 1 },
		{ like: 2, post: 'post 2', id: 2 },
		{ like: 0, post: 'post 3', id: 3 },
		{ like: 1, post: 'post 4', id: 4 },
		{ like: 52, post: 'post 5', id: 5 },
		{ like: 10, post: 'post 6', id: 6 },
	],
}

it('length of posts should be incremented', () => {
	let action = addProfileActionCreator('hello');

	let newState = profileReducer(state, action);

	expect(newState.postData.length).toBe(7);

});