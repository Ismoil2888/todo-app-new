const emptyListTemplate = document.querySelector('#emptyList');
const todoList = document.querySelector('#todoList');
const taskForm = document.querySelector('#taskForm');

taskForm.addEventListener('submit', addTask);

// Добавляем Список дел пуст при загрузке страницы если элементов нет в списке задач
document.addEventListener('DOMContentLoaded', checkTodoCount);

// Функция для добавления/удаления Список дел пуст
function checkTodoCount() {
    console.log('todoList.children.length', todoList.children.length);
    const emptyContent = emptyListTemplate.content.cloneNode(true);
    if (todoList.children.length == 0) {
        todoList.appendChild(emptyContent);
    } else if (todoList.children.length > 1) {
        const emptyEl = document.querySelector('#empty');
        if (emptyEl) {
            emptyEl.remove();
        }
    }
}

// Функция для добавления задач
function addTask(evt) {
    evt.preventDefault();
    const taskInput = document.querySelector('#taskText');
    const taskText = taskInput.value.trim();
    if (taskText.length == 0) {
        taskInput.focus();
        taskInput.classList.add('with-error');
        if (
            taskInput.nextElementSibling !== null &&
            taskInput.nextElementSibling.id == 'emptyError'
        ) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.id = 'emptyError';
        errorDiv.classList.add('text-danger');
        errorDiv.textContent =
            'Название задачи не может быть пустым или состоять только из пробельных символов';
        taskInput.insertAdjacentElement('afterend', errorDiv);
        return;
    }
    const taskElem = document.querySelector('#todoElement').content.cloneNode(true);
    const taskLi = taskElem.querySelector('li');
    taskLi.insertAdjacentText('afterbegin', taskText);
    todoList.appendChild(taskElem);
    checkTodoCount();
    taskInput.value = '';
    taskInput.focus();
}
