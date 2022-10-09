<template>
  <button id="fullscreen-button" @click="requestFullScreen">전체화면</button>
  <div id="background">
    <div id="time">{{ formattedTime }}</div>
    <div id="date">{{ formattedDate }}</div>
  </div>
</template>

<script>
function formatDate(str, date) {
  const dayToString = ["일", "월", "화", "수", "목", "금", "토"];
  return str
    .replace(/\[year\]/gi, date.getFullYear())
    .replace(/\[century\]/gi, Math.trunc((date.getFullYear() + 1) / 100) + 1)
    .replace(/\[month\]/gi, date.getMonth() + 1)
    .replace(/\[monthp\]/gi, (date.getMonth() + 1).toString().padStart(2, "0"))
    .replace(/\[date\]/gi, date.getDate())
    .replace(/\[datep\]/gi, date.getDate().toString().padStart(2, "0"))
    .replace(/\[day\]/gi, dayToString[date.getDay()])
    .replace(/\[hour24\]/gi, date.getHours())
    .replace(/\[hour24p\]/gi, date.getHours().toString().padStart(2, "0"))
    .replace(
      /\[hour12\]/gi,
      date.getHours() % 12 == 0 ? 12 : date.getHours() % 12
    )
    .replace(
      /\[hour12p\]/gi,
      (date.getHours() % 12 == 0 ? 12 : date.getHours() % 12)
        .toString()
        .padStart(2, "0")
    )
    .replace(/\[minute\]/gi, date.getMinutes())
    .replace(/\[minutep\]/gi, date.getMinutes().toString().padStart(2, "0"))
    .replace(/\[second\]/gi, date.getSeconds())
    .replace(/\[secondp\]/gi, date.getSeconds().toString().padStart(2, "0"))
    .replace(/\[millisecond\]/gi, date.getMilliseconds())
    .replace(
      /\[millisecondp\]/gi,
      date.getMilliseconds().toString().padStart(3, "0")
    )
    .replace(/\[millisecond1\]/gi, Math.trunc(date.getMilliseconds() / 100))
    .replace(/\[millisecond2\]/gi, Math.trunc(date.getMilliseconds() / 10))
    .replace(
      /\[millisecond2p\]/gi,
      Math.trunc(date.getMilliseconds() / 10)
        .toString()
        .padStart(2, "0")
    )
    .replace(/\[ampm\]/gi, date.getHours() < 12 ? "오전" : "오후");
}

export default {
  name: "TheClock",
  data() {
    return {
      date: new Date(),
      dateReq: 0,
    };
  },
  computed: {
    formattedTime() {
      return formatDate("[hour24p]:[minutep]", this.date);
    },
    formattedDate() {
      return formatDate("[year]년 [month]월 [date]일 [day]요일", this.date);
    },
  },
  methods: {
    requestFullScreen() {
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
    },
  },
  created() {
    const self = this;
    (function refreshDate() {
      self.date = new Date();
      self.dateReq = requestAnimationFrame(refreshDate);
    })();
  },
  beforeUnmount() {
    cancelAnimationFrame(this.dateReq);
  },
};
</script>

<style scoped>
#background {
  background-color: black;
  width: 100vw;
  height: 100vh;
}
#time {
  width: 100vw;
  height: 75vh;
  text-align: center;
  font-family: Helvetica;
  font-size: 36vw;
  line-height: 85vh;
  color: white;
}
#date {
  width: 100vw;
  height: 25vh;
  text-align: center;
  font-family: Helvetica;
  font-size: 7vw;
  color: white;
  text-align: center;
}
#fullscreen-button {
  width: 100vw;
}
</style>
