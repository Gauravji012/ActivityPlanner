import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { todosReducers } from './reducers/todosReducer';
import { tabReducer } from './reducers/tabReducer';


/*
combineReducers:
combineReducers is a function provided by Redux that allows you to combine multiple reducers into a single 
reducer function. Reducers are functions responsible for managing specific parts of your application's state. 
By using combineReducers, you can manage different parts of your state using different reducer functions
*/
const reducer = combineReducers({
    todos: todosReducers,
    currentTab: tabReducer
})

/*
Middleware in Redux allows you to intercept actions before they reach reducers, enabling you to perform 
additional logic like logging, asynchronous operations, or other side effects. It helps keep your codebase 
clean by separating concerns and making it easier to manage complex operations in your Redux application.
*/
//middleware --> redux thunk, redux saga
const middleware = [thunk];

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;