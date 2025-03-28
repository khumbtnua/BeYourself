var chosediv = document.getElementById("choose");
var tescontai = document.getElementById("test-container");
let s = 0;
let w = 0;
let x = "";
var a = [];
var b = [];
var c = [];
var d = [];
var e = [];
var f = [];
var buttonStates = [];
var indexJump = -5;
var plus = 1;
var tempArray = [];
var abc = [];
var HOLLAND = [
  "Câu 1) Có tính tự lập",
  "Câu 2) Có đầu óc suy nghĩ thực tế",
  "Câu 3) Dễ thích nghi với môi trường mới",
  "Câu 4) Điều khiển các máy móc, thiết bị",
  "Câu 5) Làm tốt các công việc thủ công như gấp giấy, cắt, dán, đan, móc",
  "Câu 6) Thích tiếp xúc với thiên nhiên, động, thực vật",
  "Câu 7) Thích làm công việc thực hành, tay chân",
  "Câu 8) Thích làm những công việc thực tế",
  "Câu 9) Thích làm việc ngoài trời",
  "Câu 10) Thích tìm hiểu, khám phá vấn đề mới",
  "Câu 11) Có khả năng phân tích vấn đề",
  "Câu 12) Có tư duy logic, suy nghĩa mạch lạc, chặt chẽ",
  "Câu 13) Thích quan sát, nghiên cứu",
  "Câu 14) Có khả năng tổng hợp, khái quát, suy đoán",
  "Câu 15) Thích hoạt động điều tra, phân loại, kiểm tra, đánh giá",
  "Câu 16) Biết tự tổ chức, sắp xếp công việc",
  "Câu 17) Thích thử thách, khó khăn",
  "Câu 18) Có khả năng giải quyết vấn đề",
  "Câu 19) Dễ xúc động",
  "Câu 20) Gìau trí tưởng tượng",
  "Câu 21) Thích tự do, không theo khuôn mẫu",
  "Câu 22) Giỏi thuyết trình, diễn xuất",
  "Câu 23) Thích chụp ảnh, vẽ, trang trí, điêu khắc",
  "Câu 24) Có năng khiếu âm nhạc",
  "Câu 25) Có khả năng viết, trình bày ý tưởng",
  "Câu 26) Thích sự mới mẽ, công việc sáng tạo",
  "Câu 27) Thoải mái biểu lộ những ý thích riêng",
  "Câu 28) Thân thiện, hay giúp đỡ người khác",
  "Câu 29) Thích gặp gỡ, làm việc với nhiều người",
  "Câu 30) Lịch thiệp, tử tế",
  "Câu 31) Thích khuyên bảo, giảng giải cho người khác",
  "Câu 32) Biết lắng nghe, chia sẻ",
  "Câu 33) Thích các công việc chăm sóc sức khỏe",
  "Câu 34) Thích hoạt động công tác xã hội, phục vụ cộng đồng",
  "Câu 35) Mong muốn được đóng góp để xã hội tốt đẹp hơn",
  "Câu 36) Có khả năng hòa giải, giải quyết mâu thuẫn",
  "Câu 37) Thích phiêu lưu",
  "Câu 38) Có tính quyết đoán",
  "Câu 39) Năng động",
  "Câu 40) Có khả năng diễn đạt, tranh luận, thuyết phục",
  "Câu 41) Thích làm quản lý, chỉ đạo, nhận xét, đánh giá, đặt ra mục tiêu, kế hoạch",
  "Câu 42) Thích tạo ảnh hưởng đối với người khác",
  "Câu 43) Thích cạnh tranh để vượt qua người khác",
  "Câu 44) Muốn được mọi người kính trọng, kính nể",
  "Câu 45) Thích phiêu lưu",
  "Câu 46) Có đầu óc tổ chức, sắp xếp, ngăn nắp",
  "Câu 47) Cẩn thận, tỉ mỉ",
  "Câu 48) Chu đáo, chính xác, đáng tin cậy",
  "Câu 49) Có khả năng tính toán, so sánh, ghi chép số liệu",
  "Câu 50) Thích công việc lưu trữ, phân loại, cập nhật thông tin",
  "Câu 51) Thường dự kiến về chỉ tiêu, ngân sách",
  "Câu 52) Thích làm việc có nhiệm vụ, mục tiêu rõ ràng",
  "Câu 53) Có khả năng lên kế hoạch, điều phối công việc",
  "Câu 54) Thích làm việc với con số, theo hướng dẫn, quy trình",
];
var click = 0;
var hollandBtn = document.getElementById("holland");
hollandBtn.addEventListener("click", function () {
  holland();
  createIntroduction();
});
var autoNext = false;
const MAX_LOAD_TIME = 3000;
const CHECK_INTERVAL = 100;
let startTime = Date.now();
let isPageLoaded = false;

