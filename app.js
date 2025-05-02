const form = document.getElementById('item-form')
const input = document.getElementById('item-input')
const list = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const filterItem = document.getElementById('filter')

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()

  itemsFromStorage.forEach((item) => addItemToDom(item))
  checkUI()
}

function onSubmit(e) {
  e.preventDefault()

  const newItem = input.value

  // validate input
  if (newItem === '') {
    alert('Please add an item!')
    return
  }

  // add item to DOM
  addItemToDom(newItem)

  // add item to localStorage
  addItemToStorage(newItem)

  checkUI()

  input.value = ''
}

function addItemToDom(item) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))
  const button = createButton('remove-item btn-link text-red')

  li.appendChild(button)
  list.appendChild(li)
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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // remove from the DOM
    item.remove()

    // remove from Storage
    removeItemFromStorage(item.textContent)
    checkUI()
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()

  // filter out item to removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item)

  // re-set items to storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
  localStorage.removeItem('items')
  checkUI()
}

function filterItems(e) {
  const items = list.querySelectorAll('li')
  const text = e.target.value.toLowerCase()

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase()

    if (itemName.indexOf(text) !== -1) {
      item.style.display = 'flex'
    } else {
      item.style.display = 'none'
    }
  })
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage()

  // add new item to array
  itemsFromStorage.push(item)

  // convert to JSON string and set to storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
  let itemsFromStorage

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = []
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
  }

  return itemsFromStorage
}

function checkUI() {
  const items = list.querySelectorAll('li')
  if (items.length === 0) {
    filterItem.style.display = 'none'
    clearBtn.style.display = 'none'
  } else {
    filterItem.style.display = 'block'
    clearBtn.style.display = 'block'
  }
}

// initialize app
function init() {
  // event listener
  form.addEventListener('submit', onSubmit)
  list.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearItems)
  filterItem.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)

  checkUI()
}

init()
