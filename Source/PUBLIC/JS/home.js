//timer
let timers = {
  pomodoro: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 900 // 15 minutes
};
let currentTimer = 'pomodoro';
let timer;
let isRunning = false;
let timeLeft = timers[currentTimer];

const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const settingsButton = document.getElementById('settings');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const modeButtons = document.querySelectorAll('.modes button');
const movecontai = document.getElementById('move-contai');
const closesset = document.getElementById("imgclose");
const pomodoroInput = document.getElementById('pomodoroTime');
const shortBreakInput = document.getElementById('shortBreakTime');
const longBreakInput = document.getElementById('longBreakTime');
const backgroundImageInput = document.getElementById('backgroundImage');
const dropArea = document.getElementById('dropArea');
const settingpage = document.getElementById('settingpage');
const timercontai = document.getElementById("contai-timer");
const playerContainer = document.getElementById("home");

let backgroundFile;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startStopTimer() {
  if (isRunning) {
      clearInterval(timer);
      startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
  } else {
      timer = setInterval(() => {
          if (timeLeft > 0) {
              timeLeft--;
              updateDisplay();
          } else {
              clearInterval(timer);
              startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
          }
      }, 1000);
      startStopButton.innerHTML =`<img src="/img/tool_imgs/square.png">`;
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = timers[currentTimer];
  isRunning = false;
  startStopButton.innerHTML = `<img src="/img/tool_imgs/play.png">`;
  updateDisplay();
}

function switchMode(mode) {
  currentTimer = mode;
  resetTimer();
}

function openSettings() {
  settingpage.style.display="block"
  movecontai.style.left="-100%";
  pomodoroInput.value = timers.pomodoro / 60;
  shortBreakInput.value = timers.shortBreak / 60;
  longBreakInput.value = timers.longBreak / 60;
}

function closeSettings() {
  movecontai.style.left="0";
  setTimeout(function(){
      settingpage.style.display="none";
  }, 250);
}

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    playerContainer.style.backgroundImage = `url(${e.target.result})`;
    const urlbg =`url(${e.target.result})`;
    bgforpip(urlbg);
  };
  reader.readAsDataURL(file);
}
dropArea.addEventListener("click", () => backgroundImageInput.click());

backgroundImageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        playerContainer.style.backgroundImage = `url(${e.target.result})`;
        const urlbg =`url(${e.target.result})`;
        bgforpip(urlbg);
      };
      reader.readAsDataURL(file);
  }
});
function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
      backgroundFile = files[0];
      handleFile(backgroundFile);
  }
}

function handleDragOver(e) {
  e.preventDefault();
  e.stopPropagation();
  dropArea.classList.add('dragover');
}

function handleDragLeave() {
  dropArea.classList.remove('dragover');
}

function saveSettings() {
  timers.pomodoro = pomodoroInput.value * 60;
  timers.shortBreak = shortBreakInput.value * 60;
  timers.longBreak = longBreakInput.value * 60;
  if (currentTimer === 'pomodoro') {
      timeLeft = timers.pomodoro;
  } else if (currentTimer === 'shortBreak') {
      timeLeft = timers.shortBreak;
  } else if (currentTimer === 'longBreak') {
      timeLeft = timers.longBreak;
  }
    if (backgroundFile) {
        handleFile(backgroundFile);
  }

  updateDisplay();
  closeSettings();
}

modeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
      switchMode(e.target.id);
  });
});

startStopButton.addEventListener('click', startStopTimer);
resetButton.addEventListener('click', resetTimer);
settingsButton.addEventListener('click', openSettings);
closesset.addEventListener('click',saveSettings )
document.getElementById("fullsceenbtn").addEventListener('click',fullscreen)

dropArea.addEventListener('drop', handleDrop);
dropArea.addEventListener('dragover', handleDragOver);
dropArea.addEventListener('dragleave', handleDragLeave);

updateDisplay();

function fullscreen(){
  if (!document.fullscreenElement) {
    if (playerContainer.requestFullscreen) {
      playerContainer.requestFullscreen();
    } else if (playerContainer.mozRequestFullScreen) { // Firefox
      playerContainer.mozRequestFullScreen();
    } else if (playerContainer.webkitRequestFullscreen) { // Chrome, Safari and Opera
      playerContainer.webkitRequestFullscreen();
    } else if (playerContainer.msRequestFullscreen) { // IE/Edge
      playerContainer.msRequestFullscreen();
    }
} else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
      document.msExitFullscreen();
    }
}
}
addEventListener("fullscreenchange", function() {
  if(document.fullscreenElement){
    document.getElementById("fullsceenbtn").innerHTML=`<img src="/img/tool_imgs/outfullscreen.png">`;
  }
  else if(!document.fullscreenElement){
    document.getElementById("fullsceenbtn").innerHTML=`<img src="/img/tool_imgs/fullscreen.png">`;
  }
});

  