function checkLoadTime() {
  if (Date.now() - startTime > MAX_LOAD_TIME && !isPageLoaded) {
    console.log("Tải lại trang vì trang mất quá nhiều thời gian để tải.");
    window.location.reload();
  }
}

function checkIframe() {
  const iframe = document.querySelector(".iframe-hidden");
  if (
    iframe &&
    iframe.contentDocument &&
    iframe.contentDocument.readyState === "complete"
  ) {
    startTime = Date.now();
    isPageLoaded = true;
    clearInterval(iframeCheckInterval);
    setTimeout(checkLoadTime, 1000);
  }
}

const iframeCheckInterval = setInterval(checkIframe, CHECK_INTERVAL);

function createIntroduction() {
  var quesContent = document.createElement("h4");
  quesContent.innerText = `Bạn đang chuẩn bị kiểm tra bài test trắc nghiệm nghề nghiệp Holland với 54 câu hỏi tất cả.

  Với mỗi câu hỏi sẽ có 5 mức độ tương ứng từ 0 đến 4 điểm ở phía dưới:
  
  0 - Chưa bao giờ đúng với tôi
  1 - Chỉ đúng với tôi trong một vài trường hợp
  2 - Chỉ một nửa là đúng với tôi
  3 - Gần như là đúng với tôi trong hầu hết mọi trường hợp, chỉ có một vài trường hợp là chưa đúng lắm
  4 - Hoàn toàn đúng với tôi, không thể nào khác đi được

  Sau khi hoàn thành bài test chúng tôi sẽ trả về kết quả bạn thuộc nhóm nào trong tất cả 6 Socialo Holland đã chia ra và gợi ý một số ngành nghề phù hợp với nhóm nghề của bạn.`;

  var divQues = document.createElement("div");
  divQues.classList.add("instruction");
  divQues.appendChild(quesContent);

  var btnCreate = document.createElement("button");
  btnCreate.innerText = "Bắt đầu nào!";
  btnCreate.id = "submitBtn";
  btnCreate.addEventListener("click", function () {
    createQuestion();
    GetValue();
    arightFirst();
    click += 1;
  });

  var btnCreateContainer = document.createElement("div");
  btnCreateContainer.classList.add("submitBtnContainer");
  btnCreateContainer.appendChild(btnCreate);

  var btnContainer = document.createElement("div");
  btnContainer.classList.add("move1");
  btnContainer.appendChild(btnCreateContainer);

  var screen = document.createElement("div");
  screen.classList.add("sceentest");

  var div = document.createElement("div");
  div.classList.add("testc");
  div.appendChild(divQues);
  div.appendChild(btnContainer);

  screen.appendChild(div);

  tescontai.appendChild(screen);

  click += 1;
}

tescontai.style.left = "100vw";

function holland() {
  chosediv.style.left = "-50vw";
  tescontai.style.left = "0vw";
  setTimeout(function () {
    chosediv.style.display = "none";
  }, 1000);
}

function arightFirst() {
  s = s - 100;
  x = s + "vw";
  tescontai.style.left = x;
}

function aright() {
  s = s - 100;
  x = s + "vw";
  tescontai.style.left = x;
  web++;
  allowClick++;
}

