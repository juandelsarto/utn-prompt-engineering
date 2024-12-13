// Variables globales
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Recupera las tareas del LocalStorage
const taskList = document.querySelector('.list-tasks');
const recordButton = document.querySelector('.record-botton');

// Estado global para saber si se está grabando
let isRecording = false;

// Función para actualizar la UI
function renderTasks() {
  taskList.innerHTML = ''; // Limpiar la lista antes de renderizar
  tasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item', 'mt-3', 'box');

    taskItem.innerHTML = `
      <label class="checkbox is-flex is-justify-content-space-between is-align-items-center w-100">
        <div class="task-label">
          <h4 class="date is-size-6 pb-2 has-text-weight-bold">${task.date}</h4>
          <input type="checkbox" ${task.done ? 'checked' : ''} data-id="${task.id}" onclick="toggleTask(${task.id})"> ${task.text}
        </div>
        <button class="button is-danger is-small delete-btn" onclick="deleteTask(${task.id})">
          <i class='bx bx-trash'></i>
        </button>
      </label>
    `;

    taskList.prepend(taskItem);
  });
}

// Función para agregar una tarea
function addTask(text) {
  const newTask = {
    id: Date.now(), // Usamos el timestamp como ID único
    text: text.charAt(0).toUpperCase() + text.slice(1) + ".",
    done: false,
    date: new Date().toLocaleString(),
  };
  tasks.push(newTask);
  saveTasks();
  renderTasks();
}

// Función para marcar una tarea como completada
function toggleTask(taskId) {
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

// Configuración de SpeechRecognition
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'es-ES'; // Configurar para español
recognition.continuous = true;
recognition.interimResults = false;

// Manejador de eventos para el botón de grabación
recordButton.addEventListener('click', () => {
  if (isRecording) {
    console.log(isRecording, "deteniendo grabación");
    recognition.stop();  // Detener la grabación
    recordButton.classList.remove('is-success'); // Quitar el indicador de grabación
    isRecording = false;  // Cambiar el estado a no grabando
  } else {
    console.log(isRecording, "empezando grabación");
    recognition.start();  // Iniciar la grabación
    recordButton.classList.add('is-success'); // Mostrar que está grabando
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
    console.log(isRecording, "la grabación terminó");
    isRecording = false; // Actualizar el estado a no grabando
    recordButton.classList.remove('is-success'); // Detener el indicador de carga
  }
};

// Inicializar la aplicación
renderTasks();
