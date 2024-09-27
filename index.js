const img = document.querySelectorAll("article > img");
const btn_left = document.querySelector(".btn_next");
const btn_right = document.querySelector(".btn_after");
const allDote = document.querySelectorAll(".box");

btn_left.addEventListener("click", left_Slide);
let counter = 0;
function left_Slide() {
  img[counter].style.animation = "sliderOut 0.5s forwards";
  if (counter >= img.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  img[counter].style.animation = "sliderInt 0.5s forwards";
  AutoDote();
}
btn_right.addEventListener("click", right_Slide);
function right_Slide() {
  img[counter].style.animation = "slider_threeOut 0.5s forwards";
  if (counter == 0) {
    counter = img.length - 1;
  } else {
    counter--;
  }
  img[counter].style.animation = "slider_threeInt 0.5s forwards";
  AutoDote();
}
// Autto Slider =======>
function AutoSilder() {
  interval = setInterval(() => {
    right_Slide();
    AutoDote();
  }, 1000);
}
AutoSilder();
//Hover Clear Interval ==>
const contenerSlder = document.querySelector("section");
contenerSlder.addEventListener("mouseover", () => {
  clearInterval(interval);
});
// mouseleave ==>
contenerSlder.addEventListener("mouseleave", () => {
  AutoSilder();
});
//=========Alldote===============>
function AutoDote() {
  for (let i = 0; i < allDote.length; i++) {
    allDote[i].className = allDote[i].className.replace("active", "");
  }
  allDote[counter].className += " active";
}
// ===========Dote Click Events=================>
allDote.forEach(function (dot) {
  dot.addEventListener("click", function (event) {
    event.currentTarget.classList.add("active");
    const dotIndex = event.currentTarget.getAttribute("attr");
    if (dotIndex > counter) {
      img[counter].style.animation = "sliderOut 0.5s forwards";
      counter = dotIndex;
      img[counter].style.animation = "sliderInt 0.5s forwards";
    } else if (dotIndex == counter) {
      return;
    } else {
      img[counter].style.animation = "slider_threeOut 0.5s forwards";
      counter = dotIndex;
      img[counter].style.animation = "slider_threeInt 0.5s forwards";
    }
    AutoDote();
  });
});
