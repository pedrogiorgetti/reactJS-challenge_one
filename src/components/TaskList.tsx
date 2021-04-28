import {  useRef, useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const inputRef = useRef<HTMLInputElement>(null);
  

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(inputRef.current) {

      if(newTaskTitle === '') {
        
        inputRef.current.classList.add('emptyValue');
  
        return false;
      }
  
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        isComplete: false,
      };
  
  
      setTasks(oldTask => [...oldTask, newTask])
      inputRef.current.classList.remove('emptyValue');
      setNewTaskTitle('');
    }

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID

    setTasks(currentTasks => {
      const taskIndex = currentTasks.findIndex(currentTask => currentTask.id === id);

      currentTasks[taskIndex] = {
        ...currentTasks[taskIndex],
        isComplete: !currentTasks[taskIndex].isComplete,
      }

      return [...currentTasks];
    })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID

    setTasks(currentTasks => {
      const refreshTasks = currentTasks.findIndex(currentTask => currentTask.id === id);

      currentTasks.splice(refreshTasks, 1)

      console.log(currentTasks);

      return [...currentTasks];
    })
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}