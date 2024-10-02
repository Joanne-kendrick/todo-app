document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const task = input.value;
        if (task) {
            const li = document.createElement('li');
            li.textContent = task;
            todoList.appendChild(li);
            input.value = ''; // Clear input after adding task
        }
    });
});