function arleft() {
  s = s + 100;
  x = s + "vw";
  tescontai.style.left = x;
  web--;
  allowClick--;
}
var i = 1;
var allowClick = 1;
var rightimg = "/img/arrow_imgs/right.png";
var leftimg = "/img/arrow_imgs/left.png";
function createQuestion() {
  if (i === 1) {
    var screen = document.createElement("div");
    screen.classList.add("sceentest");

    var div = document.createElement("div");
    div.classList.add("testc");
    div.dataset.value = i;

    var quesContent = document.createElement("h2");
    quesContent.innerText = HOLLAND[i - 1];

    var divQues = document.createElement("div");
    divQues.classList.add("ques");
    divQues.appendChild(quesContent);

    var evenBtn1 = document.createElement("button");
    evenBtn1.innerText = "0";
    evenBtn1.id = "demo";
    evenBtn1.dataset.value = "0";
    var evenBtn2 = document.createElement("button");
    evenBtn2.innerText = "2";
    evenBtn2.id = "demo";
    evenBtn2.dataset.value = "2";

    var oddBtn1 = document.createElement("button");
    oddBtn1.innerText = "1";
    oddBtn1.id = "demo";
    oddBtn1.dataset.value = "1";
    var oddBtn2 = document.createElement("button");
    oddBtn2.innerText = "3";
    oddBtn2.id = "demo";
    oddBtn2.dataset.value = "3";

    var divEvenBtnContainer = document.createElement("div");
    divEvenBtnContainer.classList.add("divide");
    divEvenBtnContainer.appendChild(evenBtn1);
    divEvenBtnContainer.appendChild(evenBtn2);
    var divOddBtnContainer = document.createElement("div");
    divOddBtnContainer.classList.add("divide");
    divOddBtnContainer.appendChild(oddBtn1);
    divOddBtnContainer.appendChild(oddBtn2);

    var addingBtn = document.createElement("button");
    addingBtn.id = "demo";
    addingBtn.innerText = "4";
    addingBtn.dataset.value = 4;

    var divBtn = document.createElement("div");
    divBtn.classList.add("quesans");
    divBtn.appendChild(divEvenBtnContainer);
    divBtn.appendChild(divOddBtnContainer);
    divBtn.appendChild(addingBtn);

    var nextBtnImg = document.createElement("img");
    nextBtnImg.src = rightimg;

    var nextBtn = document.createElement("button");
    nextBtn.id = "fistest1";
    nextBtn.classList.add("arrowright");
    nextBtn.appendChild(nextBtnImg);
    nextBtn.addEventListener("click", function () {
      if (abc.length >= allowClick) {
        createQuestion();
        GetValue();
        aright();
      } else {
        alertInfo.classList.add("show");
        alertInfo.classList.remove("hide");
        alertInfo.classList.add("showAlert");
        setTimeout(function () {
          alertInfo.classList.remove("show");
          alertInfo.classList.add("hide");
        }, 5000);
      }
    });

    div.appendChild(divQues);
    div.appendChild(divBtn);
    div.appendChild(nextBtn);
    screen.appendChild(div);

    tescontai.appendChild(screen);
  } else {
    if (i < 54) {
      var screen = document.createElement("div");
      screen.classList.add("sceentest");

      var div = document.createElement("div");
      div.classList.add("testc");
      div.dataset.value = i;

      var quesContent = document.createElement("h2");
      quesContent.innerText = HOLLAND[i - 1];

      var divQues = document.createElement("div");
      divQues.classList.add("ques");
      divQues.appendChild(quesContent);

      var evenBtn1 = document.createElement("button");
      evenBtn1.innerText = "0";
      evenBtn1.id = "demo";
      evenBtn1.dataset.value = "0";
      var evenBtn2 = document.createElement("button");
      evenBtn2.innerText = "2";
      evenBtn2.id = "demo";
      evenBtn2.dataset.value = "2";

      var oddBtn1 = document.createElement("button");
      oddBtn1.innerText = "1";
      oddBtn1.id = "demo";
      oddBtn1.dataset.value = "1";
      var oddBtn2 = document.createElement("button");
      oddBtn2.innerText = "3";
      oddBtn2.id = "demo";
      oddBtn2.dataset.value = "3";

      var divEvenBtnContainer = document.createElement("div");
      divEvenBtnContainer.classList.add("divide");
      divEvenBtnContainer.appendChild(evenBtn1);
      divEvenBtnContainer.appendChild(evenBtn2);
      var divOddBtnContainer = document.createElement("div");
      divOddBtnContainer.classList.add("divide");
      divOddBtnContainer.appendChild(oddBtn1);
      divOddBtnContainer.appendChild(oddBtn2);

      var addingBtn = document.createElement("button");
      addingBtn.id = "demo";
      addingBtn.innerText = "4";
      addingBtn.dataset.value = 4;

      var divBtn = document.createElement("div");
      divBtn.classList.add("quesans");
      divBtn.appendChild(divEvenBtnContainer);
      divBtn.appendChild(divOddBtnContainer);
      divBtn.appendChild(addingBtn);

      var nextBtnImg = document.createElement("img");
      nextBtnImg.src = rightimg;

      var nextBtn = document.createElement("button");
      nextBtn.classList.add("arrowright");
      nextBtn.appendChild(nextBtnImg);
      nextBtn.addEventListener("click", function () {
        if (abc.length >= allowClick) {
          if (i < 71) {
            createQuestion();
            GetValue();
            aright();
          } else {
            GetValue();
            aright();
          }
        } else {
          alertInfo.classList.add("show");
          alertInfo.classList.remove("hide");
          alertInfo.classList.add("showAlert");
          setTimeout(function () {
            alertInfo.classList.remove("show");
            alertInfo.classList.add("hide");
          }, 5000);
        }
      });

      var backBtnImg = document.createElement("img");
      backBtnImg.src = leftimg;

      var backBtn = document.createElement("button");
      backBtn.classList.add("arrowleft");
      backBtn.appendChild(backBtnImg);
      backBtn.addEventListener("click", function () {
        arleft();
      });

      var btnContainer = document.createElement("div");
      btnContainer.classList.add("move1");
      btnContainer.appendChild(nextBtn);
      btnContainer.appendChild(backBtn);

      div.appendChild(divQues);
      div.appendChild(divBtn);
      div.appendChild(btnContainer);
      screen.appendChild(div);

      tescontai.appendChild(screen);
    } else if (i === 54) {
      var screen = document.createElement("div");
      screen.classList.add("sceentest");

      var div = document.createElement("div");
      div.classList.add("testc");
      div.dataset.value = i;
      var quesContent = document.createElement("h2");
      quesContent.innerText = HOLLAND[i - 1];

      var divQues = document.createElement("div");
      divQues.classList.add("ques");
      divQues.appendChild(quesContent);

      var evenBtn1 = document.createElement("button");
      evenBtn1.innerText = "0";
      evenBtn1.id = "demo";
      evenBtn1.dataset.value = "0";
      var evenBtn2 = document.createElement("button");
      evenBtn2.innerText = "2";
      evenBtn2.id = "demo";
      evenBtn2.dataset.value = "2";

      var oddBtn1 = document.createElement("button");
      oddBtn1.innerText = "1";
      oddBtn1.id = "demo";
      oddBtn1.dataset.value = "1";
      var oddBtn2 = document.createElement("button");
      oddBtn2.innerText = "3";
      oddBtn2.id = "demo";
      oddBtn2.dataset.value = "3";

      var divEvenBtnContainer = document.createElement("div");
      divEvenBtnContainer.classList.add("divide");
      divEvenBtnContainer.appendChild(evenBtn1);
      divEvenBtnContainer.appendChild(evenBtn2);
      var divOddBtnContainer = document.createElement("div");
      divOddBtnContainer.classList.add("divide");
      divOddBtnContainer.appendChild(oddBtn1);
      divOddBtnContainer.appendChild(oddBtn2);

      var addingBtn = document.createElement("button");
      addingBtn.id = "demo";
      addingBtn.innerText = "4";
      addingBtn.dataset.value = 4;

      var divBtn = document.createElement("div");
      divBtn.classList.add("quesans");
      divBtn.appendChild(divEvenBtnContainer);
      divBtn.appendChild(divOddBtnContainer);
      divBtn.appendChild(addingBtn);

      var submitBtn = document.createElement("button");
      submitBtn.innerText = "Submit";
      submitBtn.id = "submitBtn";
      submitBtn.addEventListener("click", function () {
        var totalA = 0;
        var totalB = 0;
        var totalC = 0;
        var totalD = 0;
        var totalE = 0;
        var totalF = 0;
        a.forEach(function (a, index) {
          totalA += a.value;
        });
        b.forEach(function (b, index) {
          totalB += b.value;
        });
        c.forEach(function (c, index) {
          totalC += c.value;
        });
        d.forEach(function (d, index) {
          totalD += d.value;
        });
        e.forEach(function (e, index) {
          totalE += e.value;
        });
        f.forEach(function (f, index) {
          totalF += f.value;
        });
        compareValue(totalA, totalB, totalC, totalD, totalE, totalF);
      });

      var submitBtnContainer = document.createElement("div");
      submitBtnContainer.classList.add("submitBtnContainer");
      submitBtnContainer.appendChild(submitBtn);

      var backBtnImg = document.createElement("img");
      backBtnImg.src = leftimg;

      var backBtn = document.createElement("button");
      backBtn.classList.add("arrowleft");
      backBtn.appendChild(backBtnImg);
      backBtn.addEventListener("click", function () {
        arleft();
      });

      var btnContainer = document.createElement("div");
      btnContainer.classList.add("move1");
      btnContainer.appendChild(submitBtnContainer);
      btnContainer.appendChild(backBtn);

      div.appendChild(divQues);
      div.appendChild(divBtn);
      div.appendChild(btnContainer);
      screen.appendChild(div);

      tescontai.appendChild(screen);

      var backBtnImg = document.createElement("img");
      backBtnImg.src = leftimg;
    }
  }
  i++;
}

