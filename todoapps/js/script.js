document.addEventListener('DOMContentLoaded', function () {

  const todos = []
  const RENDER_EVENT = 'render-todo'

  const submitForm = document.getElementById('form')
  submitForm.addEventListener('submit', function (event) {
    event.preventDefault()
    addTodo()
  })

  const addTodo = () => {
    const textTodo = document.getElementById('title').value
    const timestamp = document.getElementById('date').value

    const generateID = generateId()
    const todoObject = generateTodoObject(generateID, textTodo, timestamp, false)
    todos.push(todoObject)

    document.dispatchEvent(new Event(RENDER_EVENT))
    saveData()
  }

  const generateId = () => {
    return +new Date()
  }

  const generateTodoObject = (id, task, timestamp, isCompleted) => {
    return {
      id, task, timestamp, isCompleted
    }
  }

  document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos')
    uncompletedTODOList.innerHTML = ''

    const completedTODOList = document.getElementById('completed-todos')
    completedTODOList.innerHTML = ''

    for (const todoItem of todos) {
      const todoElement = makeTodo(todoItem)
      if (!todoItem.isCompleted) {
        uncompletedTODOList.append(todoElement)
      } else {
        completedTODOList.append(todoElement)
      }
    }
  })

  const makeTodo = (todoObject) => {
    //tampilkan todo
    const textTitle = document.createElement('h2')
    textTitle.innerText = todoObject.task

    const textTimestamp = document.createElement('p')
    textTimestamp.innerText = todoObject.timestamp

    const textContainer = document.createElement('div')
    textContainer.classList.add('inner')
    textContainer.append(textTitle, textTimestamp)

    const container = document.createElement('div')
    container.classList.add('item', 'shadow')
    container.append(textContainer)
    container.setAttribute('id', `todo-${todoObject.id}`)

    //iscompleted todo
    if (todoObject.isCompleted) {
      const undoButton = document.createElement('button')
      undoButton.classList.add('undo-button')

      undoButton.addEventListener('click', function () {
        undoTaskFromCompleted(todoObject.id)
      })

      const trashButton = document.createElement('button')
      trashButton.classList.add('trash-button')

      trashButton.addEventListener('click', function () {
        removeTaskFromCompleted(todoObject.id)
      })

      container.append(undoButton, trashButton)
    } else {
      const checkButton = document.createElement('button')
      checkButton.classList.add('check-button')

      checkButton.addEventListener('click', function () {
        addTaskToCompleted(todoObject.id)
      })
      container.append(checkButton)
    }

    //menjadikan todo menjadi completed

    const addTaskToCompleted = (todoId) => {
      const todoTarget = findTodo(todoId)

      if (todoTarget == null) return

      todoTarget.isCompleted = true
      document.dispatchEvent(new Event(RENDER_EVENT))
      saveData()
    }

    //mencari id todo

    const findTodo = (todoId) => {
      for (const todoItem of todos) {
        if (todoItem.id === todoId) {
          return todoItem
        }
      }
      return null
    }

    //remove todo task 

    const removeTaskFromCompleted = (todoId) => {
      const todoTarget = findTodoIndex(todoId)

      if (todoTarget === -1) return

      todos.splice(todoTarget, 1)
      document.dispatchEvent(new Event(RENDER_EVENT))
      saveData()
    }

    //undo todo task

    const undoTaskFromCompleted = (todoId) => {
      const todoTarget = findTodo(todoId)

      if (todoTarget == null) return

      todoTarget.isCompleted = false;
      document.dispatchEvent(new Event(RENDER_EVENT))
      saveData()
    }

    //find todo index

    const findTodoIndex = (todoId) => {
      for (const index in todos) {
        if (todos[index].id === todoId) {
          return index
        }
      }
      return -1
    }

    return container
  }

  const SAVED_EVENT = 'saved-todo'
  const STORAGE_KEY = 'TODO_APPS'

  const saveData = () => {
    if (isStorageExist()) {
      const parsed = JSON.stringify(todos)
      localStorage.setItem(STORAGE_KEY, parsed)
      document.dispatchEvent(new Event(SAVED_EVENT))
    }
  }

  const isStorageExist = () => {
    if (typeof (Storage) === undefined) {
      alert('Browser kamu tidak mendukung web storage')
      return false
    }
    else {
      return true
    }
  }

  document.addEventListener(SAVED_EVENT, () => {
    console.log(localStorage.getItem(STORAGE_KEY))
    const x = document.getElementById('snackbar')
    console.warn(x.classList)
    x.className = "show"
    setTimeout(() => {
      x.className = x.className.replace("show", "")
    }, 3000)
    console.warn(x.classList)
  })

  const loadDataFromStorage = () => {
    const serializedData = localStorage.getItem(STORAGE_KEY)
    let data = JSON.parse(serializedData)

    if (data !== null) {
      for (const todo of data) {
        todos.push(todo)
      }
    }

    document.dispatchEvent(new Event(RENDER_EVENT))
  }

  if (isStorageExist()) {
    loadDataFromStorage()
  }
})
