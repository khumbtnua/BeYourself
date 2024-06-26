var bg = document.querySelector("body");
var lists = document.getElementById("extend-navbar");
var equalsElement = document.querySelector(".fa-equals");
var xElement = document.querySelector(".fa-x");
var firstNavbar = document.querySelector("nav");
var secondNavbar = document.getElementById("extend-navbar");
var header = document.getElementById("header-link");
var theme = document.getElementById("theme-link");
var modeValue = "light";
var changeModeBtn = document.getElementById("mode");
var turnAutoMode = document.querySelector(".auto");
var introBtn = document.getElementById("contai-intro");
var searchInput = document.getElementById("search-in");
var settingTable = document.getElementById("setting2");
var colleges = [];
var home1 = document.getElementById("home1");
var story1 = document.getElementById("story1");
var test1 = document.getElementById("test1");
var university1 = document.getElementById("university1");
var autoNext = false;
var equalsElement = document.querySelector(".fa-equals");
var xElement = document.querySelector(".fa-x");
var firstNavbar = document.querySelector("nav");
var secondNavbar = document.getElementById("extend-navbar");
var titleElement = document.getElementById("name");
secondNavbar.classList.add("out");
var collegeContainer = document.getElementById("list-sch");
var dataContainer = document.getElementById("data-container");
var universityData = JSON.parse(dataContainer.getAttribute("data-university"));
var searchBtn = document.getElementById("search");
var errorPage = document.getElementById("error-page");
var mode = document.getElementById("mode-link");
var footer = document.getElementById("footer");
function openset() {
  settingTable.classList.add("active");
  overlay.style.display = "block";
  setTimeout(function () {
    overlay.style.backgroundColor = "rgb(50, 50, 50, 0.7)";
  }, 10);
}
function clicklay() {
  settingTable.classList.remove("active");
  overlay.style.backgroundColor = "rgb(50, 50, 50, 0)";
  setTimeout(function () {
    overlay.style.display = "none";
  }, 500);
}
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

introBtn.addEventListener("click", function () {
  startIntro();
});

changeModeBtn.addEventListener("click", function () {
  changeTheme();
});

function changeTheme() {
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
  localStorage.setItem("mode", modeValue);
  changeMode(modeValue);
}

window.addEventListener("load", function () {
  renderCollege(universityData);
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

function changeMode(modeValue) {
  var university1 = document.getElementById("university1");
  if (modeValue === "light") {
    home1.src = "/img/navbar_imgs/black_imgs/home_black.png";
    test1.src = "/img/navbar_imgs/black_imgs/test_black.png";
    university1.src = "/img/navbar_imgs/black_imgs/university_black.png";
    story1.src = "/img/navbar_imgs/black_imgs/story_black.png";
  } else if (modeValue === "dark") {
    home1.src = "/img/navbar_imgs/white_imgs/home_white.png";
    test1.src = "/img/navbar_imgs/white_imgs/test_white.png";
    university1.src = "/img/navbar_imgs/white_imgs/university_white.png";
    story1.src = "/img/navbar_imgs/white_imgs/story_white.png";
  }
}

xElement.addEventListener("click", function () {
  returnViewNavbar();
});

equalsElement.addEventListener("click", function () {
  changeViewNavbar();
});

function resizeHandle() {
  if (window.innerWidth <= 800) {
    equalsElement.style.display = "block";
    firstNavbar.style.display = "none";
    window.onload = returnViewNavbar;
  } else {
    equalsElement.style.display = "none";
    xElement.style.display = "none";
    firstNavbar.style.display = "block";
  }
}

window.addEventListener("resize", resizeHandle);
resizeHandle();

function changeViewNavbar() {
  xElement.style.display = "block";
  equalsElement.style.display = "none";
  secondNavbar.classList.remove("out");
  secondNavbar.classList.add("appear");
}
titleElement.style.display = "block";
function returnViewNavbar() {
  xElement.style.display = "none";
  equalsElement.style.display = "block";
  secondNavbar.classList.remove("appear");
  secondNavbar.classList.add("out");
}
var inputValue = "";
searchInput.addEventListener("keyup", function (e) {
  inputValue = e.target.value.toLowerCase();
});

searchBtn.addEventListener("click", function () {
  var filterCollege = universityData.filter((university) => {
    return university.name.toLowerCase().includes(inputValue);
  });
  if (Object.keys(filterCollege).length === 0) {
    renderCollege(filterCollege);
    collegeContainer.style.height = "500px";
    errorPage.classList.remove("hide");
    collegeContainer.appendChild(errorPage);
  } else {
    renderCollege(filterCollege);
  }
});

function renderCollege(data) {
  var htmls = data.map(function (college) {
    return `
    <div class="sch">
            <div class="sch-contai-img">
                <a href="/university/${college.slug}"><img src="${college.img}"></a>
            </div>
            <div class="info">
                <div class="info-text">
                    <h2>${college.name}</h2>
                </div>
                <div class="info-label"><label>Nothing</label></div>
            </div>
        </div>
    `;
  });
  collegeContainer.innerHTML = htmls.join("");
}
