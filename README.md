This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Frontend for App - "To do list"
Registration is required to work. After registering, the user is taken to the page for creating boards.<br />

First, a board is created. By clicking on the board we need (creating it), we go to the page for creating lists and tasks. Next, we create lists. In task lists. Tasks can be moved between lists by dragg and dropp. For tasks, you can leave a description (by clicking on the task).<br />

Authentication is done through a digital certificate (tokens: access and refresh). Password change is available (after confirmation email). There is a password recovery function (a link is sent to the e-mail for recovery).<br />

There is a dynamic form for creating a board + lists / tasks with one request. (arrayForm in settings)<br />

PS: saga, ts, createSlice was used for test mode. (later I will translate everything into them)<br />

