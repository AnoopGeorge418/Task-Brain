# 🚀 Task-Brain

Task-Brain is a modern, lightweight task manager web app built with vanilla JavaScript, HTML, and CSS. It helps you create, manage, organize, and delete tasks efficiently — with a bonus AI-powered assistant to boost productivity and offer task guidance.

---

## 🧩 Features

- **Add / View / Update / Delete** tasks in a dynamic, responsive layout
- **Trash system** to safely delete and restore tasks
- **Persistent storage** via LocalStorage
- **AI Assistant** offering productivity and task-management advice
- **Dark / Light Mode**, **Notifications**, **Auto-Save**, and **Task Limit** settings
- **Data Export / Clear** options for easy management
- **Responsive design**—no frameworks, no fuss!

---

## 📁 Project Structure

```
Task-Brain/
├─ styles/
│  └─ dashboard.css     # Main styles
├─ js/
│  └─ dashboard.js      # App logic, UI handlers, AI integration
└─ index.html           # App entry point
```

---

## 🛠 Getting Started

### Prerequisites
A modern web browser—no server or build tools required.

### Setup
1. **Clone the repo:**
   ```bash
   git clone https://github.com/AnoopGeorge418/Task-Brain.git
   cd Task-Brain
   ```

2. **Open** `index.html` (or `public/index.html`) in your browser.

3. **Start** adding tasks, toggling themes, chatting with AI, and mastering your productivity!

---

## 🧠 AI Assistant Integration

Powered by Hugging Face's DialoGPT-medium. Add your token in `dashboard.js`:

```js
fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
    headers: { Authorization: 'Bearer YOUR_HF_TOKEN' },
    ...
});
```

Without a token, the assistant falls back to friendly, preset responses.

---

## 🎚️ Settings Panel

Customize the experience:
* 💡 Light / Dark mode
* 🔔 Enable / Disable notifications
* 💾 Enable / Disable Auto-Save
* 🎯 Set maximum task limit
* 📤 Export your data
* 🗑️ Clear everything

---

## 💾 Local Storage Keys

| Key | Content Stored |
|-----|----------------|
| `userTasks` | Array of current tasks |
| `trashedTasks` | Array of deleted (trashed) tasks |
| `taskBrainSettings` | App settings (theme, notifications, etc.) |

---

## 🎯 How to Use

1. **Add Task:** Simple input, auto description/tag
2. **View Tasks:** Responsive task grid; update/delete in-line
3. **Trash:** Review and restore deleted tasks
4. **Brain AI:** Ask productivity questions, get helpful tips
5. **Settings:** Tweak preferences, manage data, switch themes

---

## 🌱 Contributing Ideas

Want to level this up?
* 🧩 Drag-and-drop reordering
* 📅 Add due dates & reminders
* 📝 Rich-text task descriptions
* 🔍 Filters, sorting, tagging by color
* 🔄 Refactor into React/Vue
* 🎨 Themes, animations, mobile optimizations

Contributions & improvements are welcome!

---

## 📜 License

MIT License. 🎉 Use it, tweak it, share it—appreciated contributions are welcomed!

---

## 🙌 Thank You!

Thanks for checking out **Task-Brain**! Let me know if you want help with any feature.

— **Anoop George**  
GitHub: [AnoopGeorge418](https://github.com/AnoopGeorge418)