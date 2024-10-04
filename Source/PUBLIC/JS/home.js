//timer
let timers = {
  pomodoro: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 900, // 15 minutes
};
let currentTimer = "pomodoro";
let timer;
let isRunning = false;
let timeLeft = timers[currentTimer];
let usePomodoroSequence = true; // Default to true (sequence enabled)
let pomodoroCount = 0; // Track the number of completed Pomodoro sessions

const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const settingsButton = document.getElementById("settings");
const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const modeButtons = document.querySelectorAll(".modes button");
const movecontai = document.getElementById("move-contai");
const closesset = document.getElementById("imgclose");
const pomodoroInput = document.getElementById("pomodoroTime");
const shortBreakInput = document.getElementById("shortBreakTime");
const longBreakInput = document.getElementById("longBreakTime");
const backgroundImageInput = document.getElementById("backgroundImage");
const dropArea = document.getElementById("dropArea");
const settingpage = document.getElementById("settingpage");
const timercontai = document.getElementById("contai-timer");
const playerContainer = document.getElementById("home");
let backgroundFile;

const usePomodoroSequenceInput = document.getElementById("usePomodoroSequence");

// Update the sequence setting based on user input
usePomodoroSequenceInput.addEventListener("change", function () {
  usePomodoroSequence = usePomodoroSequenceInput.checked;
});

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes < 10 ? "0" + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? "0" + seconds : seconds;
}
var alarmSound = document.getElementById("alarmSound");

function startStopTimer() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
    startStopButton.title = "Bắt đầu pomodoro";
  } else {
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
        startStopButton.title = "Bắt đầu pomodoro";
        alarmSound.play()
        if (usePomodoroSequence) {
          handlePomodoroSequence(); // Handle the Pomodoro sequence logic
        }
      }
    }, 1000);
    startStopButton.innerHTML = `<img src="/img/tool_imgs/square.png">`;
    startStopButton.title = "Dừng pomodoro";
  }
  isRunning = !isRunning;
}
function handlePomodoroSequence() {
  if (pomodoroCount === 3) {
    // After 4 Pomodoro sessions, take a long break
    switchMode("longBreak");
    pomodoroCount = 0;
  } else if (currentTimer === "pomodoro") {
    // After each Pomodoro session, take a short break
    switchMode("shortBreak");
  } else {
    // After a short break, go back to Pomodoro
    switchMode("pomodoro");
    pomodoroCount++;
  }
  startStopTimer(); // Automatically start the next session
}
function resetTimer() {
  clearInterval(timer);
  timeLeft = timers[currentTimer];
  isRunning = false;
  startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
  startStopButton.title = "Bắt đầu pomodoro";
  updateDisplay();
}

function switchMode(mode) {
  currentTimer = mode;
  resetTimer();
  modeButtons.forEach(button => {
    button.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
    button.style.color = "white"; 
  });

  const selectedButton = document.querySelector(`#${mode}`);
  if (selectedButton) {
    selectedButton.style.backgroundColor = "rgba(0, 0, 0)";
    selectedButton.style.color = "rgb(257, 219, 164)";
  }
}

modeButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    switchMode(e.target.id);
  });
});
function openSettings() {
  settingpage.style.display = "block";
  movecontai.style.left = "-100%";
  pomodoroInput.value = timers.pomodoro / 60;
  shortBreakInput.value = timers.shortBreak / 60;
  longBreakInput.value = timers.longBreak / 60;
}

function closeSettings() {
  movecontai.style.left = "0";
  setTimeout(function () {
    settingpage.style.display = "none";
  }, 250);
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    playerContainer.style.backgroundImage = `url(${e.target.result})`;
    const urlbg = `url(${e.target.result})`;
    bgforpip(urlbg);
  };
  reader.readAsDataURL(file);
}
dropArea.addEventListener("click", () => backgroundImageInput.click());

backgroundImageInput.addEventListener("change", function (e) {
  file = e.target.files[0];
  renderPomoBg(file);
});

function renderPomoBg(file, data) {
  if (!file || file === null || data) {
    playerContainer.style.backgroundImage = data;
    const urlbg = data;
    bgforpip(urlbg);
  } else {
    const reader = new FileReader();
    reader.onload = function (e) {
      playerContainer.style.backgroundImage = `url(${e.target.result})`;
      const urlbg = `url(${e.target.result})`;
      bgforpip(urlbg);
      savePomoBg(urlbg);
    };
    reader.readAsDataURL(file);
  }
}

function savePomoBg(fileUrl) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/pomodoroBackground", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fileUrl }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}

function fetchData() {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    getPomoBg();
    getPomoTime();
    setTimeout(getTodolist, 2000);
    setTimeout(getEventlist, 4000);
    setTimeout(getTimetable, 6000);
    setTimeout(getNotesData, 8000);
  }
}

window.addEventListener("load", function () {
  fetchData();
});

function getPomoBg() {
  fetch("/save/pomodoroBackground")
    .then((res) => res.json())
    .then((data) => checkPomoBg(data))
    .catch((err) => console.log(err.message));
}

function getTimetable() {
  fetch("/save/timetable")
    .then((res) => res.json())
    .then((data) => checkTimetable(data))
    .catch((err) => console.log(err.message));
}

function getPomoTime() {
  fetch("/save/pomotime")
    .then((res) => res.json())
    .then((data) => checkPomoTime(data))
    .catch((err) => console.log(err.message));
}

