const $hour = document.getElementById("hour");
const $colon = document.getElementById("colon");
const $minute = document.getElementById("minute");
const $date = document.getElementById("date");
const $fullscreenButton = document.getElementById("fullscreen-button");

let recentUpdate = new Date();
$minute.innerText = recentUpdate.getMinutes().toString().padStart(2, "0");
$hour.innerText = recentUpdate.getHours().toString().padStart(2, "0");
$date.innerText = new Intl.DateTimeFormat("ko-KR", {
  dateStyle: "full",
}).format(recentUpdate);

(function update() {
  if (document.fullscreenElement === null) {
    $fullscreenButton.style.display = "";
  } else {
    $fullscreenButton.style.display = "none";
  }

  const date = new Date();

  // if (date.getMilliseconds() < 500) {
  //   $colon.style.visibility = "";
  // } else {
  //   $colon.style.visibility = "hidden";
  // }

  if (recentUpdate.getMinutes() == date.getMinutes()) {
    requestAnimationFrame(update);
    return;
  }
  $minute.innerText = date.getMinutes().toString().padStart(2, "0");
  if (recentUpdate.getHours() != date.getHours()) {
    $hour.innerText = date.getHours().toString().padStart(2, "0");
  }
  if (recentUpdate.getDate() != date.getDate()) {
    $date.innerText = new Intl.DateTimeFormat("ko-KR", {
      dateStyle: "full",
    }).format(date);
  }
  recentUpdate = date;

  requestAnimationFrame(update);
})();

$fullscreenButton.addEventListener("click", function requestFullScreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
});
