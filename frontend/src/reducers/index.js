import { combineReducers } from 'redux';
import { capitalize } from '../utils/helpers';

import {
  RECEIVE_CATEGORIES,
  SELECT_CATEGORY,
  RECEIVE_POSTS,
  UP_VOTE_POST,
  DOWN_VOTE_POST
} from '../actions'

function categories (state = {categories: [], selected: ''}, action) {
  const { categories } = action;

  switch (action.type) {
    case RECEIVE_CATEGORIES:
      const optionsCategoryFormated = categories.map((category) => (
        {value: category.path, label: capitalize(category.name)}));
      optionsCategoryFormated.unshift({value: 'all', label: 'All'});
      return {
        ...state,
        categories: optionsCategoryFormated,
        selected: optionsCategoryFormated[0]
      };
    case SELECT_CATEGORY:
      const { category } = action;
      return {
        ...state,
        selected: category
      };
    default :
      return state;
  }
}

function posts (state = {posts: []}, action) {
  const { posts, post } = action;

  switch (action.type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        posts
      };
    case UP_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(postElement => {
          if (postElement.id === post.id) {
            return post;
          }
          return postElement;
        })
      };
    case DOWN_VOTE_POST:
      return {
        ...state,
        posts: state.posts.map(postElement => {
          if (postElement.id === post.id) {
            return post;
          }
          return postElement;
        })
      };
    default :
      return state;
  }
}

export default combineReducers({
  categories,
  posts
})