function getTodolist() {
  fetch("/save/todolist")
    .then((res) => res.json())
    .then((data) => checkTodolist(data))
    .catch((err) => console.log(err.message));
}

function getEventlist() {
  fetch("/save/eventlist")
    .then((res) => res.json())
    .then((data) => checkEventlist(data))
    .catch((err) => console.log(err.message));
}

function getNotesData() {
  fetch("/save/notesdata")
    .then((res) => res.json())
    .then((data) => checkNotesData(data))
    .catch((err) => console.log(err.message));
}

function checkEventlist(data) {
  addEventServer(data);
}

function checkNotesData(data) {
  addNotesDataServer(data);
}

function checkTimetable(data) {
  addTimetableServer(data);
}

function checkPomoTime(data) {
  addPomoTimeServer(data);
}

function checkTodolist(data) {
  addTaskServer(data);
}

function checkPomoBg(data) {
  renderPomoBg(null, data);
}

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.remove("dragover");
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    backgroundFile = files[0];
    handleFile(backgroundFile);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.add("dragover");
}

function handleDragLeave() {
  dropArea.classList.remove("dragover");
}

function saveSettings() {
  var PomoTime = [];
  timers.pomodoro = pomodoroInput.value * 60;
  timers.shortBreak = shortBreakInput.value * 60;
  timers.longBreak = longBreakInput.value * 60;
  usePomodoroSequence = usePomodoroSequenceInput.checked;
  if (currentTimer === "pomodoro") {
    timeLeft = timers.pomodoro;
  } else if (currentTimer === "shortBreak") {
    timeLeft = timers.shortBreak;
  } else if (currentTimer === "longBreak") {
    timeLeft = timers.longBreak;
  }
  if (backgroundFile) {
    handleFile(backgroundFile);
  }

  updateDisplay();
  closeSettings();
  PomoTime.push(timers);
  savePomoTime(PomoTime);
}

function addPomoTimeServer(data) {
  var dataTime = data[0];
  timers.pomodoro = dataTime.pomodoro;
  timers.shortBreak = dataTime.shortBreak;
  timers.longBreak = dataTime.longBreak;
  pomodoroInput.value = dataTime.pomodoro / 60;
  shortBreakInput.value = dataTime.shortBreak / 60;
  longBreakInput.value = dataTime.longBreak / 60;
  if (currentTimer === "pomodoro") {
    timeLeft = timers.pomodoro;
  } else if (currentTimer === "shortBreak") {
    timeLeft = timers.shortBreak;
  } else if (currentTimer === "longBreak") {
    timeLeft = timers.longBreak;
  }
  if (backgroundFile) {
    handleFile(backgroundFile);
  }
  updateDisplay();
}

function savePomoTime(Pomotime) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/pomotime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Pomotime),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}



startStopButton.addEventListener("click", startStopTimer);
startStopButton.title = "Bắt đầu pomodoro";
resetButton.addEventListener("click", resetTimer);
resetButton.title = "Cài lại pomodoro";
settingsButton.addEventListener("click", openSettings);
settingsButton.title = "Chuyển qua chế độ chỉnh sửa pomodoro";
closesset.addEventListener("click", saveSettings);
document.getElementById("fullsceenbtn").addEventListener("click", fullscreen);

dropArea.addEventListener("drop", handleDrop);
dropArea.addEventListener("dragover", handleDragOver);
dropArea.addEventListener("dragleave", handleDragLeave);

updateDisplay();

function fullscreen() {
  if (!document.fullscreenElement) {
    if (playerContainer.requestFullscreen) {
      playerContainer.requestFullscreen();
    } else if (playerContainer.mozRequestFullScreen) {
      // Firefox
      playerContainer.mozRequestFullScreen();
    } else if (playerContainer.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      playerContainer.webkitRequestFullscreen();
    } else if (playerContainer.msRequestFullscreen) {
      // IE/Edge
      playerContainer.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  }
}
addEventListener("fullscreenchange", function () {
  if (document.fullscreenElement) {
    document.getElementById(
      "fullsceenbtn"
    ).innerHTML = `<img src="/img/tool_imgs/outfullscreen.png">`;
  } else if (!document.fullscreenElement) {
    document.getElementById(
      "fullsceenbtn"
    ).innerHTML = `<img src="/img/tool_imgs/fullscreen.png">`;
  }
});

if ("documentPictureInPicture" in window) {
  const togglePipButton = document.createElement("button");
  togglePipButton.innerHTML = `<img src="/img/tool_imgs/picinpic.png">`;
  togglePipButton.classList.add("step-eight-Home");
  togglePipButton.title = "Chuyển qua chế độ Picture-In-Picture";
  togglePipButton.addEventListener("click", togglePictureInPicture, false);

  document.getElementById("controlbar").appendChild(togglePipButton);
}
const playerContainerpip = document.createElement("div");
playerContainerpip.style.backgroundImage = `url("/img/others_imgs/bg.jpg")`;

const timerpage = document.querySelector(".main-contai");
async function togglePictureInPicture() {
  // Early return if there's already a Picture-in-Picture window open
  if (window.documentPictureInPicture.window) {
    timerpage.append(timercontai);
    window.documentPictureInPicture.window.close();
    return;
  }

  // Open a Picture-in-Picture window.
  const pipWindow = await window.documentPictureInPicture.requestWindow({
    width: 480,
    height: 270 + 50,
  });

  // Add pagehide listener to handle the case of the pip window being closed using the browser X button
  pipWindow.addEventListener("pagehide", (event) => {
    timerpage.append(timercontai);
  });

  // Copy style sheets over from the initial document
  // so that the player looks the same.
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules]
        .map((rule) => rule.cssText)
        .join("");
      const style = document.createElement("style");

      style.textContent = cssRules;
      pipWindow.document.head.appendChild(style);
    } catch (e) {
      const link = document.createElement("link");

      link.rel = "stylesheet";
      link.type = styleSheet.type;
      link.media = styleSheet.media;
      link.href = styleSheet.href;
      pipWindow.document.head.appendChild(link);
    }
  });

  // Move the player to the Picture-in-Picture window.
  playerContainerpip.classList.add("main-contai");
  playerContainerpip.append(timercontai);
  pipWindow.document.body.append(playerContainerpip);
}
function bgforpip(e) {
  playerContainerpip.style.backgroundImage = e;
}

