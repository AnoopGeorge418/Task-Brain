// Global variables
let tasks = JSON.parse(localStorage.getItem("userTasks")) || [];
let trashedTasks = JSON.parse(localStorage.getItem("trashedTasks")) || [];
let currentUpdateIndex = -1;
let settings = JSON.parse(localStorage.getItem("taskBrainSettings")) || {
  theme: "light",
  notifications: true,
  autoSave: true,
  taskLimit: 100
};

// Apply saved theme on load
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(settings.theme);
});

// Task structure: { title, description, tag }
function createTaskObject(title, description = "No description available", tag = "New Task") {
  return { title, description, tag };
}

// DOM elements
const addTaskBtn = document.querySelector(".addTaskBtn");
const viewTaskBtn = document.querySelector(".viewTaskBtn");
const trashBtn = document.querySelector(".trashTaskBtn");
const aiTaskBtn = document.querySelector(".aiTaskBtn");
const settingsBtn = document.querySelector(".sidebar_bottom .sidebar_item");
const mainBody = document.querySelector(".main_body");
const alertContainer = document.getElementById("alertContainer");
const updateModal = document.getElementById("updateModal");
const updateTaskTitle = document.getElementById("updateTaskTitle");
const updateTaskDesc = document.getElementById("updateTaskDesc");
const updateTaskTag = document.getElementById("updateTaskTag");
const cancelUpdate = document.getElementById("cancelUpdate");
const saveUpdate = document.getElementById("saveUpdate");

// Theme functions
function applyTheme(theme) {
  document.body.classList.remove('light-theme', 'dark-theme');
  document.body.classList.add(`${theme}-theme`);
  
  // Update CSS variables for themes
  if (theme === 'dark') {
    document.documentElement.style.setProperty('--bg-color', '#1a1a1a');
    document.documentElement.style.setProperty('--card-bg', '#2d2d2d');
    document.documentElement.style.setProperty('--text-color', '#ffffff');
    document.documentElement.style.setProperty('--text-secondary', '#cccccc');
    document.documentElement.style.setProperty('--border-color', '#444444');
  } else {
    document.documentElement.style.setProperty('--bg-color', '#ffffff');
    document.documentElement.style.setProperty('--card-bg', '#f8f9fa');
    document.documentElement.style.setProperty('--text-color', '#333333');
    document.documentElement.style.setProperty('--text-secondary', '#666666');
    document.documentElement.style.setProperty('--border-color', '#e9ecef');
  }
}

function saveSettings() {
  localStorage.setItem("taskBrainSettings", JSON.stringify(settings));
}

// Alert function
function showAlert(message, type) {
  const alert = document.createElement("div");
  alert.className = `alert ${type}`;
  alert.textContent = message;
  
  alertContainer.appendChild(alert);
  
  setTimeout(() => alert.classList.add("show"), 100);
  
  setTimeout(() => {
    alert.classList.remove("show");
    setTimeout(() => alertContainer.removeChild(alert), 300);
  }, 3000);
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem("userTasks", JSON.stringify(tasks));
}

function saveTrashedTasks() {
  localStorage.setItem("trashedTasks", JSON.stringify(trashedTasks));
}

function removeActiveClasses() {
  document.querySelectorAll(".sidebar_item").forEach(item => {
    item.classList.remove("active");
  });
}

// AI Chat functionality
async function queryAI(question) {
  try {
    // Using a free AI API (Hugging Face Inference API)
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // You need to replace with actual token
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: question,
        parameters: {
          max_length: 200,
          temperature: 0.7
        }
      })
    });

    if (!response.ok) {
      throw new Error('AI service unavailable');
    }

    const data = await response.json();
    return data[0]?.generated_text || "I'm sorry, I couldn't process that request. Please try again.";
  } catch (error) {
    console.error('AI Error:', error);
    return "I'm currently experiencing some technical difficulties. Please try asking your question again in a moment.";
  }
}

