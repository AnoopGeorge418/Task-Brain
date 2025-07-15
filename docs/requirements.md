This documentation contains both `functional` and `non-functional` `requirements` of **`Task-Brain`** applications.

## **`Functional Requirements`** -> `What user can do in this app` ?
1. **`Add Tasks:`**
    - User can add their daily tasks in **`Daily Tasks`** section - This will be the Home page(By default) for app.
    - While adding tasks user can mention `day`, `date`, `reminder` - if they want the tasks for some other day else `default current date, time, year, month` will be displayed.
    - Can add reminder to tasks - get `notified through app's notification`(if using mobile or desktop apps, if using web when chrome or other browser opened this website then it'll work), `email`, and ``alarm``(if using mobile or desktop apps, if using web when crome or other browser opened this website then it'll work).
    - User can `add single or multiple tasks` at a time.
    - User can `paste the tasks`.
    - Can also add progress - `completed`, `due`, `remider` and `so on`.
    - Each tasks should have - `Name`, `Description`, `Links(Optional)`, `Progress`, `Date, Time (Optional if user wants to schedule for another day)`.
    - while adding new tasks - it'll be `tagged` as `new task`.

2. **`Update Tasks:`**
    - Users `can edit the tasks name, desription, progress info, date and info`.
    - Once user edit any info of that tasks - then it'll be `tagged` as `updated task` - done automatically for all.
    - User can `delete` the `completed` or `unwanted tasks` from the list.
    - Can add `images`, `links` and `connect to social platforms` if needed.

3. **`Deleted Tasks:`**
    - Once the `task get deleted` it'll be `directly available` in the **`Trash`** section.
    - Deleted tasks in **`Trash`** will be `tagged` as `deleted task`.
    - User can `Restore` that tasks by click `Restore` button.
    - `Restored tasks` will be `tagged` as `restored task` and user can view it in **`View tasks`** section.
    - Can `perform all the action` to this `restored tasks like other tasks`.

4. **`View Tasks:`**
    - Users can view all tasks in **`Calender View`** section both daily and scheduled tasks.
    - Can `update the tasks` by clicking `update` button.

5. **`Filter/Search Tasks:`**
    - User can search for task by their `name`, `tag`.

6. **`Library:`**
    - User can Check on **`Collections`** section and access the `books`, `audios`, `videos`, `blogs` and so on that `they added from different medium`.
    - User can `remove these` and `also edit their information.`

7. **`Project WorkSpace:`**
    - User can `create workspace for each project` they are working on.
    - Can `invite teamates` and `friends` or `collegues` to work on the same project.
    - Can `divide the tasks/features and assign it to others.`
    - Can `access AI to clarrify doubts`, `coding errors` and so on. 
    - `Notes(wiki)` available to `research` and `keep it for study` and `referenece`.
    - Can `connect to github repo` - all `code will be tracked` and `commits updates will be displayed here.`
    - If needed user `can see the repo and its codebase here.`
    - Can `connect to figma and other tool` required for project.
    
8. **`Student Workspace:`**
    - `Academic management` - dashboard to keep track of all the courses, assignment, refernce meterial, study planner(ai).
    - `Resource like` - PDF's, audio, videos, images, docs, access to `library`.
    - `course suggestion to self development`.

9. **`AI Support:`**
    - Can access `ChatGpt`, `Claude`, `Deepseek`, `Kimi`, `Bard` - Combined as **`Standard Ai`**.
    - `Internet Search` supports.
    - `Deepthink` and `Research` - **`DeepSearch`**.

10. **`Personal Assistant:`**
    - `Jarvis`/`Edith` like `full system support` AI.

11. **`User Authentication:`**
    - `SignUp`/`Register` an account with **`Task-Brain`** application.
    - `Login to application.`
    - `Forgot Password` - recieves `OTP` to change it.

12. **`Private folder:`**
    - Can Keep some `private docs` and also `connect Google Drive` and other `secure tools`.

13. **`Docs Support:`**
    - Can `refer the docs` to check how things works and for `tutorial`.
    - `Help center`
    - `feedback` and `bug report` center.

14. **`User Settings:`**
    - User information - `image`, `name`, `description`, connect to `social accounts`, `resume`, `contact` - `email`, `phone`.
    - `Dark` and `light` theme modes.
    - `General Settings` - font, size and so on.
    - `LogOut`, `Delete account`.
    - `Shortcut Keys`.
    - `Premium upgrade`

15. **`Whiteboard:`**
    - User can use it to `design systems`, `UIUX`, `Take Notes with ai supports`.

16. **`If user didn't complete that days tasks:`**
    - `Give notification to user` and `a call to them ai bot`, `mail`.
    - Ask `Why` and get `info` `reset the plan` as per user.