document.getElementById("move-home").style.top = "0%";

function movehome() {
  if (document.getElementById("move-home").style.top === "0%") {
    document.getElementById("move-home").style.top = "-100%";
  } else {
    document.getElementById("move-home").style.top = "0%";
  }
}

//to-do code
const tilemagic = document.getElementById("titlemagic");
const listask = document.getElementById("list");
let currentEditingTask = null;

function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

var isLogin = document.querySelector("#user-avar");
var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
if (link) {
} else {
  var saveTodolistDebounced = debounce(saveTodolist, 5000);
}

function addTaskServer(data) {
  var tasks = data;
  if (tasks) {
    tasks.forEach((task) => {
      var taskcontai = document.createElement("div");
      taskcontai.classList.add("taskcontai");

      if (task.status === true) {
        taskcontai.innerHTML = `
                <span class="task-text" style="text-decoration:line-through">${task.task}</span>
                <div class="options">
                    <button class="btnedit" onclick="edittask(this)" title="Chỉnh sửa việc cần làm"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                    <button class="btndelete" onclick="deletetask(this)" title="Xóa việc cần làm"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
                <label class="custom-checkbox">
                <input type="checkbox" onclick="toggleComplete(this)" checked>
                <div class="checkmark" title="Đánh dấu hoàn thành việc cần làm"></div>
                </label>
            </div>
                </div>`;
      } else {
        taskcontai.innerHTML = `
                <span class="task-text">${task.task}</span>
                <div class="options">
                    <button class="btnedit" onclick="edittask(this)" title="Chỉnh sửa việc cần làm"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                    <button class="btndelete" onclick="deletetask(this)" title="Xóa việc cần làm"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
                <label class="custom-checkbox">
                <input type="checkbox" onclick="toggleComplete(this)">
                <div class="checkmark" title="Đánh dấu hoàn thành việc cần làm"></div>
                </label>
            </div>
                </div>`;
      }
      listask.appendChild(taskcontai);
    });
  }
}

function addTask() {
  tilemagic.style.top = "-35px";
  const taskcontent = document.getElementById("inputTask").value;
  if (taskcontent.length !== 0) {
    if (currentEditingTask) {
      // Nếu đang trong chế độ chỉnh sửa
      const taskText = currentEditingTask.querySelector(".task-text");
      taskText.textContent = taskcontent;
      resetInput();
    } else {
      const taskcontai = document.createElement("div");
      taskcontai.classList.add("taskcontai");
      // Nếu là thêm mới
      taskcontai.innerHTML = `
                <span class="task-text">${taskcontent}</span>
                <div class="options">
                    <button class="btnedit" onclick="edittask(this)" title="Chỉnh sửa việc cần làm"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                    <button class="btndelete" onclick="deletetask(this)" title="Xóa việc cần làm"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
                <label class="custom-checkbox">
                <input type="checkbox" onclick="toggleComplete(this)">
                <div class="checkmark" title="Đánh dấu hoàn thành việc cần làm"></div>
                </label>
            </div>
                </div>`;
      listask.appendChild(taskcontai);
      resetInput();
    }
  } else {
    document.getElementById(
      "btn-addtask"
    ).innerHTML = `<img src="/img/tool_imgs/plus.png" style="width: 100%; height:100%" title="Lưu việc cần làm">`;
  }
}

function edittask(button) {
  tilemagic.style.top = "-35px";
  currentEditingTask = button.closest(".taskcontai");
  const taskText = currentEditingTask.querySelector(".task-text").textContent;
  const inputTask = document.getElementById("inputTask");
  inputTask.value = taskText;
  const btnAddTask = document.getElementById("btn-addtask");
  btnAddTask.innerHTML = `<img src="/img/tool_imgs/check.png" style="width: 100%; height:100%" title="Lưu chỉnh sửa việc cần làm">`;
}

function deletetask(button) {
  const taskcontai = button.closest(".taskcontai");
  taskcontai.remove();
  resetInput();
}

function toggleComplete(checkbox) {
  var taskcontai = checkbox.closest(".taskcontai");
  var taskText = taskcontai.querySelector(".task-text");
  if (checkbox.checked) {
    taskText.style.textDecoration = "line-through";
  } else {
    taskText.style.textDecoration = "none";
  }
  saveTasksDebounced();
}

