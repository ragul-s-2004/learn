document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const list = document.getElementById('todo-list');

    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    renderTodos();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const text = input.value.trim();
        if (text) {
            todos.push({ text, completed: false });
            input.value = '';
            saveAndRender();
        }
    });

    list.addEventListener('click', function(e) {
        if (e.target.classList.contains('complete-btn')) {
            const idx = e.target.parentElement.parentElement.dataset.index;
            todos[idx].completed = !todos[idx].completed;
            saveAndRender();
        } else if (e.target.classList.contains('delete-btn')) {
            const idx = e.target.parentElement.parentElement.dataset.index;
            todos.splice(idx, 1);
            saveAndRender();
        }
    });

    function saveAndRender() {
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }

    function renderTodos() {
        list.innerHTML = '';
        todos.forEach((todo, idx) => {
            const li = document.createElement('li');
            li.className = 'todo-item' + (todo.completed ? ' completed' : '');
            li.dataset.index = idx;
            li.innerHTML = `
                <span>${todo.text}</span>
                <span class="todo-actions">
                    <button class="complete-btn" title="Mark as done">✔️</button>
                    <button class="delete-btn" title="Delete">🗑️</button>
                </span>
            `;
            list.appendChild(li);
        });
    }
});