function GetValue() {
  var demoBtns = document.querySelectorAll("#demo");
  demoBtns.forEach(function (demoBtn, index) {
    var demoBtnParent = demoBtns[index].closest(".testc");
    var demoBtnParentValue = demoBtnParent.dataset.value;
    var demoBtnValue = demoBtns[index].dataset.value;
    splitValue(demoBtnParentValue, demoBtnValue);
  });
  plus += 1;
  demoBtns.forEach(function (demoBtn, index) {
    demoBtn.addEventListener("click", function () {
      var demoBtnParent = demoBtns[index].closest(".testc");
      var demoBtnParentValue = demoBtnParent.dataset.value;
      var demoBtnValue = demoBtns[index].dataset.value;
      analysisValue(demoBtnParentValue, demoBtnValue);
      updateColor(demoBtnParentValue, demoBtnValue);
      if (abc.length >= allowClick) {
        if (autoNext === true) {
          if (web < 54) {
            createQuestion();
            aright();
            GetValue();
          } else {
          }
        } else {
        }
      } else {
      }
    });
  });
}

function updateColor(parentValue, childValue) {
  var findParent = buttonStates.findIndex(function (button) {
    return (
      button.index === parseInt(parentValue) &&
      button.value === parseInt(childValue)
    );
  });
  if (findParent !== -1) {
    Refind(buttonStates[findParent].index, buttonStates[findParent].value);
  }
  changeColor();
}