// Brain AI functionality
aiTaskBtn.onclick = () => {
  removeActiveClasses();
  aiTaskBtn.classList.add("active");
  
  mainBody.innerHTML = "";

  const bodyContent = document.createElement("div");
  bodyContent.classList.add("body_content");

  const header = document.createElement("div");
  header.classList.add("task_header");

  const heading = document.createElement("h1");
  heading.textContent = "🧠 Brain AI Assistant";

  const subheading = document.createElement("p");
  subheading.classList.add("task_subheading");
  subheading.textContent = "Ask me anything! I can help you with task management, productivity tips, or general questions.";

  const chatContainer = document.createElement("div");
  chatContainer.classList.add("chat-container");
  chatContainer.style.cssText = `
    height: 400px;
    overflow-y: auto;
    border: 2px solid var(--border-color, #e9ecef);
    border-radius: 0.5rem;
    padding: 1rem;
    margin: 1rem 0;
    background: var(--card-bg, #f8f9fa);
  `;

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("ai-input-container");
  inputContainer.style.cssText = `
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  `;

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Ask me anything...";
  input.style.cssText = `
    flex: 1;
    padding: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
    border-radius: 0.5rem;
    font-size: 1rem;
  `;

  const sendButton = document.createElement("button");
  sendButton.textContent = "Send";
  sendButton.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  `;

  // Add welcome message
  const welcomeMsg = document.createElement("div");
  welcomeMsg.style.cssText = `
    background: var(--card-bg, #f0f8ff);
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border-left: 4px solid #667eea;
  `;
  welcomeMsg.innerHTML = `
    <strong>🤖 AI Assistant:</strong><br>
    Hello! I'm your Brain AI assistant. I can help you with:
    <ul style="margin: 0.5rem 0; padding-left: 1.5rem;">
      <li>Task management tips</li>
      <li>Productivity advice</li>
      <li>General questions and answers</li>
      <li>Planning and organization</li>
    </ul>
    What would you like to know?
  `;
  chatContainer.appendChild(welcomeMsg);

  const handleSend = async () => {
    const question = input.value.trim();
    if (!question) return;

    // Add user message
    const userMsg = document.createElement("div");
    userMsg.style.cssText = `
      background: #667eea;
      color: white;
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 0.5rem 0;
      margin-left: 2rem;
      text-align: right;
    `;
    userMsg.innerHTML = `<strong>You:</strong><br>${question}`;
    chatContainer.appendChild(userMsg);

    input.value = "";
    input.disabled = true;
    sendButton.disabled = true;
    sendButton.textContent = "Thinking...";

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    try {
      // Simple AI responses for common task management queries
      let response;
      const lowerQuestion = question.toLowerCase();
      
      if (lowerQuestion.includes("task") && lowerQuestion.includes("manage")) {
        response = "Here are some great task management tips: 1) Break large tasks into smaller, actionable steps. 2) Use the 2-minute rule - if it takes less than 2 minutes, do it now. 3) Prioritize using the Eisenhower Matrix (urgent/important). 4) Set specific deadlines and stick to them. 5) Review your tasks weekly to stay on track.";
      } else if (lowerQuestion.includes("productive")) {
        response = "To boost productivity: 1) Use time-blocking to schedule focused work periods. 2) Eliminate distractions during work hours. 3) Take regular breaks using the Pomodoro Technique (25 min work, 5 min break). 4) Start your day with the most important task. 5) Keep your workspace organized and clutter-free.";
      } else if (lowerQuestion.includes("organize")) {
        response = "Organization tips: 1) Use categories and tags for your tasks. 2) Create a daily/weekly planning routine. 3) Keep a 'someday/maybe' list for future ideas. 4) Use the GTD (Getting Things Done) method. 5) Regular cleanup of completed or outdated tasks helps maintain clarity.";
      } else if (lowerQuestion.includes("priority")) {
        response = "Setting priorities effectively: 1) Identify urgent vs important tasks. 2) Consider deadlines and consequences. 3) Align tasks with your main goals. 4) Use ABC method (A=must do, B=should do, C=could do). 5) Review and adjust priorities regularly as situations change.";
      } else {
        response = `I understand you're asking about "${question}". While I specialize in task management and productivity, I'd suggest breaking this down into actionable steps. Consider: What's the main goal? What are the smaller steps needed? What resources do you need? Would you like specific advice on organizing this as tasks?`;
      }

      // Add AI response
      const aiMsg = document.createElement("div");
      aiMsg.style.cssText = `
        background: var(--card-bg, #f0f8ff);
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
        margin-right: 2rem;
        border-left: 4px solid #667eea;
      `;
      aiMsg.innerHTML = `<strong>🤖 AI Assistant:</strong><br>${response}`;
      chatContainer.appendChild(aiMsg);

    } catch (error) {
      const errorMsg = document.createElement("div");
      errorMsg.style.cssText = `
        background: #ffe6e6;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 0.5rem 0;
        border-left: 4px solid #ff4444;
      `;
      errorMsg.innerHTML = `<strong>Error:</strong><br>I'm having trouble connecting right now. Please try again later.`;
      chatContainer.appendChild(errorMsg);
    } finally {
      input.disabled = false;
      sendButton.disabled = false;
      sendButton.textContent = "Send";
      chatContainer.scrollTop = chatContainer.scrollHeight;
      input.focus();
    }
  };

  sendButton.addEventListener("click", handleSend);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSend();
  });

  inputContainer.appendChild(input);
  inputContainer.appendChild(sendButton);

  header.appendChild(heading);
  header.appendChild(subheading);
  bodyContent.appendChild(header);
  bodyContent.appendChild(chatContainer);
  bodyContent.appendChild(inputContainer);
  mainBody.appendChild(bodyContent);

  input.focus();
};

