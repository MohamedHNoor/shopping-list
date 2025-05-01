const form = document.getElementById('item-form')
const input = document.getElementById('item-input')
const list = document.getElementById('item-list')

// add new Item function
function addItem(e) {
  e.preventDefault()

  const newItem = input.value

  // validate input
  if (newItem === '') {
    alert('Please add an item!')
    return
  }

  // create an item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(newItem))
  const button = createButton('remove-item btn-link text-red')

  li.appendChild(button)
  list.appendChild(li)

  input.value = ''
}

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove()
  }
}

// event listener
form.addEventListener('submit', addItem)
list.addEventListener('click', removeItem)