function resetInput() {
  var taskTestsArr = [];
  var taskTests = document.querySelectorAll(".task-text");
  taskTests.forEach((taskTest) => {
    const style = window.getComputedStyle(taskTest);
    if (style.textDecoration === "line-through solid rgb(255, 255, 255)") {
      taskTestsArr.push({
        task: taskTest.textContent,
        status: true,
      });
    } else {
      taskTestsArr.push({
        task: taskTest.textContent,
        status: false,
      });
    }
  });
  saveTasksDebounced();
  currentEditingTask = null;
  document.getElementById("inputTask").value = "";
  document.getElementById(
    "btn-addtask"
  ).innerHTML = `<img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%" title="Chỉnh sửa việc cần làm">`;
  tilemagic.style.top = "0px";
}

const saveTasksDebounced = debounce(() => {
  var taskTestsArr = [];
  var taskTests = document.querySelectorAll(".task-text");
  taskTests.forEach((taskTest) => {
    const style = window.getComputedStyle(taskTest);
    if (style.textDecoration === "line-through solid rgb(255, 255, 255)") {
      taskTestsArr.push({
        task: taskTest.textContent,
        status: true,
      });
    } else {
      taskTestsArr.push({
        task: taskTest.textContent,
        status: false,
      });
    }
  });
  saveTodolistDebounced(taskTestsArr);
}, 1000);

function saveTodolist(tasks) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tasks),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}

//calender code

let timetable = [];
let notesData = {};
let currentWeekOffset = 0;
document.getElementById("total-contai-calendar").style.top = "-100%";
function movecalendar() {
  if (document.getElementById("total-contai-calendar").style.top == "-100%") {
    document.getElementById("total-contai-calendar").style.top = "0%";
  } else {
    document.getElementById("total-contai-calendar").style.top = "-100%";
  }
}
document
  .getElementById("backfromcalendarform")
  .addEventListener("click", () => {
    movecalendar();
  });
document.getElementById("showTimetableForm").addEventListener("click", () => {
  movecalendar();
  generateTimetableRows();
});

function generateTimetableRows() {
  const tbody = document.getElementById("timetableBody");
  tbody.innerHTML = "";

  for (let i = 1; i < 11; i++) {
    const tr = document.createElement("tr");

    const timeCell = document.createElement("td");
    if (i === 0) {
      timeCell.textContent = "Time";
    } else {
      const timeInput = document.createElement("input");
      timeInput.type = "time";
      timeInput.className = "time-input";
      timeInput.title = "Chọn thời gian";
      timeCell.appendChild(timeInput);
    }
    tr.appendChild(timeCell);

    for (let j = 0; j < 7; j++) {
      const dayCell = document.createElement("td");
      if (i > 0) {
        dayCell.innerHTML = `<select class="subject" title="Chọn môn học">
                                  <option value=""></option>
                                  <option value="Toán">Toán</option>
                                  <option value="Vật Lý">Vật Lý</option>
                                  <option value="Hoá Học">Hoá Học</option>
                                  <option value="Sinh Học">Sinh Học</option>
                                  <option value="Tin Học">Tin Học</option>
                                  <option value="Ngữ Văn">Ngữ Văn</option>
                                  <option value="Lịch Sử">Lịch Sử</option>
                                  <option value="Địa Lí">Địa Lí</option>
                                  <option value="Tiếng Anh">Tiếng Anh</option>
                                  <option value="Công Nghệ">Công Nghệ</option>
                                  <option value="GDTC">GDTC</option>
                                  <option value="GDĐP">GDĐP</option>
                                  <option value="GDQP-AN">GDQP-AN</option>
                                  <option value="HĐTN">HĐTN</option>
                                  <option value="HĐTN">TCAV</option>
                                  </select>`;
      }
      tr.appendChild(dayCell);
    }
    tbody.appendChild(tr);
  }
}

document.getElementById("saveTimetable").addEventListener("click", () => {
  const rows = document.querySelectorAll("#timetableBody tr");
  timetable = [];

  rows.forEach((row) => {
    const time = row.children[0].querySelector("input")?.value || "";
    const events = Array.from(row.children)
      .slice(1)
      .map((cell) => cell.querySelector("select")?.value || "");
    if (time) {
      timetable.push({ time, events });
    }
  });
  notesData = {};
  currentWeekOffset = 0;
  saveNotesData(notesData);
  updateMainCalendar();
  movecalendar();
  saveTimetable(timetable);
});

function saveTimetable(timetable) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/timetable", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(timetable),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}

document.getElementById("prevWeek").addEventListener("click", () => {
  currentWeekOffset--;
  updateMainCalendar();
  getTimetable();
});

document.getElementById("nextWeek").addEventListener("click", () => {
  currentWeekOffset++;
  updateMainCalendar();
  getTimetable();
});

function getWeekDates(offset) {
  const today = new Date();
  // Set ngày bắt đầu của tuần (Chủ Nhật)
  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setDate(today.getDate() - today.getDay() + offset * 7); // Sunday as first day of week

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(firstDayOfWeek);
    date.setDate(firstDayOfWeek.getDate() + i);
    return {
      date: date.toLocaleDateString("vi-VN", {
        day: "numeric",
        month: "numeric",
      }), // Hiển thị ngày và tháng
      dayName: date.toLocaleDateString("vi-VN", { weekday: "long" }), // Hiển thị tên thứ trong tuần
      isToday: date.toDateString() === today.toDateString(), // Kiểm tra ngày hôm nay
    };
  });
}
function addNotesDataServer(data) {
  notesData = data[0];
  getTimetable();
}