---

## **`Non Functional Requirements`** -> `How should app behave(User Experience and system expectation)` ?

1. **`Smooth Performance:`**
    - Should `have logo animation` while opening the `app` and `pages` in `0.1sec`.
    - The `app should load in under 2 seconds on most devices.`
    - `API response` times should be `under 300ms`.
    - `Tasks` should be `added`/`edited` instantly (smooth animations/local changes with later sync).
    - `AI replies` should respond `within 5–8 seconds max`- During the wait display `Thinking...`.

2. **`Scalability:`**
    - `Should handle:`
        - `1 user` at first
        - `100 users` in `MVP` phase
        - `10,000+ users` in `scaling` phase
    - `Modular codebase` to `support microservices later.`
    - Use `message queues for reminders/notifications` if scale grows (RabbitMQ / Redis).

3. **`Availability & Reliability:`**
    - The `app should be up 99.9% of the time.`
    - `Auto-retries` in case of network failures. 
    - Data `should not be lost even if the user reloads/refreshes` the page.

4. **`Security:`**
    - `Passwords must be hashed` and stored `securely`.
    - `Sensitive operations `(edit, delete, restore) must be `protected` by auth.
    - `Inputs` must be `validated` on `frontend` and `backend` to avoid XSS, SQLi, etc.
    - `Use HTTPS`, `secure cookies`, and `token-based auth` (JWT).
    - Use `Content Security Policy` and `CORS` headers correctly.

5. **`Responsiveness & Compatibility`**
    - The app must work on:
        - `Mobile`
        - `Desktop`
        - `Tablet`
        - `Older browsers (basic fallback)`
    - `Touch`, `keyboard`, and `mouse input supported`
    - `Light` and `dark mode` with theme memory
    
6. **`Usability & UX`**
    - `Navigation` should be `intuitive`.
    - `User should never need a manual to use basic features.`
    - `Forms` should have `clear validation errors`, f`ocus rings`, and `auto-focus`, `auto correctors`.
    - Use `consistent fonts`, `spacing`, and `button` design.

7. **`Accessibility (A11y)`**
    - `Should work` for users using:
        - `Screen readers`
        - `High contrast mode`
        - `Keyboard-only navigation`
    - Use `aria-labels`, semantic HTML, skip links, etc.

8. **`Maintainability`**
    - Codebase must follow `modular architecture`.
    - `Folder structure must follow conventions` (MVC/clean arch/etc).
    - Use `ESLint`, `Prettier`, and `code comments` where needed.
    - `Version control`: `Proper commits, branches, PRs via Git.`

9. **`Extensibility`**
    - Should allow for `new features` to be added `without breaking existing code.`
    - `Feature toggles` (for AI, workspaces, etc).
    - Support `plugin/module-based architecture in future.`

10. **`Localization & Internationalization (optional now, but good for scaling)`**
    - App should `support multiple languages` in the future.
    - Use language files (`like en.json, hi.json, etc`).

11. **`Offline Support`**
    - User `can access cached tasks without internet.`
    - `LocalStorage` or `IndexedDB` used.
    - `Sync with server once online.`

12. **`Deployment & CI/CD`**
    - App should be `deployed` on `cloud platforms` like:
    - `Netlify` (frontend)
    - `Render`/`Railway` (backend)
    - `Auto-deploy from GitHub` via CI (GitHub Actions or Railway)
    - Use `.env` for `secrets`

13. **`Testing Support`**
    - Every module should support `unit tests` (backend)
    - `UI tested` with Playwright/Cypress (later)
    - `Integration tests` for login, task creation, and reminders

## **`Tech Stack`:**
    - `Frontend`:
        - `HTML` - Hyper Text Markup Language
        - `CSS` - Cascading Style Sheet
        - `Vanila Javascript`
    - `Backend`:
        - `NodeJS`
        - `ExpressJS`
    - `Database`:
        - `MongoDB`
    - `Version Control`:
        - `Git` and `Github`

## **`Future Tech Stack`:**
    - `Frontend`:
        - `TailwindCSS` - CSS Framework
        - `React` - Javascript Framwork
    - `Backend`:
        - `NodeJS`
        - `ExpressJS`
    - `Database`:
        - `MongoDB`
        - `PostgresSQL`
    - `Version Control`:
        - `Git` and `Github`
    - `Deployment`
        - `CICD` - Github Actions
        - `AWS`
        - `Docker`
        - `Kubernetes`

---

### **`Project MVP`** - `Available in `MVP.md` file inside `doc` folder`.

### **`Project Future Features`** - `Available in `futureFeatures.md` file inside `doc` folder`.
---