if ("documentPictureInPicture" in window) {
  const togglePipButton = document.createElement("button");
  togglePipButton.innerHTML = `<img src="/img/tool_imgs/picinpic.png">`;
  togglePipButton.addEventListener("click", togglePictureInPicture, false);

  document.getElementById("controlbar").appendChild(togglePipButton);
}
const playerContainerpip = document.createElement("div");
playerContainerpip.style.backgroundImage =`url("/img/others_imgs/bg.jpg")`; 

const timerpage = document.querySelector(".main-contai")
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
    height: 270+ 50,
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
function bgforpip(e){
  playerContainerpip.style.backgroundImage =e; 
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

function addTask() {
    tilemagic.style.top = "-35px"
    const taskcontent = document.getElementById("inputTask").value;
    if (taskcontent.length > 0) {
        if (currentEditingTask) {
            // Nếu đang trong chế độ chỉnh sửa
            const taskText = currentEditingTask.querySelector('.task-text');
            taskText.textContent = taskcontent;
            resetInput();
        } else {
            // Nếu là thêm mới
            const taskcontai = document.createElement("div");
            taskcontai.classList.add("taskcontai");
            taskcontai.innerHTML = `
                <span class="task-text">${taskcontent}</span>
                <div class="options">
                    <button class="btnedit" onclick="edittask(this)">edit</button>
                    <button class="btndelete" onclick="deletetask(this)">delete</button>
                <label class="custom-checkbox">
                <input type="checkbox" class="checkbox" onclick="toggleComplete(this)">
                <div class="checkmark"></span>
                </label>
            </div>
                </div>`;
            listask.appendChild(taskcontai);
            resetInput();
        }
    }
}

function edittask(button) {
    tilemagic.style.top = "-35px"
    currentEditingTask = button.closest('.taskcontai');
    const taskText = currentEditingTask.querySelector('.task-text').textContent;
    const inputTask = document.getElementById("inputTask");
    inputTask.value = taskText;
    const btnAddTask = document.getElementById("btn-addtask");
    btnAddTask.textContent = "Change";
}

function deletetask(button) {
    const taskcontai = button.closest('.taskcontai');
    taskcontai.remove();
    currentEditingTask = null;
    document.getElementById("inputTask").value = "";
    document.getElementById("btn-addtask").textContent = "Add"; // Đảm bảo khi xóa một nhiệm vụ, các nút và input trở về trạng thái ban đầu
}

function toggleComplete(checkbox) {
    const taskcontai = checkbox.closest('.taskcontai');
    const taskText = taskcontai.querySelector('.task-text');
    if (checkbox.checked) {
        taskText.style.textDecoration = "line-through";
    } else {
        taskText.style.textDecoration = "none";
    }
}

function resetInput() {
    currentEditingTask = null;
    document.getElementById("inputTask").value = "";
    document.getElementById("btn-addtask").textContent = "Add";
    tilemagic.style.top = "0px";
}



//calender code

let timetable = [];
let notesData = {};
let currentWeekOffset = 0;
document.getElementById('total-contai-calendar').style.top = '-100%';
function  movecalendar(){
    if (document.getElementById('total-contai-calendar').style.top == '-100%') {
        document.getElementById('total-contai-calendar').style.top = '0%';
        document.getElementById('showTimetableForm').innerHTML="back";
    }else{
        document.getElementById('total-contai-calendar').style.top = '-100%';
        document.getElementById('showTimetableForm').innerHTML="Add Timetable";
    }
}
document.getElementById('backfromcalendarform').addEventListener('click', () => {
  movecalendar();
});
document.getElementById('showTimetableForm').addEventListener('click', () => {
    movecalendar();
    generateTimetableRows();
});

function generateTimetableRows() {
    const tbody = document.getElementById('timetableBody');
    tbody.innerHTML = '';

    for (let i = 1; i < 11; i++) {
        const tr = document.createElement('tr');

        const timeCell = document.createElement('td');
        if (i === 0) {
            timeCell.textContent = 'Time';
        } else {
            const timeInput = document.createElement('input');
            timeInput.type = 'time';
            timeInput.className = 'time-input';
            timeCell.appendChild(timeInput);
        }
        tr.appendChild(timeCell);

        for (let j = 0; j < 7; j++) {
            const dayCell = document.createElement('td');
            if (i > 0) {
                const eventInput = document.createElement('input');
                eventInput.type = 'text';
                eventInput.placeholder = 'Event';
                dayCell.appendChild(eventInput);
            }
            tr.appendChild(dayCell);
        }
        tbody.appendChild(tr);
    }
}

document.getElementById('saveTimetable').addEventListener('click', () => {
    const rows = document.querySelectorAll('#timetableBody tr');
    timetable = [];

    rows.forEach(row => {
        const time = row.children[0].querySelector('input')?.value || '';
        const events = Array.from(row.children).slice(1).map(cell => cell.querySelector('input')?.value || '');
        if (time) {
            timetable.push({ time, events });
        }
    });
    notesData = {};
    currentWeekOffset = 0;
    updateMainCalendar();
    movecalendar();
});

document.getElementById('prevWeek').addEventListener('click', () => {
    currentWeekOffset--;
    updateMainCalendar();
});

document.getElementById('nextWeek').addEventListener('click', () => {
    currentWeekOffset++;
    updateMainCalendar();
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
            date: date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' }), // Hiển thị ngày và tháng
            dayName: date.toLocaleDateString('vi-VN', { weekday: 'long' }), // Hiển thị tên thứ trong tuần
            isToday: date.toDateString() === today.toDateString() // Kiểm tra ngày hôm nay
        };
    });
}