// Settings functionality
settingsBtn.onclick = () => {
  removeActiveClasses();
  settingsBtn.classList.add("active");
  
  mainBody.innerHTML = "";

  const bodyContent = document.createElement("div");
  bodyContent.classList.add("body_content");

  const header = document.createElement("div");
  header.classList.add("task_header");

  const heading = document.createElement("h1");
  heading.textContent = "⚙️ Settings";

  const subheading = document.createElement("p");
  subheading.classList.add("task_subheading");
  subheading.textContent = "Customize your TaskBrain experience";

  const settingsContainer = document.createElement("div");
  settingsContainer.style.cssText = `
    max-width: 600px;
    margin: 2rem 0;
  `;

  // Theme Setting
  const themeSection = document.createElement("div");
  themeSection.style.cssText = `
    background: var(--card-bg, #f8f9fa);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
  `;

  const themeTitle = document.createElement("h3");
  themeTitle.textContent = "🎨 Appearance";
  themeTitle.style.marginBottom = "1rem";

  const themeOptions = document.createElement("div");
  themeOptions.style.cssText = `
    display: flex;
    gap: 1rem;
  `;

  const lightBtn = document.createElement("button");
  lightBtn.textContent = "☀️ Light Mode";
  lightBtn.style.cssText = `
    padding: 0.75rem 1.5rem;
    border: 2px solid ${settings.theme === 'light' ? '#667eea' : '#ddd'};
    background: ${settings.theme === 'light' ? '#667eea' : 'white'};
    color: ${settings.theme === 'light' ? 'white' : '#333'};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
  `;

  const darkBtn = document.createElement("button");
  darkBtn.textContent = "🌙 Dark Mode";
  darkBtn.style.cssText = `
    padding: 0.75rem 1.5rem;
    border: 2px solid ${settings.theme === 'dark' ? '#667eea' : '#ddd'};
    background: ${settings.theme === 'dark' ? '#667eea' : 'white'};
    color: ${settings.theme === 'dark' ? 'white' : '#333'};
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
  `;

  lightBtn.onclick = () => {
    settings.theme = 'light';
    applyTheme('light');
    saveSettings();
    showAlert("Light mode activated!", "success");
    settingsBtn.click(); // Refresh settings view
  };

  darkBtn.onclick = () => {
    settings.theme = 'dark';
    applyTheme('dark');
    saveSettings();
    showAlert("Dark mode activated!", "success");
    settingsBtn.click(); // Refresh settings view
  };

  themeOptions.appendChild(lightBtn);
  themeOptions.appendChild(darkBtn);
  themeSection.appendChild(themeTitle);
  themeSection.appendChild(themeOptions);

  // Notifications Setting
  const notifSection = document.createElement("div");
  notifSection.style.cssText = `
    background: var(--card-bg, #f8f9fa);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
  `;

  const notifTitle = document.createElement("h3");
  notifTitle.textContent = "🔔 Notifications";
  notifTitle.style.marginBottom = "1rem";

  const notifToggle = document.createElement("label");
  notifToggle.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  `;

  const notifCheckbox = document.createElement("input");
  notifCheckbox.type = "checkbox";
  notifCheckbox.checked = settings.notifications;
  notifCheckbox.style.cssText = `
    width: 18px;
    height: 18px;
    cursor: pointer;
  `;

  notifCheckbox.onchange = () => {
    settings.notifications = notifCheckbox.checked;
    saveSettings();
    showAlert(`Notifications ${settings.notifications ? 'enabled' : 'disabled'}!`, "success");
  };

  const notifLabel = document.createElement("span");
  notifLabel.textContent = "Enable task notifications";

  notifToggle.appendChild(notifCheckbox);
  notifToggle.appendChild(notifLabel);
  notifSection.appendChild(notifTitle);
  notifSection.appendChild(notifToggle);

  // Auto-save Setting
  const autoSaveSection = document.createElement("div");
  autoSaveSection.style.cssText = `
    background: var(--card-bg, #f8f9fa);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
  `;

  const autoSaveTitle = document.createElement("h3");
  autoSaveTitle.textContent = "💾 Auto-save";
  autoSaveTitle.style.marginBottom = "1rem";

  const autoSaveToggle = document.createElement("label");
  autoSaveToggle.style.cssText = `
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  `;

  const autoSaveCheckbox = document.createElement("input");
  autoSaveCheckbox.type = "checkbox";
  autoSaveCheckbox.checked = settings.autoSave;
  autoSaveCheckbox.style.cssText = `
    width: 18px;
    height: 18px;
    cursor: pointer;
  `;

  autoSaveCheckbox.onchange = () => {
    settings.autoSave = autoSaveCheckbox.checked;
    saveSettings();
    showAlert(`Auto-save ${settings.autoSave ? 'enabled' : 'disabled'}!`, "success");
  };

  const autoSaveLabel = document.createElement("span");
  autoSaveLabel.textContent = "Automatically save tasks";

  autoSaveToggle.appendChild(autoSaveCheckbox);
  autoSaveToggle.appendChild(autoSaveLabel);
  autoSaveSection.appendChild(autoSaveTitle);
  autoSaveSection.appendChild(autoSaveToggle);

  // Task Limit Setting
  const limitSection = document.createElement("div");
  limitSection.style.cssText = `
    background: var(--card-bg, #f8f9fa);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
  `;

  const limitTitle = document.createElement("h3");
  limitTitle.textContent = "📊 Task Limit";
  limitTitle.style.marginBottom = "1rem";

  const limitInput = document.createElement("input");
  limitInput.type = "number";
  limitInput.value = settings.taskLimit;
  limitInput.min = "10";
  limitInput.max = "1000";
  limitInput.style.cssText = `
    width: 100px;
    padding: 0.5rem;
    border: 2px solid var(--border-color, #e9ecef);
    border-radius: 0.25rem;
    font-size: 1rem;
  `;

  limitInput.onchange = () => {
    settings.taskLimit = parseInt(limitInput.value) || 100;
    saveSettings();
    showAlert(`Task limit set to ${settings.taskLimit}!`, "success");
  };

  const limitLabel = document.createElement("span");
  limitLabel.textContent = " Maximum number of tasks";
  limitLabel.style.marginLeft = "0.5rem";

  const limitContainer = document.createElement("div");
  limitContainer.appendChild(limitInput);
  limitContainer.appendChild(limitLabel);

  limitSection.appendChild(limitTitle);
  limitSection.appendChild(limitContainer);

  // Data Management
  const dataSection = document.createElement("div");
  dataSection.style.cssText = `
    background: var(--card-bg, #f8f9fa);
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border: 2px solid var(--border-color, #e9ecef);
  `;

  const dataTitle = document.createElement("h3");
  dataTitle.textContent = "🗄️ Data Management";
  dataTitle.style.marginBottom = "1rem";

  const dataButtons = document.createElement("div");
  dataButtons.style.cssText = `
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  `;

  const exportBtn = document.createElement("button");
  exportBtn.textContent = "📤 Export Data";
  exportBtn.style.cssText = `
    padding: 0.75rem 1rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  `;

  exportBtn.onclick = () => {
    const data = {
      tasks,
      trashedTasks,
      settings,
      exportDate: new Date().toISOString()
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'taskbrain-data.json';
    link.click();
    showAlert("Data exported successfully!", "success");
  };

  const clearBtn = document.createElement("button");
  clearBtn.textContent = "🗑️ Clear All Data";
  clearBtn.style.cssText = `
    padding: 0.75rem 1rem;
    background: #dc3545;
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
  `;

  clearBtn.onclick = () => {
    if (confirm("Are you sure? This will delete all your tasks and data permanently!")) {
      localStorage.clear();
      tasks = [];
      trashedTasks = [];
      settings = { theme: "light", notifications: true, autoSave: true, taskLimit: 100 };
      applyTheme('light');
      showAlert("All data cleared!", "success");
      settingsBtn.click(); // Refresh settings view
    }
  };

  dataButtons.appendChild(exportBtn);
  dataButtons.appendChild(clearBtn);
  dataSection.appendChild(dataTitle);
  dataSection.appendChild(dataButtons);

  settingsContainer.appendChild(themeSection);
  settingsContainer.appendChild(notifSection);
  settingsContainer.appendChild(autoSaveSection);
  settingsContainer.appendChild(limitSection);
  settingsContainer.appendChild(dataSection);

  header.appendChild(heading);
  header.appendChild(subheading);
  bodyContent.appendChild(header);
  bodyContent.appendChild(settingsContainer);
  mainBody.appendChild(bodyContent);
};

// Rest of the original code (Add Task, View Tasks, etc.)
addTaskBtn.onclick = () => {
  removeActiveClasses();
  addTaskBtn.classList.add("active");
  
  mainBody.innerHTML = "";

  const bodyContent = document.createElement("div");
  bodyContent.classList.add("body_content");

  const header = document.createElement("div");
  header.classList.add("task_header");

  const heading = document.createElement("h1");
  heading.textContent = "Add a New Task";

  const subheading = document.createElement("p");
  subheading.classList.add("task_subheading");
  subheading.textContent = "All your added tasks will be visible in the 'View Tasks' section.";

  const inputBox = document.createElement("div");
  inputBox.classList.add("task_input_box");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Enter your task here...";

  const addButton = document.createElement("button");
  addButton.textContent = "Add Task";

  const handleAddTask = () => {
    const taskText = input.value.trim();

    if (!taskText) {
      showAlert("Please enter a task!", "error");
      return;
    }

    if (tasks.length >= settings.taskLimit) {
      showAlert(`Task limit reached (${settings.taskLimit})! Please delete some tasks or increase the limit in settings.`, "error");
      return;
    }

    tasks.push(createTaskObject(taskText));
    if (settings.autoSave) saveTasks();
    showAlert("Task added successfully!", "success");
    input.value = "";
  };

  addButton.addEventListener("click", handleAddTask);
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAddTask();
  });

  inputBox.appendChild(input);
  inputBox.appendChild(addButton);
  header.appendChild(heading);
  header.appendChild(subheading);
  bodyContent.appendChild(header);
  bodyContent.appendChild(inputBox);
  mainBody.appendChild(bodyContent);

  input.focus();
};

// Move task to trash function
function moveToTrash(index) {
  if (confirm("Are you sure you want to move this task to trash?")) {
    const taskToTrash = tasks[index];
    
    let trashedTask;
    if (typeof taskToTrash === 'string') {
      trashedTask = createTaskObject(taskToTrash, "No description available", "Deleted");
    } else {
      trashedTask = { ...taskToTrash, tag: "Deleted" };
    }
    
    trashedTasks.push(trashedTask);
    tasks.splice(index, 1);
    
    if (settings.autoSave) {
      saveTasks();
      saveTrashedTasks();
    }
    showAlert("Task moved to trash!", "success");
    
    viewTaskBtn.click();
  }
}

function restoreFromTrash(index) {
  if (confirm("Are you sure you want to restore this task?")) {
    const taskToRestore = trashedTasks[index];
    
    const restoredTask = { ...taskToRestore, tag: "Restored" };
    
    tasks.push(restoredTask);
    trashedTasks.splice(index, 1);
    
    if (settings.autoSave) {
      saveTasks();
      saveTrashedTasks();
    }
    showAlert("Task restored successfully!", "success");
    
    showTrashView();
  }
}

function updateTask(index) {
  currentUpdateIndex = index;
  const task = tasks[index];
  
  if (typeof task === 'string') {
    updateTaskTitle.value = task;
    updateTaskDesc.value = "No description available";
    updateTaskTag.value = "Updated";
  } else {
    updateTaskTitle.value = task.title || task;
    updateTaskDesc.value = task.description || "No description available";
    updateTaskTag.value = "Updated";
  }
  
  updateModal.style.display = "block";
  updateTaskTitle.focus();
}

// Modal event listeners
cancelUpdate.onclick = () => {
  updateModal.style.display = "none";
  currentUpdateIndex = -1;
};

saveUpdate.onclick = () => {
  const newTaskTitle = updateTaskTitle.value.trim();
  const newTaskDesc = updateTaskDesc.value.trim();
  const newTaskTag = "Updated";
  
  if (!newTaskTitle) {
    showAlert("Please enter a task title!", "error");
    return;
  }

  tasks[currentUpdateIndex] = createTaskObject(
    newTaskTitle,
    newTaskDesc || "No description available",
    newTaskTag
  );
  
  if (settings.autoSave) saveTasks();
  updateModal.style.display = "none";
  showAlert("Task updated successfully!", "success");
  viewTaskBtn.click();
};

updateModal.onclick = (e) => {
  if (e.target === updateModal) {
    updateModal.style.display = "none";
    currentUpdateIndex = -1;
  }
};

updateTaskTitle.addEventListener("keypress", (e) => {
  if (e.key === "Enter") saveUpdate.click();
});

// View Tasks functionality
viewTaskBtn.onclick = () => {
  removeActiveClasses();
  viewTaskBtn.classList.add("active");
  
  mainBody.innerHTML = "";
  tasks = JSON.parse(localStorage.getItem("userTasks")) || [];

  const bodyContent = document.createElement("div");
  bodyContent.classList.add("body_content");

  if (tasks.length === 0) {
    const noTasksDiv = document.createElement("div");
    noTasksDiv.classList.add("no-tasks");

    const heading = document.createElement("h2");
    heading.textContent = "No Tasks Found! 📝";

    const message = document.createElement("p");
    message.innerHTML = "There are no tasks added yet.<br>Please add some tasks in the 'Add Task' section and check here.";

    noTasksDiv.appendChild(heading);
    noTasksDiv.appendChild(message);
    bodyContent.appendChild(noTasksDiv);
  } else {
    const header = document.createElement("div");
    header.classList.add("task_header");
    header.style.marginBottom = "1.5rem";

    const heading = document.createElement("h1");
    heading.textContent = `My Tasks (${tasks.length})`;
    header.appendChild(heading);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    tasks.forEach((task, index) => {
      const taskData = typeof task === 'string' ? 
        { title: task, description: "No description available", tag: "New Task" } : 
        task;

      const card = document.createElement("div");
      card.classList.add("task-card");

      const title = document.createElement("h3");
      title.classList.add("task-title");
      title.textContent = taskData.title;

      const desc = document.createElement("p");
      desc.classList.add("task-desc");
      desc.textContent = taskData.description;

      const tag = document.createElement("div");
      tag.classList.add("task-tag");
      tag.innerHTML = `<span>${taskData.tag}</span>`;

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("task-buttons");

      const updateBtn = document.createElement("button");
      updateBtn.textContent = "Update";
      updateBtn.classList.add("update-btn");
      updateBtn.onclick = () => updateTask(index);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.onclick = () => moveToTrash(index);

      btnContainer.appendChild(updateBtn);
      btnContainer.appendChild(deleteBtn);

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(tag);
      card.appendChild(btnContainer);

      taskContainer.appendChild(card);
    });

    bodyContent.appendChild(header);
    bodyContent.appendChild(taskContainer);
  }

  mainBody.appendChild(bodyContent);
};

// Show Trash View functionality
function showTrashView() {
  removeActiveClasses();
  if (trashBtn) trashBtn.classList.add("active");
  
  mainBody.innerHTML = "";
  trashedTasks = JSON.parse(localStorage.getItem("trashedTasks")) || [];

  const bodyContent = document.createElement("div");
  bodyContent.classList.add("body_content");

  if (trashedTasks.length === 0) {
    const noTasksDiv = document.createElement("div");
    noTasksDiv.classList.add("no-tasks");

    const heading = document.createElement("h2");
    heading.textContent = "Trash is Empty! 🗑️";

    const message = document.createElement("p");
    message.innerHTML = "No deleted tasks found.<br>Tasks moved to trash will appear here.";

    noTasksDiv.appendChild(heading);
    noTasksDiv.appendChild(message);
    bodyContent.appendChild(noTasksDiv);
  } else {
    const header = document.createElement("div");
    header.classList.add("task_header");
    header.style.marginBottom = "1.5rem";

    const heading = document.createElement("h1");
    heading.textContent = `Trash (${trashedTasks.length})`;
    header.appendChild(heading);

    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    trashedTasks.forEach((task, index) => {
      const card = document.createElement("div");
      card.classList.add("task-card");
      card.style.opacity = "0.7";

      const title = document.createElement("h3");
      title.classList.add("task-title");
      title.textContent = task.title;

      const desc = document.createElement("p");
      desc.classList.add("task-desc");
      desc.textContent = task.description;

      const tag = document.createElement("div");
      tag.classList.add("task-tag");
      tag.innerHTML = `<span style="background-color: #ff4444;">${task.tag}</span>`;

      const btnContainer = document.createElement("div");
      btnContainer.classList.add("task-buttons");

      const restoreBtn = document.createElement("button");
      restoreBtn.textContent = "Restore";
      restoreBtn.classList.add("update-btn");
      restoreBtn.style.backgroundColor = "#28a745";
      restoreBtn.onclick = () => restoreFromTrash(index);

      btnContainer.appendChild(restoreBtn);

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(tag);
      card.appendChild(btnContainer);

      taskContainer.appendChild(card);
    });

    bodyContent.appendChild(header);
    bodyContent.appendChild(taskContainer);
  }

  mainBody.appendChild(bodyContent);
}

// Add trash button click event
if (trashBtn) {
  trashBtn.onclick = showTrashView;
}

// Initialize with welcome message and theme
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(settings.theme);
  
  // Save tasks periodically if auto-save is enabled
  if (settings.autoSave) {
    setInterval(() => {
      saveTasks();
      saveTrashedTasks();
      saveSettings();
    }, 30000); // Save every 30 seconds
  }
});