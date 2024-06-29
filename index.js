// script.js
document.addEventListener('DOMContentLoaded', loadTasks);
document.getElementById('task-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        addTask(taskText);
        saveTask(taskText);
        taskInput.value = '';
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('task-list');

    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        updateTask(taskText, listItem.classList.contains('completed'));
    });

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', function() {
        const newText = prompt('Edit your task:', taskText);
        if (newText) {
            listItem.firstChild.nodeValue = newText;
            editTask(taskText, newText);
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
        deleteTask(taskText);
    });

    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTask(task.text);
        if (task.completed) {
            document.querySelector(`li:contains("${task.text}")`).classList.add('completed');
        }
    });
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTask(taskText, completed) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.map(task => task.text === taskText ? { text: taskText, completed: completed } : task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function editTask(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.map(task => task.text === oldText ? { text: newText, completed: task.completed } : task);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function deleteTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const updatedTasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
