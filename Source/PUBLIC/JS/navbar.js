var university = document.getElementById("university1");
var home = document.getElementById("home1");
var story = document.getElementById("story1");
var test = document.getElementById("test1");
var logoutimg = document.getElementById("logoutimg");
var themeimg = document.getElementById("themeimg");
var autoimg = document.getElementById("autoimg");
var turtoimg = document.getElementById("turtoimg");
var mode = document.getElementById("mode-link");
var theme = document.querySelector("#theme-link");
var header = document.getElementById("header-link");
var autoNext = false;
var modeValue = "light";
var changeModeBtn = document.getElementById("mode");
var introBtn = document.getElementById("contai-intro");
var turnAutoMode = document.querySelector(".auto");
var avartaimg = document.getElementById("avartaimg");
var passimg = document.getElementById("passimg");
var feedimg = document.getElementById("feedimg");
var lauchimg = document.querySelectorAll(".lauch");
introBtn.addEventListener("click", function () {
  startIntro();
});

turnAutoMode.addEventListener("click", function () {
  changeAutoMode();
});



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
    home.src = "/img/navbar_imgs/black_imgs/home_black.png";
    test.src = "/img/navbar_imgs/black_imgs/test_black.png";
    university.src = "/img/navbar_imgs/black_imgs/university_black.png";
    story.src = "/img/navbar_imgs/black_imgs/story_black.png";
    logoutimg.src = "/img/tool_imgs/logout2.png";
    themeimg.src = "/img/tool_imgs/theme2.png";
    autoimg.src = "/img/tool_imgs/auto2.png";
    turtoimg.src = "/img/tool_imgs/video-lesson2.png";
    feedimg.src="/img/tool_imgs/review2.png";
    passimg.src="/img/tool_imgs/key2.png";
    avartaimg.src="/img/tool_imgs/avatar2.png";
    lauchimg.forEach((e) => {
      e.src="/img/tool_imgs/lauch2.png";; 
    });
  } else if (modeValue === "dark") {
    home.src = "/img/navbar_imgs/white_imgs/home_white.png";
    test.src = "/img/navbar_imgs/white_imgs/test_white.png";
    university.src = "/img/navbar_imgs/white_imgs/university_white.png";
    story.src = "/img/navbar_imgs/white_imgs/story_white.png";
    logoutimg.src = "/img/tool_imgs/logout1.png";
    themeimg.src = "/img/tool_imgs/theme1.png";
    autoimg.src = "/img/tool_imgs/auto1.png";
    turtoimg.src = "/img/tool_imgs/video-lesson1.png";
    feedimg.src="/img/tool_imgs/review1.png";
    passimg.src="/img/tool_imgs/key1.png";
    avartaimg.src="/img/tool_imgs/avatar1.png";
    lauchimg.forEach((e) => {
      e.src="/img/tool_imgs/lauch1.png";; 
    });
  }
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
//var for setting
var userexpand = document.getElementById("user-expand");
var text = document.createElement("h4");
var line = document.createElement("div");
line.classList.add("line2");
var titleset = document.createElement("h3");
var movesetting = 0;
var move = 0;
var contaiexpand = document.getElementById("contai-page-expand");
var backsetimg = document.createElement("img");
backsetimg.src = "/img/tool_imgs/back.png";
//open setting
function openset() {
  userexpand.classList.add("active");
  overlay.style.display = "block";
  setTimeout(function () {
    overlay.style.backgroundColor = "rgb(50, 50, 50, 0.7)";
  }, 10);
}

//feedback
var feedpage = document.createElement("div");
function feedclick() {
  var buttonfeed = document.createElement("button");
  buttonfeed.innerHTML="Gửi"
  text.innerHTML="Chúng tôi có thể cải thiện như thế nào?"
  titleset.innerHTML="Đóng góp ý kiến";
  var inputfeed = document.createElement("textarea");
  backsetimg.onclick = function () {
    back(feedpage);
  };
  line.appendChild(backsetimg);
  line.appendChild(titleset);
  feedpage.appendChild(line);
  feedpage.appendChild(text);
  feedpage.appendChild(inputfeed);
  feedpage.appendChild(buttonfeed);
  feedpage.classList.add("page-expand");
  contaiexpand.appendChild(feedpage);
  movesetting = movesetting - 100;
  moveset();
}
//change password
var passpage = document.createElement("div");
function passclick() {
  var buttonpass = document.createElement("button");
  titleset.innerHTML = "Đổi mật khẩu";
  buttonpass.innerHTML = "Đổi mật khẩu";
  text.innerHTML =
    "Mật khẩu của bạn phải có tối thiểu 6 ký tự, đồng thời bao gồm cả chữ số, chữ cái và ký tự đặc biệt.";
  var inputpassnow = document.createElement("input");
  var inputpassnew = document.createElement("input");
  inputpassnow.placeholder = "mật khẩu hiện tại";
  inputpassnew.placeholder = "mật khẩu mới";
  backsetimg.onclick = function () {
    back(passpage);
  };
  line.appendChild(backsetimg);
  line.appendChild(titleset);
  passpage.appendChild(line);
  passpage.appendChild(text);
  passpage.appendChild(inputpassnow);
  passpage.appendChild(inputpassnew);
  passpage.appendChild(buttonpass);
  passpage.classList.add("page-expand");
  contaiexpand.appendChild(passpage);
  movesetting = movesetting - 100;
  moveset();
}
//sub for setting move
function moveset() {
  move = movesetting + "%";
  contaiexpand.style.left = move;
}
function back(e) {
  movesetting = movesetting + 100;
  moveset();
  setTimeout(function () {
    e.innerHTML="";
    e.remove();
  }, 500);
}
function deletes(e){
  e.innerHTML="";
  e.remove();
}
//clicklay setting
function clicklay() {
  userexpand.classList.remove("active");
  overlay.style.backgroundColor = "rgb(50, 50, 50, 0)";
  movesetting = 0;
  moveset()
  setTimeout(function () {
    overlay.style.display = "none";
  }, 500);
  deletes(passpage);
  deletes(feedpage);
}