function updateMainCalendar() {
  const mainCalendar = document.getElementById('calendarContent');
  mainCalendar.innerHTML = '';

  const dates = getWeekDates(currentWeekOffset);
  const calendarTitle = document.getElementById('calendarTitle');
  calendarTitle.textContent = `Week of ${dates[0].date} - ${dates[6].date}`;

  const table = document.createElement('table');
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = `
      <th>Time</th>
      ${dates.map(d => `<th${d.isToday ? ' class="current-day"' : ''}>${d.dayName} (${d.date})</th>`).join('')}
  `;
  table.appendChild(headerRow);

  timetable.forEach(slot => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${slot.time}</td>
          ${slot.events.map((event, index) => {
              const dateKey = `${dates[index].date}_${slot.time}`;
              const noteText = notesData[dateKey] || '';
              const isCompleted = notesData[`${dateKey}_completed`] || false;

              return `
              <td>
                  <div class="event-content">${event}</div>
                  ${noteText ? `
                      <div class="event-note ${isCompleted ? 'completed-note' : ''}">
                          <input type="checkbox" class="complete-note-checkbox" ${isCompleted ? 'checked' : ''}>
                          ${noteText}
                      </div>
                  ` : ''}
                  <button class="notes-btn">${noteText ? 'Edit' : 'Notes'}</button>
                  <div class="notes-input-container" style="display:none;">
                      <input type="text" class="notes-input" placeholder="Add note..." value="${noteText}">
                      <button class="save-note-btn">Save</button>
                  </div>
              </td>`;
          }).join('')}
      `;
      table.appendChild(row);
  });

  mainCalendar.appendChild(table);

  document.querySelectorAll('.notes-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const container = this.nextElementSibling;
          container.style.display = 'block';
          this.style.display = 'none';
      });
  });

  document.querySelectorAll('.save-note-btn').forEach(btn => {
      btn.addEventListener('click', function() {
          const container = this.parentElement;
          const noteInput = container.querySelector('.notes-input');
          const eventCell = this.closest('td');
          const noteText = noteInput.value.trim();
          const timeSlot = eventCell.closest('tr').children[0].textContent;
          const dayIndex = Array.from(eventCell.parentElement.children).indexOf(eventCell) - 1;
          const dateKey = `${dates[dayIndex].date}_${timeSlot}`;

          if (noteText === '') {
              delete notesData[dateKey];
              delete notesData[`${dateKey}_completed`];

              const noteDiv = eventCell.querySelector('.event-note');
              if (noteDiv) {
                  noteDiv.remove();
              }

              const notesBtn = eventCell.querySelector('.notes-btn');
              notesBtn.textContent = 'Notes';

              container.style.display = 'none';
              notesBtn.style.display = 'inline';

              updateIncompleteNotesCount(dates);  // Truyền dates khi gọi update
              return;
          }

          notesData[dateKey] = {
              noteText: noteText,
              dayName: dates[dayIndex].dayName
          };
          notesData[`${dateKey}_completed`] = false;

          let noteDiv = eventCell.querySelector('.event-note');
          if (noteDiv) {
              noteDiv.innerHTML = `<input type="checkbox" class="complete-note-checkbox">${noteText}`;
          } else {
              noteDiv = document.createElement('div');
              noteDiv.className = 'event-note';
              noteDiv.innerHTML = `<input type="checkbox" class="complete-note-checkbox">${noteText}`;
              eventCell.insertBefore(noteDiv, eventCell.querySelector('.notes-btn'));
          }

          const notesBtn = eventCell.querySelector('.notes-btn');
          notesBtn.textContent = 'Edit';

          container.style.display = 'none';
          notesBtn.style.display = 'inline';

          addCompleteNoteListener();
          updateIncompleteNotesCount(dates);
      });
  });

  addCompleteNoteListener();
  updateIncompleteNotesCount(dates);  // Truyền dates khi gọi update
}




function addCompleteNoteListener() {
    document.querySelectorAll('.complete-note-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const eventCell = this.closest('td');
            const timeSlot = eventCell.closest('tr').children[0].textContent;
            const dayIndex = Array.from(eventCell.parentElement.children).indexOf(eventCell) - 1;
            const dateKey = `${getWeekDates(currentWeekOffset)[dayIndex].date}_${timeSlot}`;

            if (this.checked) {
                this.closest('.event-note').classList.add('completed-note');
                notesData[`${dateKey}_completed`] = true;
            } else {
                this.closest('.event-note').classList.remove('completed-note');
                notesData[`${dateKey}_completed`] = false;
            }
            updateIncompleteNotesCount();
        });
    });
}
function updateIncompleteNotesCount(dates) {
  if (!dates || !Array.isArray(dates)) {
      // Nếu dates không được truyền vào hoặc không phải là mảng, dừng hàm và log lỗi để debug
      console.error("dates is undefined or not an array. Please check the source of the issue.");
      return;
  }

  let incompleteCount = 0;
  const incompleteNotesList = [];

  for (let key in notesData) {
      if (key.endsWith('_completed') && notesData[key] === false) {
          const noteKey = key.replace('_completed', '');
          const [date, time] = noteKey.split('_');
          const noteData = notesData[noteKey];

          incompleteCount++;
          const dayIndex = dates.findIndex(d => d.date === date);  // Chúng ta cần chắc chắn rằng 'dates' là mảng và có dữ liệu hợp lệ
          const eventName = timetable.find(slot => slot.time === time)?.events?.[dayIndex] || '';
          incompleteNotesList.push({
              key: noteKey,
              date,
              time,
              note: noteData.noteText,
              dayName: noteData.dayName || dates[dayIndex].dayName,  // Sử dụng dayName từ notesData nếu có hoặc từ dates
              eventName
          });
      }
  }

  incompleteNotesList.sort((a, b) => {
      const dateComparison = new Date(a.date.split('/').reverse().join('-')) - new Date(b.date.split('/').reverse().join('-'));
      return dateComparison === 0 ? a.time.localeCompare(b.time) : dateComparison;
  });

  document.getElementById('incompleteCount').textContent = incompleteCount;

  const incompleteNotesContainer = document.getElementById('incompleteNotesContainer');
  incompleteNotesContainer.innerHTML = '';

  let currentDay = '';
  incompleteNotesList.forEach(item => {
      if (item.date !== currentDay) {
          currentDay = item.date;
          const dayDiv = document.createElement('div');
          dayDiv.className = 'day-note-group';
          const dayTitle = document.createElement('h4');
          dayTitle.textContent = `${item.dayName} (${item.date})`;
          dayDiv.appendChild(dayTitle);
          incompleteNotesContainer.appendChild(dayDiv);
      }

      const noteElement = document.createElement('div');
      noteElement.className = 'incomplete-note-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'incomplete-note-checkbox';
      checkbox.addEventListener('change', function () {
          notesData[`${item.key}_completed`] = this.checked;
          updateIncompleteNotesCount(dates);  // Truyền dates khi gọi lại hàm
          updateMainCalendar();
      });

      const noteText = document.createElement('span');
      noteText.textContent = `${item.time} - ${item.eventName}: ${item.note}`;

      noteElement.appendChild(checkbox);
      noteElement.appendChild(noteText);

      const lastDayDiv = incompleteNotesContainer.lastElementChild;
      lastDayDiv.appendChild(noteElement);
  });
}




window.onload = updateMainCalendar;



//remind code
document.getElementById('eventForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Ngăn không cho form submit bình thường

    const eventDateInput = document.getElementById('eventDate').value;
    const subjectInput = document.getElementById('subject').value;
    const notesInput = document.getElementById('notes').value;

    if (eventDateInput && subjectInput) {
        const [year, month, day] = eventDateInput.split('-');
        const formattedDate = `${day}/${month}/${year}`; // Chuyển đổi sang định dạng dd/mm/yyyy

        const daysLeft = calculateDaysLeft(year, month, day);

        const eventsList = document.querySelector('.remind-list');

        // Tạo một sự kiện mới
        const newEvent = document.createElement('li');
        newEvent.innerHTML = `${subjectInput}
        ${formattedDate}
        Còn ${daysLeft} ngày
    ${notesInput ? `Ghi chú: ${notesInput}` : ""}
`;


        // Thêm sự kiện vào danh sách
        eventsList.appendChild(newEvent);

        // Sắp xếp các sự kiện theo ngày
        sortEvents(eventsList);

        // Reset form sau khi thêm sự kiện
        document.getElementById('eventForm').reset();
        backremind()
    }
});

function calculateDaysLeft(year, month, day) {
    const eventDate = new Date(year, month - 1, day);
    const today = new Date();

    // Tính toán sự chênh lệch thời gian (sự chênh lệch trả về kết quả theo milisecond)
    const timeDifference = eventDate - today;

    // Chuyển đổi sự chênh lệch thời gian từ milisecond sang ngày
    const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysLeft >= 0 ? daysLeft : 0;
}

function sortEvents(eventsList) {
    const events = Array.from(eventsList.children);

    events.sort((a, b) => {
        const [dayA, monthA, yearA] = a.textContent.split(' - ')[0].split('/');
        const [dayB, monthB, yearB] = b.textContent.split(' - ')[0].split('/');

        const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`);

        return dateA - dateB;
    });

    // Xóa danh sách hiện tại và thêm lại các sự kiện đã sắp xếp
    eventsList.innerHTML = '';
    events.forEach(event => eventsList.appendChild(event));
}
document.getElementById("move-remind").style.top = "-100%"
function toggleremind() {
    if (document.getElementById("move-remind").style.top == "-100%") {
        document.getElementById("move-remind").style.top = "0%"
        document.getElementById("toggleremind").innerHTML = "back"
    } else {
        backremind();
        document.getElementById("toggleremind").innerHTML = "add"
    }
}
function backremind() {
    document.getElementById("move-remind").style.top = "-100%"
}



