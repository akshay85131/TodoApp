const ul = document.getElementById('allTodos')
let taskName = document.getElementById('task').value
let taskArray = window.localStorage.getItem('todoItems') ? JSON.parse(window.localStorage.getItem('todoItems')) : []
// document.getElementById('add').addEventListener('click', add)

let createNewTask = function (text, id, completed) {
  let taskList = document.createElement('li')
  let checkBox = document.createElement('input')
  let label = document.createElement('label')
  let editButton = document.createElement('button')
  let deleteButton = document.createElement('button')
  let editInput = document.createElement('input')
  // checkBox.addEventListner('click', checkFunc)
  checkBox.type = 'checkBox'
  editInput.type = 'text'
  editButton.setAttribute('class', 'edit')
  editButton.textContent = 'Edit'
  editButton.className = 'edit'
  deleteButton.setAttribute('class', 'delete')
  deleteButton.textContent = 'Delete'
  deleteButton.className = 'delete'
  label.textContent = text
  /// /////////////////////////////////////////////////
  // editButton.addEventListener('click', editTask)
  // let buttonText = editButton.textContent
  // let editButtonText = function () {
  //   if (buttonText === 'Edit') {
  //     buttonText.textContent = 'Save'
  //   } else {
  //     buttonText.textContent = 'Edit'
  //   }
  // }
  // editButton.addEventListener('click', editButtonText)

  /// /////////////////////////////////////

  taskList.setAttribute('id', id)
  checkBox.checked = completed
  let labelContainer = document.createElement('div')
  labelContainer.appendChild(checkBox)
  labelContainer.appendChild(label)
  labelContainer.appendChild(editInput)
  let butn = document.createElement('div')
  butn.appendChild(editButton)
  butn.appendChild(deleteButton)
  taskList.appendChild(labelContainer)
  taskList.appendChild(butn)
  ul.appendChild(taskList)
  taskName.value = ''
}
function TodoList (name) {
  this.name = name
  this.completed = false
  this.id = Math.floor(Math.random() * (taskArray.length + 1234))
}
taskArray.forEach(item => {
  createNewTask(item.name, item.id, item.completed)
})

document.getElementById('task').addEventListener('click', function () {
  console.log('Add task...')
  if (taskName.value) {
    let taskObj = new TodoList(taskName.value)
    taskArray.push(taskObj)
    // console.log(typeof taskArray)
    window.localStorage.setItem('todoItems', JSON.stringify(taskArray))
    createNewTask(taskName.value, taskObj.id, this.completed)
  }
})

// function checkFunc (e) {
//   console.log('im working')
//   if (e.target.checked) {
//     let taskItems = JSON.parse(window.localStorage.getItem('todoItems'))
//     for (let item of taskItems) {
//       if (item.id === e.target.parentNode.parentNode.id) {
//         item.completed = true
//       }
//     }
//     window.localStorage.setItem('todoItems', JSON.stringify(taskItems))
//   } else {
//     let taskItems = JSON.parse(window.localStorage.getItem('todoItems'))
//     for (let item of taskItems) {
//       if (item.id === e.target.parentNode.parentNode.id) {
//         item.completed = false
//       }
//     }
//     window.localStorage.setItem('todoItems', JSON.stringify(taskItems))
//   }
// }
