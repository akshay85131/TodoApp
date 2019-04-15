const ul = document.getElementById('allTodos')
let taskName = document.getElementById('task')
let taskArray = window.localStorage.getItem('todo') ? (JSON.parse(window.localStorage.getItem('todo'))) : []

let createNewTask = function (text, id, completed) {
  let taskList = document.createElement('li')
  let checkBox = document.createElement('input')
  let label = document.createElement('label')
  let eInput = document.createElement('input')
  let editButton = document.createElement('button')
  let deleteButton = document.createElement('button')

  // checkBox.addEventListner('click', checkFunc)
  checkBox.type = 'checkBox'
  eInput.type = 'text'
  editButton.setAttribute('class', 'edit')
  editButton.textContent = 'Edit'
  // editButton.className = 'edit'
  deleteButton.setAttribute('class', 'delete')
  // deleteButton.setAttribute('id', 'del' + id)
  deleteButton.textContent = 'Delete'
  // deleteButton.className = 'delete'
  deleteButton.addEventListener('click', deleteTask)
  editButton.addEventListener('click', editTask)
  label.textContent = text
  taskList.setAttribute('id', id)
  checkBox.checked = completed
  let labelContainer = document.createElement('div')
  labelContainer.appendChild(checkBox)
  labelContainer.appendChild(label)
  labelContainer.appendChild(eInput)
  let liButtons = document.createElement('div')
  liButtons.setAttribute('class', 'liButtons')
  liButtons.appendChild(editButton)
  liButtons.appendChild(deleteButton)
  taskList.appendChild(labelContainer)
  taskList.appendChild(liButtons)
  ul.appendChild(taskList)
  taskName.value = ''
}
function TodoList (name) {
  this.name = name
  this.completed = false
  this.id = Math.floor(Math.random() * (taskArray.length + 1234))
}
// console.log(typeof taskArray)
taskArray.forEach(item => {
  createNewTask(item.name, item.id, item.completed)
})

document.getElementById('add').addEventListener('click', function () {
  console.log('Added task...')
  if (taskName.value) {
    let taskObj = new TodoList(taskName.value)
    taskArray.push(taskObj)
    // console.log( taskArray)
    window.localStorage.setItem('todo', JSON.stringify(taskArray))
    createNewTask(taskName.value, taskObj.id, this.completed)
  }
})

function deleteTask (e) {
  let list = e.target.parentNode.parentNode
  ul.removeChild(list)
  let taskArray1 = (JSON.parse(window.localStorage.getItem('todo')))
  console.log(list.id)
  for (let item of taskArray1) {
    console.log(item.id)
    if (item.id * 1 === list.id * 1) {
      taskArray1.splice(item, 1)
    }
  }
  window.localStorage.setItem('todo', JSON.stringify(taskArray1))
}
function editTask (e) {
  console.log('im edit option')
  let editElement = e.target.parentNode.parentNode
  // console.log(editElement)
  let editInput = editElement.querySelector('input[type=text]')
  // console.log(editInput)
  let label = editElement.querySelector('label')
  // console.log(label)
  let button = editElement.getElementsByTagName('button')[0]
  // console.log(button)

  let containsClass = editElement.classList.contains('editMode')
  if (containsClass) {
    label.innerText = editInput.value
    button.textContent = 'Edit'
    button.classList.remove('save')
  } else {
    editInput.value = label.innerText
    button.textContent = 'Save'
    button.classList.add('save')
  }
  editElement.classList.toggle('editMode')
  let taskArray = JSON.parse(window.localStorage.getItem('todo'))
  for (let item of taskArray) {
    if (item.id * 1 === editElement.id * 1) {
      console.log(item.id, editElement.id)
      item.name = label.textContent
    }
  }
  window.localStorage.setItem('todo', JSON.stringify(taskArray))
}
