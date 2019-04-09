let ul = document.getElementById('allTodos')
document.querySelector('#task').addEventListener('change', addTask(ul))
// let removeAll = document.getElementById('removeAll')
// let add = document.getElementById('task')
// add.onclick = () => {
// addTask(ul)
// }

function addTask (targetUl) {
  let inputText = document.getElementById('task').value
  let li = document.createElement('li')
  let textNode = document.createTextNode(inputText + ' ')
  let removeButton = document.createElement('button')
  document.getElementById('task').value = ''
  if (inputText.split(' ').join('').length === 0) {
    alert('no input')
    return false
  }

  removeButton.className = 'removeTask'
  removeButton.innerHTML = ' DONE!'
  removeButton.setAttribute('onclick', 'removeTask(this)')
  li.appendChild(textNode)
  li.appendChild(removeButton)
  targetUl.appendChild(li)
}

function removeTask (item) {
  let parent = item.parentElement
  parent.parentElement.removeChild(parent)
}

// removeAll.onclick = function () {
//   ul.innerHTML = ''
// }