function addTimetableServer(data) {
  const mainCalendar = document.getElementById("calendarContent");
  mainCalendar.innerHTML = "";

  const dates = getWeekDates(currentWeekOffset);
  const calendarTitle = document.getElementById("calendarTitle");
  calendarTitle.textContent = `Tuần ${dates[0].date} - ${dates[6].date}`;

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
      <th>Thời gian</th>
      ${dates
      .map(
        (d) =>
          `<th${d.isToday ? ' class="current-day"' : ""}>${d.dayName} (${d.date
          })</th>`
      )
      .join("")}
  `;
  table.appendChild(headerRow);

  data.forEach((slot) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${slot.time}</td>
          ${slot.events
        .map((event, index) => {
          const dateKey = `${dates[index].date}_${slot.time}`;
          const noteText = notesData[dateKey]?.noteText || "";
          const isCompleted = notesData[`${dateKey}_completed`] || false;

          return `
              <td>
              <div class="contai-event-content">
                  <div class="event-content">${event}</div><button class="notes-btn" title="Tạo ghi chú"><img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%"></button>
                  </div>
                  ${noteText
              ? `
                      <div class="event-note ${isCompleted ? "completed-note" : ""
              }">
                      <label class="custom-checkbox custom-checkbox2">
                          <input type="checkbox" class="complete-note-checkbox" ${isCompleted ? "checked" : ""
              } data-note-key="${dateKey}">
                      <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
                      </label>
                          ${noteText}
                      </div>
                  `
              : ""
            }
                  <div class="notes-input-container" style="display:none;">
                      <input type="text" class="notes-input" placeholder="Bài tập..." value="${noteText}">
                      <button class="save-note-btn" title="Thêm ghi chú"><img src="/img/tool_imgs/plus2.png" style="width: 100%; height:100%"></button>
                  </div>
              </td>`;
        })
        .join("")}
      `;
    table.appendChild(row);
  });

  mainCalendar.appendChild(table);

  document.querySelectorAll(".notes-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const container = this.parentElement;
      const tdcontainer = container.parentElement;
      const notesinputcontainer = tdcontainer.querySelector(
        ".notes-input-container"
      );
      notesinputcontainer.style.display = "flex";
      this.style.display = "none";
    });
  });

  document.querySelectorAll(".save-note-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const container = this.parentElement;
      const noteInput = container.querySelector(".notes-input");
      const eventCell = this.closest("td");
      const eventName = eventCell.querySelector(".event-content").textContent;
      const noteText = noteInput.value.trim();
      const timeSlot = eventCell.closest("tr").children[0].textContent;
      const dayIndex =
        Array.from(eventCell.parentElement.children).indexOf(eventCell) - 1;
      const dateKey = `${dates[dayIndex].date}_${timeSlot}`;

      if (noteText === "") {
        delete notesData[dateKey];
        delete notesData[`${dateKey}_completed`];

        const noteDiv = eventCell.querySelector(".event-note");
        if (noteDiv) {
          noteDiv.remove();
        }
        const notesBtn = eventCell.querySelector(".notes-btn");
        notesBtn.innerHTML =
          '<img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%" title="Tạo ghi chú">';

        container.style.display = "none";
        notesBtn.style.display = "inline";
        saveNotesData(notesData);
        updateMainCalendar();
        getTimetable();
        return;
      }

      notesData[dateKey] = {
        noteText: noteText,
        dayName: dates[dayIndex].dayName,
        eventname: eventName,
      };
      notesData[`${dateKey}_completed`] = false;

      let noteDiv = eventCell.querySelector(".event-note");
      if (noteDiv) {
        noteDiv.innerHTML = `<label class="custom-checkbox custom-checkbox2">
              <input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">
              <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
              </label>
              ${noteText}`;
      } else {
        noteDiv = document.createElement("div");
        noteDiv.className = "event-note";
        noteDiv.innerHTML = `<label class="custom-checkbox custom-checkbox2">
              <input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">
              <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
              </label>
              ${noteText}`;
        eventCell.appendChild(noteDiv);
      }

      const notesBtn = eventCell.querySelector(".notes-btn");
      notesBtn.innerHTML =
        '<img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%" title="Tạo ghi chú">';

      container.style.display = "none";
      notesBtn.style.display = "inline";

      addCompleteNoteListener();
      updateIncompleteNotesCount();
      saveNotesData(notesData);
    });
  });

  addCompleteNoteListener();
  updateIncompleteNotesCount();
}

