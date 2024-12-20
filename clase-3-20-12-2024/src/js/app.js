// Variables globales
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Recupera las tareas del LocalStorage
const recordButton = document.querySelector('#record-botton');
const taskList = document.querySelector('#list-tasks');

// Estado global para saber si se está grabando
let isRecording = false;

// Función para actualizar la UI
// function renderTasks() {
//   taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

//   if (tasks.length === 0) {
//     taskList.innerHTML = '<p class="hsubtitle has-text-centered has-text-grey-light is-6 mt-3 is-italic">No hay tareas por hacer :)</p>';
//     return;
//   }

//   tasks.forEach(task => {
//     const taskItem = document.createElement('li');

//     if (task.priority === 'urgente') {
//       taskItem.classList.add('has-background-danger-light');
//     } else if (task.priority === 'moderada') {
//       taskItem.classList.add('has-background-warning-light');
//     } else {
//       taskItem.classList.add('has-background-info-light');
//     }

//     taskItem.classList.add('task-item', 'mt-3', 'box');
//     taskItem.dataset.id = task.id;
//     taskItem.innerHTML = `
//       <label class="checkbox is-flex is-justify-content-space-between is-align-items-center w-100">
//         <div class="task-label">
//           <h4 class="date is-size-6 pb-2 has-text-weight-bold">${task.date}</h4>
//           <input type="checkbox" ${task.done ? 'checked' : ''} class="hidden-checkbox">
//           <span class="task-text ${task.done ? 'completed' : ''}">${task.text}</span>
//         </div>
//         <button class="button is-danger is-small delete-btn">
//           <i class='bx bx-trash'></i>
//         </button>
//       </label>
//     `;
//     taskList.prepend(taskItem);
//   });
// }

// Variables de los filtros
const filterDate = document.querySelector('#filter-date');
const filterPriority = document.querySelector('#filter-priority');
const filterStatus = document.querySelector('#filter-status');
const clearFiltersButton = document.querySelector('.button.is-light');

// Función para aplicar los filtros
function applyFilters() {
  let filteredTasks = [...tasks];

  // Filtro por fecha
  const dateFilter = filterDate.value;
  if (dateFilter === 'oldest') {
    filteredTasks.sort((a, b) => a.date - b.date);  // Ordenar por fecha (más antigua primero)
  }
  if (dateFilter === 'newest') {
    filteredTasks.sort((a, b) => b.date - a.date);  // Ordenar por fecha (más reciente primero)
  }

  // Filtro por prioridad
  const priorityFilter = filterPriority.value;
  if (priorityFilter) {
    filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
  }

  // Filtro por estado (completada o pendiente)
  const statusFilter = filterStatus.value;
  if (statusFilter) {
    filteredTasks = filteredTasks.filter(task =>
      statusFilter === 'done' ? task.done : !task.done
    );
  }

  // Renderizar tareas filtradas
  renderTasks(filteredTasks);
}

// Función para renderizar las tareas
function renderTasks(filteredTasks = tasks) {
  taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<p class="hsubtitle has-text-centered has-text-grey-light is-6 mt-3 is-italic">No hay tareas por hacer :)</p>';
    return;
  }

  filteredTasks.forEach(task => {
    const taskItem = document.createElement('li');

    if (task.priority === 'urgente') {
      taskItem.classList.add('has-background-danger-light');
    } else if (task.priority === 'moderada') {
      taskItem.classList.add('has-background-warning-light');
    } else {
      taskItem.classList.add('has-background-info-light');
    }

    taskItem.classList.add('task-item', 'mt-3', 'box');
    taskItem.dataset.id = task.id;
    taskItem.innerHTML = `
      <label class="checkbox is-flex is-justify-content-space-between is-align-items-center w-100">
        <div class="task-label">
          <h4 class="date is-size-6 pb-2 has-text-weight-bold">${task.date.toLocaleString()}</h4>
          <input type="checkbox" ${task.done ? 'checked' : ''} class="hidden-checkbox">
          <span class="task-text ${task.done ? 'completed' : ''}">${task.text}</span>
        </div>
        <button class="button is-danger is-small delete-btn">
          <i class='bx bx-trash'></i>
        </button>
      </label>
    `;
    taskList.prepend(taskItem);
  });
}

// Event listeners para los filtros
filterDate.addEventListener('change', applyFilters);
filterPriority.addEventListener('change', applyFilters);
filterStatus.addEventListener('change', applyFilters);

// Botón para limpiar filtros
clearFiltersButton.addEventListener('click', () => {
  // Resetear los filtros a su valor inicial
  filterDate.value = 'newest';
  filterPriority.value = '';
  filterStatus.value = '';
  // Aplicar los filtros sin ninguno activo
  applyFilters();
});



function addTask(text) {
  // Detectar y extraer la categoría al final del texto
  let category = '';
  const categories = ['urgente', 'moderada', 'tranqui'];

  categories.forEach(cat => {
    if (text.toLowerCase().includes(cat)) {
      category = cat;
      // Remover la categoría del texto
      text = text.replace(`categoría ${cat}`, '').trim();
    }
  });

  // Crear la nueva tarea con la categoría y el texto limpio
  const newTask = {
    id: Date.now(), // Usamos el timestamp como ID único
    text: text.charAt(0).toUpperCase() + text.slice(1) + ".", // Tarea con el primer carácter en mayúscula
    done: false,
    priority: category || 'tranqui', // Asignamos la categoría o 'tranqui' por defecto
    date: new Date()
  };

  console.log(newTask)

  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Función para marcar una tarea como completada
function toggleUpdateTask(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    task.done = !task.done;
    saveTasks();
    renderTasks();
  }
}

// Función para borrar una tarea
function deleteTask(taskId) {
  if (confirm('¿Estás seguro de que quieres borrar esta tarea?')) {
    tasks = tasks.filter(t => t.id !== taskId);
    saveTasks();
    renderTasks();
  }
}

// Función para guardar las tareas en LocalStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Manejador de clic en la lista de tareas
taskList.addEventListener('click', (e) => {
  const taskItem = e.target.closest('.task-item');
  if (taskItem) {
    const taskId = parseInt(taskItem.dataset.id);

    if (e.target.closest('.delete-btn')) {
      deleteTask(taskId);
    } else {
      toggleUpdateTask(taskId);
    }
  }
});

// Configuración de SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES'; // Configurar para español
recognition.continuous = true;
recognition.interimResults = false;

// Manejador de eventos para el botón de grabación
recordButton.addEventListener('click', () => {
  if (isRecording) {
    recognition.stop();  // Detener la grabación
    recordButton.classList.remove('is-success');
    isRecording = false;  // Cambiar el estado a no grabando
  } else {
    recognition.start();  // Iniciar la grabación
    recordButton.classList.add('is-success');
    isRecording = true;  // Cambiar el estado a grabando
  }
});

// Manejo de resultados de la grabación
recognition.onresult = (event) => {
  const transcript = event.results[event.resultIndex][0].transcript.trim();
  if (transcript) {
    addTask(transcript); // Agregar la tarea al decir algo
  }
};

// Cuando el reconocimiento termine, quitar el indicador de carga
recognition.onend = () => {
  if (isRecording) {
    isRecording = false; // Actualizar el estado a no grabando
    recordButton.classList.remove('is-success');
  }
};

// Inicializar la aplicación
renderTasks();