import Todo from '../model/Todo.js';


//The functions addTodo, getAllTodos, toggleTodoDone, updateTodo, and deleteTodo 
// are controller functions responsible for handling different HTTP requests related to todo items.
/*
// Add Todo:
  The addTodo function handles the HTTP POST request to create a new todo item. 
 It receives the todo data from the request body, creates a new Todo object using a model 
 (presumably defined elsewhere), sets the creation timestamp, saves the new todo item to the database,
  and then responds with the newly created todo item in JSON format.
*/
export const addTodo = async (request, response) => {
    try {
        const newTodo = await Todo.create({
            data: request.body.data,
            createdAt: Date.now()
        })

        await newTodo.save();

        return response.status(200).json(newTodo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
/*
Get All Todos:
The getAllTodos function handles the HTTP GET request to retrieve all existing todo items. 
It queries the database for all todo items, sorts them by creation timestamp in descending order, 
and then responds with the list of todo items in JSON format.
*/ 
export const getAllTodos = async (request, response) => {
    try {
        const todos = await Todo.find({}).sort({ 'createdAt': -1 })

        return response.status(200).json(todos);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}

/*
 Toggle Todo Done: 
 The toggleTodoDone function handles the HTTP GET request to toggle the "done" status of a specific todo
 item identified by its ID. It finds the todo item by its ID, toggles its "done" status, saves the updated 
 todo item to the database, and then responds with the updated todo item in JSON format.
 */
export const toggleTodoDone = async (request, response) => {
    try {
        const todoRef = await Todo.findById(request.params.id);

        const todo = await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { done: !todoRef.done }
        )

        await todo.save();

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
/*
Update Todo:
The updateTodo function handles the HTTP PUT request to update the data of a specific todo item identified 
by its ID. It finds the todo item by its ID, updates its data with the new data from the request body, saves
the updated todo item to the database, and then responds with the updated todo item in JSON format.
*/
export const updateTodo = async (request, response) => {
    try {
        await Todo.findOneAndUpdate(
            { _id: request.params.id },
            { data: request.body.data }
        )

        const todo = await Todo.findById(request.params.id);

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}
/*

Delete Todo:
The deleteTodo function handles the HTTP DELETE request to delete a specific todo item identified by its ID. 
It finds the todo item by its ID, deletes it from the database, and then responds with the deleted todo item
in JSON format.
*/
export const deleteTodo = async (request, response) => {
    try {
        const todo = await Todo.findByIdAndDelete(request.params.id)

        return response.status(200).json(todo);
    } catch (error) {
        return response.status(500).json(error.message);
    }
}