function Refind(objIndex, objValue) {
  if (abc.length === 0) {
    var who = new Object();
    who.index = objIndex;
    who.value = objValue;
    who.status = "black";
    abc.push(who);
  } else {
    var checkParentValid = abc.some(function (abc) {
      return abc.index === objIndex;
    });
    if (checkParentValid === true) {
      var findParentValid = abc.findIndex(function (abc) {
        return abc.index === objIndex;
      });
      if (findParentValid !== -1) {
        if (abc[findParentValid].value === objValue) {
        } else {
          abc[findParentValid].value = objValue;
          abc[findParentValid].status = "black";
        }
      }
    } else {
      var who = new Object();
      who.index = objIndex;
      who.value = objValue;
      who.status = "black";
      abc.push(who);
    }
  }
}

function changeColor() {
  var demoBtns = document.querySelectorAll("#demo");
  demoBtns.forEach(function (obj, index) {
    var demoBtnParent = demoBtns[index].closest(".testc");
    var demoBtnParentValue = demoBtnParent.dataset.value;
    var demoBtnValue = demoBtns[index].dataset.value;
    var checkParentValid = abc.some(function (obj) {
      return obj.index === parseInt(demoBtnParentValue);
    });
    if (checkParentValid === true) {
      var findParentValid = abc.findIndex(function (obj) {
        return obj.index === parseInt(demoBtnParentValue);
      });
      if (findParentValid !== -1) {
        if (abc[findParentValid].value === parseInt(demoBtnValue)) {
          demoBtns[index].classList.add("changecolor");
        } else {
          demoBtns[index].classList.remove("changecolor");
        }
      }
    }
  });
}

