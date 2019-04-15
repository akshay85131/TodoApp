const ul = document.getElementById('allTodos')
let taskName = document.getElementById('task')
let taskArray = window.localStorage.getItem('todo') ? (JSON.parse(window.localStorage.getItem('todo'))) : []

let createNewTask = function (text, id, completed, textBox) {
  let taskList = document.createElement('li')
  let checkBox = document.createElement('input')
  let label = document.createElement('label')
  let eInput = document.createElement('input')
  const notes = document.createElement('textarea')
  let editButton = document.createElement('button')
  let deleteButton = document.createElement('button')
  const noteButton = document.createElement('button')
  // checkBox.addEventListner('click', checkFunc)
  checkBox.type = 'checkBox'
  eInput.type = 'text'
  notes.style.display = 'none'
  editButton.setAttribute('class', 'edit')
  editButton.textContent = 'Edit'
  deleteButton.setAttribute('class', 'delete')
  deleteButton.textContent = 'Delete'
  noteButton.setAttribute('class', 'note')
  noteButton.textContent = 'Note'
  deleteButton.addEventListener('click', deleteTask)
  editButton.addEventListener('click', editTask)
  checkBox.addEventListener('click', checkFunc)
  noteButton.addEventListener('click', noteFunc)
  // console.log(checkBox)
  label.textContent = text
  notes.value = textBox
  // textArealabel.textContent = textBox
  taskList.setAttribute('id', id)
  // textArealabel.setAttribute('class', 'textPara')
  checkBox.checked = completed
  let labelContainer = document.createElement('div')
  // let textareaDiv = document.createElement('div')
  // textareaDiv.setAttribute('class', 'textAreaDiv')
  labelContainer.appendChild(checkBox)
  labelContainer.appendChild(label)
  labelContainer.appendChild(eInput)
  labelContainer.appendChild(notes)
  // textareaDiv.appendChild(textArealabel)
  // para.appendChild(textArea)
  // labelContainer.appendChild(para)
  let liButtons = document.createElement('div')
  liButtons.setAttribute('class', 'liButtons')
  liButtons.appendChild(editButton)
  liButtons.appendChild(deleteButton)
  liButtons.appendChild(noteButton)
  taskList.appendChild(labelContainer)
  // taskList.appendChild(textareaDiv)
  taskList.appendChild(liButtons)
  ul.appendChild(taskList)
  taskName.value = ''
}
function TodoList (name) {
  this.name = name
  this.completed = false
  this.textArea = ' '
  this.id = Math.floor(Math.random() * (taskArray.length + 1234))
}
// console.log(typeof taskArray)
taskArray.forEach(item => {
  createNewTask(item.name, item.id, item.completed, item.textArea)
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
  // console.log('im edit option')
  let editElement = e.target.parentNode.parentNode
  console.log(editElement)
  let editInput = editElement.querySelector('input[type=text]')
  console.log(editInput)
  let label = editElement.querySelector('label')
  console.log(label)
  let button = editElement.getElementsByTagName('button')[0]
  console.log(button)

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
      // console.log(item.id, editElement.id)
      item.name = label.textContent
    }
  }
  window.localStorage.setItem('todo', JSON.stringify(taskArray))
}

function checkFunc (e) {
  if (e.target.checked) {
    let taskItems = JSON.parse(window.localStorage.getItem('todo'))
    for (let item of taskItems) {
      if (item.id * 1 === e.target.parentNode.parentNode.id * 1) {
        item.completed = true
      }
    }
    window.localStorage.setItem('todo', JSON.stringify(taskItems))
  } else {
    let taskItems = JSON.parse(window.localStorage.getItem('todo'))
    for (let item of taskItems) {
      if (item.id * 1 === e.target.parentNode.parentNode.id * 1) {
        item.completed = false
      }
    }
    window.localStorage.setItem('todo', JSON.stringify(taskItems))
  }
}

function noteFunc (e) {
  console.log('im note option')
  let editElement = e.target.parentNode.parentNode
  // console.log(editElement)
  // let result = editElement.querySelector('')
  let editInput = editElement.querySelector('.textAreaDiv')
  console.log(editInput)
  let para = editElement.querySelector('.textPara')
  console.log(para)
  let button = editElement.getElementsByTagName('button')[2]
  // console.log(button)

  let containsClass = editElement.classList.contains('editMode')
  if (containsClass) {
    para.innerText = editInput.value
    button.textContent = 'Note'
    button.classList.remove('ReadNote')
  } else {
    editInput.value = para.innerText
    button.textContent = 'ReadNote'
    button.classList.add('ReadNote')
  }
  editElement.classList.toggle('editMode')
  let taskArray = JSON.parse(window.localStorage.getItem('todo'))
  for (let item of taskArray) {
    if (item.id * 1 === editElement.id * 1) {
      // console.log(item.id, editElement.id)

      item.textArea = para.textContent
    }
  }

  editInput.style.display = 'none'
  editInput.editMode.style.display = 'inline-block'
  editInput.editMode.label.style.display = 'none'
  window.localStorage.setItem('todo', JSON.stringify(taskArray))
}
