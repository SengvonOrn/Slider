const img = document.querySelectorAll("article > img");
const btn_left = document.querySelector(".btn_next");
const btn_right = document.querySelector(".btn_after");
const allDote = document.querySelectorAll(".box");
let intervalId = null;

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
  if (counter === 0) {
    counter = img.length - 1;
  } else {
    counter--;
  }
  img[counter].style.animation = "slider_threeInt 0.5s forwards";
  AutoDote();
}
// Keyboard support for controls
[btn_left, btn_right].forEach((el, idx) => {
  el.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      idx === 0 ? left_Slide() : right_Slide();
    }
  });
});

// Auto Slider =======>
function AutoSlider() {
  // Respect reduced motion preference
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    if (intervalId) clearInterval(intervalId);
    intervalId = null;
    return;
  }
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    right_Slide();
  }, 3000);
}
AutoSlider();
//Hover Clear Interval ==>
const sliderContainer = document.querySelector("section");
sliderContainer.addEventListener("mouseover", () => {
  if (intervalId) clearInterval(intervalId);
});
// mouseleave ==>
sliderContainer.addEventListener("mouseleave", () => {
  AutoSlider();
});
//=========Alldote===============>
function AutoDote() {
  allDote.forEach((dot) => dot.classList.remove("active"));
  allDote[counter].classList.add("active");
}
// ===========Dote Click Events=================>
allDote.forEach(function (dot) {
  dot.addEventListener("click", function (event) {
    event.currentTarget.classList.add("active");
    const dotIndex = Number(event.currentTarget.getAttribute("attr"));
    if (dotIndex > counter) {
      img[counter].style.animation = "sliderOut 0.5s forwards";
      counter = dotIndex;
      img[counter].style.animation = "sliderInt 0.5s forwards";
    } else if (dotIndex === counter) {
      return;
    } else {
      img[counter].style.animation = "slider_threeOut 0.5s forwards";
      counter = dotIndex;
      img[counter].style.animation = "slider_threeInt 0.5s forwards";
    }
    AutoDote();
  });
});