function splitValue(indexParent, valueChild) {
  var tempObj = new Object();
  tempObj.index = parseInt(indexParent);
  tempObj.value = parseInt(valueChild);
  tempObj.status = "none";
  tempArray.push(tempObj);
  pushToArray(indexJump);
}

function pushToArray(index) {
  buttonStates = tempArray.slice(index * plus);
}

function analysisValue(quesValue, scoreValue) {
  if (parseInt(quesValue) < 10) {
    if (a.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = a.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = a.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          a[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  } else if (parseInt(quesValue) >= 10 && parseInt(quesValue) < 19) {
    if (b.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = b.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = b.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          b[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  } else if (parseInt(quesValue) >= 19 && parseInt(quesValue) < 28) {
    if (c.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = c.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = c.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          c[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  } else if (parseInt(quesValue) >= 28 && parseInt(quesValue) < 37) {
    if (d.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = d.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = d.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          d[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  } else if (parseInt(quesValue) >= 37 && parseInt(quesValue) < 46) {
    if (e.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = e.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = e.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          e[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  } else if (parseInt(quesValue) >= 46 && parseInt(quesValue) < 55) {
    if (f.length === 0) {
      var temporaryObj = new Object();
      temporaryObj.index = parseInt(quesValue);
      temporaryObj.value = parseInt(scoreValue);
      addObj(temporaryObj, quesValue);
    } else {
      var checkQues = f.some(function (objQues) {
        return objQues.index === parseInt(quesValue);
      });

      if (checkQues === true) {
        var checkScore = f.findIndex(function (objScore) {
          return objScore.index === parseInt(quesValue);
        });

        if (checkScore !== -1) {
          f[checkScore].value = parseInt(scoreValue);
        } else {
        }
      } else {
        var addingObj = new Object();
        addingObj.index = parseInt(quesValue);
        addingObj.value = parseInt(scoreValue);
        addObj(addingObj, quesValue);
      }
    }
  }
}

function addObj(thing, number) {
  if (number < 10) {
    a.push(thing);
  } else if (number >= 10 && number < 19) {
    b.push(thing);
  } else if (number >= 19 && number < 28) {
    c.push(thing);
  } else if (number >= 28 && number < 37) {
    d.push(thing);
  } else if (number >= 37 && number < 46) {
    e.push(thing);
  } else if (number >= 46 && number < 55) {
    f.push(thing);
  }
}

var body = document.querySelector("body");
body.addEventListener("keyup", function (e) {
  if (click === 2) {
    Count(e);
  } else {
  }
});

var web = 1;
function Count(e) {
  if (e.keyCode === 39) {
    if (web < 70) {
      if (abc.length >= allowClick) {
        createQuestion();
        GetValue();
        aright();
      } else {
        alertInfo.classList.add("show");
        alertInfo.classList.remove("hide");
        alertInfo.classList.add("showAlert");
        setTimeout(function () {
          alertInfo.classList.remove("show");
          alertInfo.classList.add("hide");
        }, 5000);
      }
    } else {
    }
  } else if (e.keyCode === 37) {
    if (click === 2 && web === 1) {
    } else {
      arleft();
    }
  }
}

function compareValue(A, B, C, D, E, F) {
  var result = Math.max(A, B, C, D, E, F);
  var note = "";
  switch (result) {
    case A: {
      note = "A";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
    case B: {
      note = "B";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
    case C: {
      note = "C";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
    case D: {
      note = "D";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
    case E: {
      note = "E";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
    case F: {
      note = "F";
      createFinalPage(note, A, B, C, D, E, F);
      break;
    }
  }
  var type = "Holland";
  sendResultToServerHolland({ note, type, A, B, C, D, E, F });
  aright();
}

function sendResultToServerHolland(result) {
  fetch("/result/holland", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      checkHollandSave(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function checkHollandSave(data) {
  console.log(data);
  if (data.success === true) {
    alertSuccess.classList.add("show");
    alertSuccess.classList.remove("hide");
    alertSuccess.classList.add("showAlert");
    setTimeout(function () {
      alertSuccess.classList.remove("show");
      alertSuccess.classList.add("hide");
    }, 5000);
  } else {
    alertError.classList.add("show");
    alertError.classList.remove("hide");
    alertError.classList.add("showAlert");
    setTimeout(function () {
      alertError.classList.remove("show");
      alertError.classList.add("hide");
    }, 5000);
  }
}

function createFinalPage(result, A, B, C, D, E, F) {
  var screen = document.createElement("div");
  screen.classList.add("sceentest");

  var divQues = document.createElement("div");
  divQues.id = "contaidiagram";

  var contentcomment = document.createElement("h4");
  var notes = "";
  switch (result) {
    case "A": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Realistic 

      R: Realistic - Người thực tế 

      Người thuộc nhóm sở thích nghề nghiệp này thường có khả năng về: kỹ thuật, công nghệ, hệ thống; ưa thích làm việc với đồ vật, máy móc, động thực vật; thích làm các công việc ngoài trời. 
      
      Ngành nghề phù hợp với nhóm này bao gồm: Các nghề về kiến trúc, an toàn lao động, nghề mộc, xây dựng, thủy sản, kỹ thuật, máy tàu thủy, lái xe, huấn luyện viên, nông – lâm nghiệp (quản lý trang trại, nhân giống cá, lâm nghiệp…), cơ khí (chế tạo máy, bảo trì và sữa chữa thiết bị, luyện kim, cơ khí ứng dụng, tự động...), điện - điện tử, địa lý - địa chất (đo đạc, vẽ bản đồ địa chính), dầu khí, hải dương học, quản lý công nghiệp... `;
      contentcomment.innerHTML = notes;
      break;
    }
    case "B": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Investigative
      
      I: Investigative - Người nghiên cứu
      
      Có khả năng về: quan sát, khám phá, phân tích đánh giá và giải quyết các vấn đề.

      Ngành nghề phù hợp với nhóm này bao gồm: Các ngành thuộc lĩnh vực khoa học tự nhiên (toán, lý, hóa, sinh, địa lý, địa chất, thống kê…); khoa học xã hội (nhân học, tâm lý, địa lý…); y - dược (bác sĩ gây mê, hồi sức, bác sĩ phẫu thuật, nha sĩ…); khoa học công nghệ (công nghệ thông tin, môi trường, điện, vật lý kỹ thuật, xây dựng…); nông lâm (nông học, thú y…)`;
      contentcomment.innerHTML = notes;
      break;
    }
    case "C": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Artistic
      
      A:  Artistic - Người có tính nghệ sĩ <br> <br>  Có khả năng về: nghệ thuật, khả năng về trực giác, khả năng tưởng tượng cao, thích làm việc trong các môi trường mang tính ngẫu hứng, không khuôn mẫu.
      
      Ngành nghề phù hợp với nhóm này bao gồm: Các ngành về văn chương; báo chí (bình luận viên, dẫn chương trình…); điện ảnh, sân khấu, mỹ thuật, ca nhạc, múa, kiến trúc, thời trang, hội họa, giáo viên dạy sử/Anh văn, bảo tàng, bảo tồn...`;
      contentcomment.innerHTML = notes;
    }
    case "D": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Social 
      
      S:  Social - Người có tính xã hội 
      
      Có khả năng về: ngôn ngữ, giảng giải, thích làm những việc như giảng dạy, cung cấp thông tin, sự chăm sóc, giúp đỡ, hoặc huấn luyện cho người khác. 
      
      Ngành nghề phù hợp với nhóm này bao gồm: sư phạm; giảng viên; huấn luyện viên điền kinh; tư vấn - hướng nghiệp; công tác xã hội, sức khỏe cộng đồng, thuyền trưởng, thầy tu, thư viện, bác sĩ chuyên khoa, thẩm định giá, nghiên cứu quy hoạch đô thị, kinh tế gia đình, tuyển dụng nhân sự, cảnh sát, xã hội học, bà đỡ, chuyên gia về X quang, chuyên gia dinh dưỡng…`;
      contentcomment.innerHTML = notes;
      break;
    }
    case "E": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Enterprising 
      
      E: Enterprising - Dám nghĩ, dám làm 
      
      Có khả năng về: kinh doanh, mạnh bạo, dám nghĩ dám làm, có thể gây ảnh hưởng, thuyết phục Người khác, có khả năng quản lý. 
      
      Ngành nghề phù hợp với nhóm này bao gồm: Các ngành về quản trị kinh doanh (quản lý khách sạn, quản trị nhân sự,…), thương mại, marketing, kế toán – tài chính, luật sư, dịch vụ khách hàng, tiếp viên hàng không, thông dịch viên, pha chế rượu, kỹ sư công nghiệp (ngành kỹ thuật hệ thống công nghiệp), bác sĩ cấp cứu, quy hoạch đô thị, bếp trưởng (nấu ăn), báo chí (phóng viên, biên tập viên…)`;
      contentcomment.innerHTML = notes;
      break;
    }
    case "F": {
      notes = `Nhóm nghề có thể phù hợp với bạn nhất là Conventional 

      C: Conventional - Người công chức
      
      Có khả năng về: số học, thích thực hiện những công việc chi tiết, thích làm việc với những số liệu, theo chỉ dẫn của người khác hoặc các công việc văn phòng. 
      
      Ngành nghề phù hợp với nhóm này bao gồm: Các ngành nghề về hành chính, thống kê, thanh tra ngành, người giữ trẻ, điện thoại viên...`;
      contentcomment.innerHTML = notes;
      break;
    }
  }

  var comment = document.createElement("div");
  comment.classList.add("comment");
  comment.appendChild(contentcomment);

  var div = document.createElement("div");
  div.classList.add("testc");
  div.appendChild(divQues);
  div.appendChild(comment);

  screen.appendChild(div);
  tescontai.appendChild(screen);

  createSpiderChart(A, B, C, D, E, F);
}

function createSpiderChart(A, B, C, D, E, F) {
  console.log(A, B, C, D, E, F);
  Highcharts.chart("contaidiagram", {
    chart: {
      polar: true,
      type: "line",
    },
    title: {
      text: `Trắc nghiệm nghề nhiệp Holland`,
      x: 0,
    },
    pane: {
      size: "80%",
    },
    xAxis: {
      categories: ["Realistic", "Investigative", "Artistic", "Social", "Enterprising", "Conventional"],
      tickmarkPlacement: "on",
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: "polygon",
      lineWidth: 0,
      min: 0,
    },
    series: [
      {
        name: "Holland",
        data: [A, B, C, D, E, F],
        pointPlacement: "on",
      },
    ],
  });
}
