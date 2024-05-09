import express from 'express';
import bodyParser from 'body-parser';

const app = express();

const PORT = 5111;

app.use(bodyParser.json());

app.all('/', (req, res) => {
	// console.log('Request ==>', req);
	// console.log('Response ==>', res);
	res.send('I am up!');
});

const todos = [
	{ id: '1', titile: 'Task 1', completed: false },
	{ id: '2', titile: 'Task 2', completed: true },
];
// Read
app.get('/todos', (req, res) => {
	res.json(todos);
});

// Create
app.post('/todos', (req, res) => {
	const newTodo = req.body;
	todos.push(newTodo);
	res.json({
		message: 'New Todo Added!',
	});
});

// Update
app.put('/todos/:id', (req, res) => {
	const newTodoData = req.body;
	const todoParamId = req.params.id;
	const todoIndex = todos.findIndex((td) => td.id === todoParamId);
	if (todoIndex !== -1) {
		todos[todoIndex] = {
			id: todoParamId,
			...newTodoData,
		};
	} else {
		res.status(400).json({
			message: 'Todo ID does not exist',
		});
	}

	res.json({
		message: 'Todo updated successfully!',
	});
});

// Delete
app.delete('/todos/:id', (req, res) => {
	const todoParamId = req.params.id;
	const todoIndex = todos.findIndex((td) => td.id === todoParamId);
	if (todoIndex !== -1) {
		todos.splice(todoIndex, 1);
	}
	res.json({
		message: 'Todo deleted successfully!',
	});
});

app.listen(PORT, () => {
	console.log(`Server running at port ${PORT}`);
});
