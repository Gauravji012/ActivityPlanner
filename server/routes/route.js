import express, { Router } from 'express';


import { addTodo, getAllTodos, toggleTodoDone, updateTodo, deleteTodo } from '../controller/todo-controller.js';

//This router object is used to define routes for handling different HTTP requests.
const route = express.Router(); //router object


// POST route at /todos that invokes the addTodo function when the route is accessed with a POST request.
route.post('/todos', addTodo)
// we use get api for getAllTodos action
route.get('/todos', getAllTodos);
// we use get api for toggleTodoDone action
route.get('/todos/:id', toggleTodoDone);
// we use put api for updateTodo action
route.put('/todos/:id', updateTodo);

// we use delete api for deleteTodo action
route.delete('/todos/:id', deleteTodo);


export default route;