function startIntro() {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        element: "#introduction",
        intro:
          "Chào mừng đến với website hướng nghiệp cho mọi lứa tuổi. Hãy cùng khám phá một chút tính năng về website của chúng tôi nhé!",
      },
      {
        element: "#step-one",
        intro:
          "Đây là thanh navbar hay công cụ sẽ xuất hiện ở mọi trang của website chúng tôi",
      },
      {
        element: "#step-two",
        intro: "Đây chính là logo và châm ngôn chính của website chúng tôi.",
      },
      {
        element: "#step-three",
        intro:
          "Còn đây là nơi trang chủ của chúng tôi để bạn có thể quay về trang chủ bất cứ khi nào bạn muốn.",
      },
      {
        element: "#step-four",
        intro:
          "Kế bên đây là nơi sẽ dẫn bạn đến những bài test thú vị để tìm ra được công việc phù hợp của bạn trong tương lai dựa trên một sự pha trộn tuyệt vời",
      },
      {
        element: "#step-five",
        intro:
          "Kế cuối đây là nơi để bạn có thế tìm hiểu về bất cứ trường đại học nào ở mọi nơi trên thế giới để từ đó đưa ra những quyết định đúng đắn hơn trong việc chọn trường để học phù hợp với năng lực và sở thích cũng như đam mê của bản thân.",
      },
      {
        element: "#step-six",
        intro:
          "Cuối cùng là nơi để bạn có thể đọc những mẫu chuyển ngắn từ người thành công hay những videos từ họ để có thêm động lực và kinh nghiệm trên con đường đi đến thành công của bạn sau này.",
      },
    ],
    showProgress: true,
    showBullets: false,
    disableInteraction: true,
  });

  intro.start();
}

