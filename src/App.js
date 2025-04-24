import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState(() => {
    return JSON.parse(localStorage.getItem('tasks')) || []
  })
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [selectedTasks, setSelectedTasks] = useState([])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (input.trim() === '') return
    const newTask = { id: Date.now(), text: input, completed: false }
    setTasks([...tasks, newTask])
    setInput('')
  }

  const deleteSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedTasks.includes(task.id)))
    setSelectedTasks([])
  }

  const toggleSelectTask = (id) => {
    if (selectedTasks.includes(id)) {
      setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id))
    } else {
      setSelectedTasks([...selectedTasks, id])
    }
  }

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="app">
      <h1>todo app</h1>
      <div className="input-container">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="görev ara"
          className="search-input"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="yeni görev"
          className="task-input"
        />
      </div>
      <div className="button-container">
        <button onClick={addTask}>ekle</button>
        <button
          onClick={deleteSelectedTasks}
          className="delete-selected"
          disabled={selectedTasks.length === 0}
        >
          seçiliyi sil
        </button>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id} className="task-item">
            <input
              type="checkbox"
              checked={selectedTasks.includes(task.id)}
              onChange={() => toggleSelectTask(task.id)}
              className="task-checkbox"
            />
            <span className="task-text">{task.text}</span>
            <span
              className="delete-x"
              onClick={() => {
                setTasks(tasks.filter((t) => t.id !== task.id))
                setSelectedTasks(selectedTasks.filter((id) => id !== task.id))
              }}
            >
              ✗
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App