function updateMainCalendar() {
  const mainCalendar = document.getElementById("calendarContent");
  mainCalendar.innerHTML = "";

  const dates = getWeekDates(currentWeekOffset);
  const calendarTitle = document.getElementById("calendarTitle");
  calendarTitle.textContent = `Tuần ${dates[0].date} - ${dates[6].date}`;

  const table = document.createElement("table");
  const headerRow = document.createElement("tr");
  headerRow.innerHTML = `
      <th>Thời gian</th>
      ${dates
      .map(
        (d) =>
          `<th${d.isToday ? ' class="current-day"' : ""}>${d.dayName} (${d.date
          })</th>`
      )
      .join("")}
  `;
  table.appendChild(headerRow);

  timetable.forEach((slot) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${slot.time}</td>
          ${slot.events
        .map((event, index) => {
          const dateKey = `${dates[index].date}_${slot.time}`;
          const noteText = notesData[dateKey]?.noteText || "";
          const isCompleted = notesData[`${dateKey}_completed`] || false;

          return `
              <td>
              <div class="contai-event-content">
                  <div class="event-content">${event}</div><button class="notes-btn" title="Tạo ghi chú" ><img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%"></button>
                  </div>
                  ${noteText
              ? `
                      <div class="event-note ${isCompleted ? "completed-note" : ""
              }">
                      <label class="custom-checkbox custom-checkbox2">
                          <input type="checkbox" class="complete-note-checkbox" ${isCompleted ? "checked" : ""
              } data-note-key="${dateKey}">
                      <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
                      </label>
                          ${noteText}
                      </div>
                  `
              : ""
            }
                  <div class="notes-input-container" style="display:none;">
                      <input type="text" class="notes-input" placeholder="Bài tập..." value="${noteText}">
                      <button class="save-note-btn" title="Thêm ghi chú"><img src="/img/tool_imgs/plus2.png" style="width: 100%; height:100%"></button>
                  </div>
              </td>`;
        })
        .join("")}
      `;
    table.appendChild(row);
  });

  mainCalendar.appendChild(table);

  document.querySelectorAll(".notes-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const container = this.parentElement;
      const tdcontainer = container.parentElement;
      const notesinputcontainer = tdcontainer.querySelector(
        ".notes-input-container"
      );
      notesinputcontainer.style.display = "flex";
      this.style.display = "none";
    });
  });

  document.querySelectorAll(".save-note-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const container = this.parentElement;
      const noteInput = container.querySelector(".notes-input");
      const eventCell = this.closest("td");
      const eventName = eventCell.querySelector(".event-content").textContent;
      const noteText = noteInput.value.trim();
      const timeSlot = eventCell.closest("tr").children[0].textContent;
      const dayIndex =
        Array.from(eventCell.parentElement.children).indexOf(eventCell) - 1;
      const dateKey = `${dates[dayIndex].date}_${timeSlot}`;

      if (noteText === "") {
        delete notesData[dateKey];
        delete notesData[`${dateKey}_completed`];

        const noteDiv = eventCell.querySelector(".event-note");
        if (noteDiv) {
          noteDiv.remove();
        }

        const notesBtn = eventCell.querySelector(".notes-btn");
        notesBtn.innerHTML =
          '<img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%" title="Tạo ghi chú">';

        container.style.display = "none";
        notesBtn.style.display = "inline";

        updateIncompleteNotesCount();
        return;
      }

      notesData[dateKey] = {
        noteText: noteText,
        dayName: dates[dayIndex].dayName,
        eventname: eventName,
      };
      notesData[`${dateKey}_completed`] = false;

      let noteDiv = eventCell.querySelector(".event-note");
      if (noteDiv) {
        noteDiv.innerHTML = `<label class="custom-checkbox custom-checkbox2">
              <input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">
              <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
              </label>
              ${noteText}`;
      } else {
        noteDiv = document.createElement("div");
        noteDiv.className = "event-note";
        noteDiv.innerHTML = `<label class="custom-checkbox custom-checkbox2">
              <input type="checkbox" class="complete-note-checkbox" data-note-key="${dateKey}">
              <div class="checkmark" title="Đánh dấu hoàn thành ghi chú"></div>
              </label>
              ${noteText}`;
        eventCell.appendChild(noteDiv);
      }

      const notesBtn = eventCell.querySelector(".notes-btn");
      notesBtn.innerHTML =
        '<img src="/img/tool_imgs/edit2.png" style="width: 100%; height:100%" title="Tạo ghi chú">';

      container.style.display = "none";
      notesBtn.style.display = "inline";

      addCompleteNoteListener();
      updateIncompleteNotesCount();
      saveNotesData(notesData);
    });
  });

  addCompleteNoteListener();
  updateIncompleteNotesCount();
}

function addCompleteNoteListener() {
  document.querySelectorAll(".complete-note-checkbox").forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const noteKey = this.dataset.noteKey;
      notesData[`${noteKey}_completed`] = this.checked;
      saveNotesData(notesData);
      const noteDiv = this.closest(".event-note");
      if (this.checked) {
        noteDiv.classList.add("completed-note");
      } else {
        noteDiv.classList.remove("completed-note");
      }
      updateIncompleteNotesCount();
    });
  });
}

function updateIncompleteNotesCount() {
  let incompleteCount = 0;
  const incompleteNotesList = [];
  for (let key in notesData) {
    if (key.endsWith("_completed") && notesData[key] === false) {
      const noteKey = key.replace("_completed", "");
      const [date, time] = noteKey.split("_");
      const notecontent = notesData[noteKey].noteText;
      const noteDayname = notesData[noteKey].dayName;
      const eventName = notesData[noteKey].eventname;
      incompleteCount++;
      incompleteNotesList.push({
        key: noteKey,
        date,
        time,
        note: notecontent,
        dayName: noteDayname,
        eventName,
      });
    }
  }

  incompleteNotesList.sort((a, b) => {
    const dateComparison =
      new Date(a.date.split("/").reverse().join("-")) -
      new Date(b.date.split("/").reverse().join("-"));
    return dateComparison === 0 ? a.time.localeCompare(b.time) : dateComparison;
  });

  document.getElementById("incompleteCount").textContent = incompleteCount;

  const incompleteNotesContainer = document.getElementById(
    "incompleteNotesContainer"
  );
  incompleteNotesContainer.innerHTML = "";

  let currentDay = "";
  incompleteNotesList.forEach((item) => {
    if (item.date !== currentDay) {
      currentDay = item.date;
      const dayDiv = document.createElement("div");
      dayDiv.className = "day-note-group";
      const dayTitle = document.createElement("h4");
      dayTitle.textContent = `${item.dayName} (${item.date})`;
      dayDiv.appendChild(dayTitle);
      incompleteNotesContainer.appendChild(dayDiv);
    }

    const noteElement = document.createElement("div");
    noteElement.className = "incomplete-note-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "incomplete-note-checkbox";
    checkbox.checked = false;
    checkbox.dataset.noteKey = item.key;
    checkbox.addEventListener("change", function () {
      const noteKey = this.dataset.noteKey;
      notesData[`${noteKey}_completed`] = this.checked;
      updateIncompleteNotesCount();
      updateMainCalendar();
      getTimetable();
      saveNotesData(notesData);
    });

    const noteText = document.createElement("span");
    noteText.innerHTML = `<div class="titlenotesincom"><div class="textnotescount"><h1>${item.eventName}</h1> <h3> - ${item.time}</h3></div></div> <h2>${item.note}</h2>`;

    const labelcheckbox = document.createElement("label");
    labelcheckbox.className = "custom-checkbox custom-checkbox2";
    const checkmark = document.createElement("div");
    checkmark.className = "checkmark";
    checkmark.title = "Đánh dấu hoàn thành ghi chú";
    labelcheckbox.append(checkmark);
    labelcheckbox.append(checkbox);

    noteElement.appendChild(noteText);
    noteElement.querySelector(".titlenotesincom").append(labelcheckbox);

    const lastDayDiv = incompleteNotesContainer.lastElementChild;
    lastDayDiv.appendChild(noteElement);
  });

  // Liên kết checkbox trong phần thống kê với lịch chính
  document.querySelectorAll(".incomplete-note-checkbox").forEach((checkbox) => {
    const noteKey = checkbox.dataset.noteKey;
    const correspondingCheckbox = document.querySelector(
      `.complete-note-checkbox[data-note-key="${noteKey}"]`
    );
    if (correspondingCheckbox) {
      checkbox.checked = correspondingCheckbox.checked;
    }
  });
}

function saveNotesData(notesData) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/notesdata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notesData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}

window.onload = updateMainCalendar;

//remind code
document
  .getElementById("eventForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const eventDateInput = document.getElementById("eventDate").value;
    const subjectInput = document.getElementById("subject").value;

    if (eventDateInput && subjectInput) {
      const [year, month, day] = eventDateInput.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      const daysLeft = calculateDaysLeft(year, month, day);

      const eventsList = document.querySelector(".remind-list");

      // Kiểm tra xem có sự kiện nào đang được chỉnh sửa không
      const editingEvent = document.querySelector(".editing");
      if (editingEvent) {
        var eventsEditingArr = [];
        // Cập nhật sự kiện hiện tại với giá trị mới
        editingEvent.innerHTML = `<h1>${subjectInput}</h1><h2>${formattedDate}</h2><h2>${daysLeft} ngày nữa</h2><div class="event-controls">
                  <button class="edit-btn" title="Chỉnh sửa nhắc kiểm tra"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                  <button class="delete-btn" title="Xóa nhắc kiểm tra"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
              </div>`;

        // Xóa lớp "editing" sau khi chỉnh sửa
        editingEvent.classList.remove("editing");

        var eventsEditingState = document.querySelectorAll(".event-item");
        eventsEditingState.forEach((event) => {
          eventsEditingArr.push({
            Subject: event.querySelector("h1").textContent,
            Calendar: event.querySelector("h2:first-of-type").textContent,
            Dateleft: event.querySelector("h2:nth-of-type(2)").textContent,
          });
        });
        saveEventLists(eventsEditingArr);

        // Thêm lại sự kiện cho nút Xóa và Chỉnh sửa
        addEventControlListeners(editingEvent);
      } else {
        var eventsNewArr = [];
        // Tạo một sự kiện mới nếu không có sự kiện nào đang được chỉnh sửa
        const newEvent = document.createElement("li");
        newEvent.classList.add("event-item");
        newEvent.innerHTML = `<h1>${subjectInput}</h1><h2>${formattedDate}</h2><h2>${daysLeft} ngày nữa</h2><div class="event-controls">
                  <button class="edit-btn" title="Chỉnh sửa nhắc kiểm tra"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                  <button class="delete-btn" title="Xóa nhắc kiểm tra"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
              </div>`;

        // Thêm sự kiện vào danh sách
        eventsList.appendChild(newEvent);
        var eventsNewState = document.querySelectorAll(".event-item");
        eventsNewState.forEach((event) => {
          eventsNewArr.push({
            Subject: event.querySelector("h1").textContent,
            Calendar: event.querySelector("h2:first-of-type").textContent,
            Dateleft: event.querySelector("h2:nth-of-type(2)").textContent,
          });
        });
        saveEventLists(eventsNewArr);

        // Thêm sự kiện khi click vào nút Xóa và Chỉnh sửa
        addEventControlListeners(newEvent);
      }

      // Sắp xếp các sự kiện theo ngày
      sortEvents(eventsList);

      // Reset form sau khi thêm hoặc chỉnh sửa sự kiện
      document.getElementById("eventForm").reset();
      toggleremind();
    }
  });

function addEventControlListeners(eventElement) {
  // Thêm sự kiện khi click vào nút Xóa
  eventElement
    .querySelector(".delete-btn")
    .addEventListener("click", function () {
      var eventsDeleteArr = [];
      eventElement.remove();
      var eventsNewState = document.querySelectorAll(".event-item");
      eventsNewState.forEach((event) => {
        eventsDeleteArr.push({
          Subject: event.querySelector("h1").textContent,
          Calendar: event.querySelector("h2:first-of-type").textContent,
          Dateleft: event.querySelector("h2:nth-of-type(2)").textContent,
        });
      });
      saveEventLists(eventsDeleteArr);
    });

  // Thêm sự kiện khi click vào nút Chỉnh sửa
  eventElement
    .querySelector(".edit-btn")
    .addEventListener("click", function () {
      document.getElementById("subject").value =
        eventElement.querySelector("h1").textContent;
      const formattedDate = eventElement.querySelector("h2").textContent;
      const [day, month, year] = formattedDate.split("/");
      document.getElementById("eventDate").value = `${year}-${month}-${day}`;
      eventElement.classList.add("editing");
      toggleremind();
    });
}

function saveEventLists(arr) {
  var isLogin = document.querySelector("#user-avar");
  var link = isLogin.querySelector('a[href][title="Tạo tài khoản"]');
  if (link) {
  } else {
    fetch("/save/eventlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(arr),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((err) => console.log(err.message));
  }
}

function addEventServer(data) {
  const eventsList = document.querySelector(".remind-list");
  data.forEach((event) => {
    const newEvent = document.createElement("li");
    newEvent.classList.add("event-item");
    newEvent.innerHTML = `<h1>${event.Subject}</h1><h2>${event.Calendar}</h2><h2>${event.Dateleft} </h2><div class="event-controls">
                  <button class="edit-btn" title="Chỉnh sửa nhắc kiểm tra"><img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%"></button>
                  <button class="delete-btn" title="Xóa nhắc kiểm tra"><img src="/img/tool_imgs/delete.png" style="width: 100%; height:100%"></button>
              </div>`;
    eventsList.appendChild(newEvent);
    addEventControlListeners(newEvent);
  });
  sortEvents(eventsList);
}

function calculateDaysLeft(year, month, day) {
  const eventDate = new Date(year, month - 1, day);
  const today = new Date();

  const timeDifference = eventDate - today;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft >= 0 ? daysLeft : 0;
}

function sortEvents(eventsList) {
  const events = Array.from(eventsList.children);

  events.sort((a, b) => {
    const dateA = extractDateFromEvent(a);
    const dateB = extractDateFromEvent(b);

    return dateA - dateB;
  });

  eventsList.innerHTML = "";
  events.forEach((event) => eventsList.appendChild(event));
}

function extractDateFromEvent(eventElement) {
  const dateText = eventElement.querySelector("h2").textContent.split(" ")[0];
  const [day, month, year] = dateText.split("/");
  return new Date(`${year}-${month}-${day}`);
}

document.getElementById("move-remind").style.top = "-100%";

function toggleremind() {
  const moveRemind = document.getElementById("move-remind");
  const toggleRemindBtn = document.getElementById("toggleremind");

  if (moveRemind.style.top === "-100%") {
    moveRemind.style.top = "0%";
    toggleRemindBtn.innerHTML = `<img src="/img/tool_imgs/turn-back.png" style="width: 100%; height:100%" title="Thoát khỏi tạo nhắc kiểm tra">`;
  } else {
    moveRemind.style.top = "-100%";
    toggleRemindBtn.innerHTML = `<img src="/img/tool_imgs/edit.png" style="width: 100%; height:100%" title="Tạo nhắc kiểm tra">`;
  }
}

function startIntro() {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        element: "#introduction-Home",
        intro:
          "Chào mừng đến với Website hướng nghiệp BeYourself. Hãy cùng tôi đi một vòng tham quan website này nhé!",
      },
      {
        element: ".step-one-Home",
        intro:
          "Đây là thanh navbar nơi sẽ mà bạn có thể chuyển qua lại giữa các trang của website",
      },
      {
        element: "#step-two-Home",
        intro: "Đây chính là logo và tên website",
      },
      {
        element: "#step-three-Home",
        intro:
          "Đây là trang chủ nơi mà bạn có thể sử dụng một số công cụ hỗ trợ học tập",
      },
      {
        element: "#step-four-Home",
        intro:
          "Đây là trang trắc nghiệm hướng nghiệp nơi mà bạn có thể tham gia vào các bài test hướng nghiệp và xem kết quả một cách chi tiết nhất",
      },
      {
        element: "#step-five-Home",
        intro:
          "Đây là trang đại học nơi mà bạn sẽ có thể tìm hiểu các thông tin chi tiết về các trường đại học trong phạm vi tùy chỉnh",
      },
      {
        element: ".step-six-Home",
        intro:
          "Đây là nơi mà bạn có thể tùy chỉnh và sử dụng thêm một số tính năng khác của website",
      },
      {
        element: ".step-seven-Home",
        intro: "Đây là công cụ pomodoro để hỗ trợ bạn trong việc học tập",
      },
      {
        element: ".step-eight-Home",
        intro:
          "Đây là nút tách màn hình pomodoro ra khỏi website để bạn có thể dễ dàng ghim ở màn hình máy tính của bạn",
      },
      {
        element: ".step-nine-Home",
        intro:
          "Đây là nút để bạn có thể phóng to cả màn hình của công cụ pomodoro",
      },
      {
        element: ".step-ten-Home",
        intro:
          "Đây là nút để bạn chuyển tới nơi có thêm nhiều công cụ hỗ trợ học tập hơn như Việc cần làm, Thời khóa biểu, Lịch kiểm tra",
      },
    ],
    showProgress: true,
    showBullets: false,
    disableInteraction: true,
  });

  intro.start();
}
