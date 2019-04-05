function getTodos () {
  let todos = []
  let todosStr = localStorage.getItem('todo')
  if (todosStr !== null) {
    todos = JSON.parse(todosStr)
  }
  return todos
}

function add () {
  let task = document.getElementById('task').value

  let todos = getTodos()
  todos.push(task)
  localStorage.setItem('todo', JSON.stringify(todos))

  show()

  return false
}

function remove () {
  let id = this.getAttribute('id')
  let todos = getTodos()
  todos.splice(id, 1)
  localStorage.setItem('todo', JSON.stringify(todos))

  show()

  return false
}

function show () {
  let todos = getTodos()
  // console.log(todos)

  let html = '<ul>'
  for (let i = 0; i < todos.length; i++) {
    html += '<li class="taskItems">' + todos[i] + '<button class="remove" id="' + i + '">x</button></li>'
  };
  html += '</ul>'

  document.getElementById('todos').innerHTML = html

  let buttons = document.getElementsByClassName('remove')
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', remove)
  };
}

document.getElementById('add').addEventListener('click', add)
show()
