var university1 = document.getElementById("university1");
var home1 = document.getElementById("home1");
var story1 = document.getElementById("story1");
var test1 = document.getElementById("test1");
var logoutimg1 = document.getElementById("logoutimg");
var themeimg1 = document.getElementById("themeimg");
var autoimg1 = document.getElementById("autoimg");
var turtoimg1 = document.getElementById("turtoimg");
var mode = document.getElementById("mode-link");
var theme = document.querySelector("#theme-link");
var header = document.getElementById("header-link");
var autoNext = false;
var modeValue = "light";
var changeModeBtn = document.getElementById("mode");
var introBtn = document.getElementById("contai-intro");
var userexpand = document.getElementById("user-expand");
var turnAutoMode = document.querySelector(".auto");
var text = document.createElement("h4");
var buttonset = document.createElement("button");
var line = document.createElement("div");
line.classList.add("line2");
var titleset = document.createElement("h3");
var movesetting = 0;
var contaiexpand = document.getElementById("contai-page-expand");
var backsetimg = document.createElement("img");
backsetimg.src = "/img/tool_imgs/back.png";

introBtn.addEventListener("click", function () {
  startIntro();
});

turnAutoMode.addEventListener("click", function () {
  changeAutoMode();
});

function clicklay() {
  userexpand.classList.remove("active");
  overlay.style.backgroundColor = "rgb(50, 50, 50, 0)";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 500);
}

function changeAutoMode() {
  if (autoNext === true) {
    autoNext = false;
    localStorage.setItem("auto", autoNext);
  } else if (autoNext === false) {
    autoNext = true;
    localStorage.setItem("auto", autoNext);
  }
}

changeModeBtn.addEventListener("click", function () {
  changeTheme();
});

function changeTheme() {
  // Home Page
  if (theme.getAttribute("href") === "/home-light.css") {
    theme.href = "/home-dark.css";
    header.href = "/header-dark.css";
    mode.href = "/mode-dark.css";
    modeValue = "dark";
  } else if (theme.getAttribute("href") === "/home-dark.css") {
    theme.href = "/home-light.css";
    header.href = "/header-light.css";
    mode.href = "/mode-light.css";
    modeValue = "light";
  }
  // Test Page
  if (theme.getAttribute("href") === "/test-light.css") {
    theme.href = "/test-dark.css";
    header.href = "/header-dark.css";
    mode.href = "/mode-dark.css";
    modeValue = "dark";
  } else if (theme.getAttribute("href") === "/test-dark.css") {
    theme.href = "/test-light.css";
    header.href = "/header-light.css";
    mode.href = "/mode-light.css";
    modeValue = "light";
  }
  // University Page
  if (theme.getAttribute("href") === "/university-light.css") {
    theme.href = "/university-dark.css";
    header.href = "/header-dark.css";
    mode.href = "/mode-dark.css";
    modeValue = "dark";
  } else if (theme.getAttribute("href") === "/university-dark.css") {
    theme.href = "/university-light.css";
    header.href = "/header-light.css";
    mode.href = "/mode-light.css";
    modeValue = "light";
  }
  // Story Page
  if (theme.getAttribute("href") === "/story-light.css") {
    theme.href = "/story-dark.css";
    header.href = "/header-dark.css";
    mode.href = "/mode-dark.css";
    modeValue = "dark";
  } else if (theme.getAttribute("href") === "/story-dark.css") {
    theme.href = "/story-light.css";
    header.href = "/header-light.css";
    mode.href = "/mode-light.css";
    modeValue = "light";
  }
  localStorage.setItem("mode", modeValue);
  changeMode(modeValue);
}

function changeMode(modeValue) {
  if (modeValue === "light") {
    home1.src = "/img/navbar_imgs/black_imgs/home_black.png";
    test1.src = "/img/navbar_imgs/black_imgs/test_black.png";
    university1.src = "/img/navbar_imgs/black_imgs/university_black.png";
    story1.src = "/img/navbar_imgs/black_imgs/story_black.png";
    logoutimg1.src = "/img/tool_imgs/logout2.png";
    themeimg1.src = "/img/tool_imgs/theme2.png";
    autoimg1.src = "/img/tool_imgs/auto2.png";
    turtoimg1.src = "/img/tool_imgs/video-lesson2.png";
  } else if (modeValue === "dark") {
    home1.src = "/img/navbar_imgs/white_imgs/home_white.png";
    test1.src = "/img/navbar_imgs/white_imgs/test_white.png";
    university1.src = "/img/navbar_imgs/white_imgs/university_white.png";
    story1.src = "/img/navbar_imgs/white_imgs/story_white.png";
    logoutimg1.src = "/img/tool_imgs/logout1.png";
    themeimg1.src = "/img/tool_imgs/theme1.png";
    autoimg1.src = "/img/tool_imgs/auto1.png";
    turtoimg1.src = "/img/tool_imgs/video-lesson1.png";
  }
}

function openset() {
  userexpand.classList.add("active");
  overlay.style.display = "block";
  setTimeout(function () {
    overlay.style.backgroundColor = "rgb(50, 50, 50, 0.7)";
  }, 10);
}

window.addEventListener("load", function () {
  var constmodeValue = localStorage.getItem("mode");
  if (constmodeValue === "light") {
  } else if (constmodeValue === "dark") {
    changeModeBtn.click();
    changeModeBtn.checked = true;
  }
  var constautomodeValue = localStorage.getItem("auto");
  if (constautomodeValue === "true") {
    turnAutoMode.click();
    turnAutoMode.checked = true;
  } else if (constautomodeValue === "false") {
  }
});

function feedclick() {
  var inputfeed = document.createElement("input");
  var feedpage = document.createElement("div");
  backsetimg.onclick = function () {
    back(feedpage);
  };
  feedpage.appendChild(backsetimg);
  feedpage.appendChild(inputfeed);
  feedpage.classList.add("page-expand");
  contaiexpand.appendChild(feedpage);
  movesetting = movesetting - 100;
  moveset();
}
function moveset() {
  move = movesetting + "%";
  contaiexpand.style.left = move;
}
function back(e) {
  movesetting = movesetting + 100;
  moveset();
  setTimeout(function () {
    e.remove();
  }, 500);
}
function passclick() {
  titleset.innerHTML = "Đổi mật khẩu";
  buttonset.innerHTML = "Đổi mật khẩu";
  text.innerHTML =
    "Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt.";
  var inputpassnow = document.createElement("input");
  var inputpassnew = document.createElement("input");
  inputpassnow.placeholder = "mật khẩu hiện tại";
  inputpassnew.placeholder = "mật khẩu mới";
  var passpage = document.createElement("div");
  backsetimg.onclick = function () {
    back(passpage);
  };
  line.appendChild(backsetimg);
  line.appendChild(titleset);
  passpage.appendChild(line);
  passpage.appendChild(text);
  passpage.appendChild(inputpassnow);
  passpage.appendChild(inputpassnew);
  passpage.appendChild(buttonset);
  passpage.classList.add("page-expand");
  contaiexpand.appendChild(passpage);
  movesetting = movesetting - 100;
  moveset();
}
