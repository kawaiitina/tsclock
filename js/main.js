const app = new Vue({
  el: "#app",
  data: {
    date: new Date(),

    fonts: [
      "BebasNeue",
      "BlackHanSans",
      "Comfortaa",
      "DoHyeon",
      "FredokaOne",
      "Jua",
      "Kenia",
      "LilitaOne",
      "NanumGothic",
      "NanumMyeongjo",
      "NotoSansKR",
      "NotoSerifKR",
      "OpenSans",
      "PassionOne",
      "PoiretOne",
      "PressStart2P",
      "Righteous",
      "RobotoCondensed",
      "Roboto",
      "Unbounded",
      "UnicaOne",
    ],
    clockFontFamily: "Roboto",
    clockFontSize: 36,
    colonPosition: -3,
    colonBlink: false,
    dateFontFamily: "Roboto",
    dateFontSize: 7,

    fullScreen: false,
  },
  computed: {
    hours() {
      return this.date.getHours().toString().padStart(2, "0");
    },
    minutes() {
      return this.date.getMinutes().toString().padStart(2, "0");
    },
    formattedDate() {
      return new Intl.DateTimeFormat("ko-KR", {
        dateStyle: "full",
      }).format(this.date);
    },
    colonVisibility() {
      if (this.colonBlink) {
        return this.date.getMilliseconds() < 500;
      }
      return true;
    },
  },
  methods: {
    changeClockFontFamily(font) {
      this.$refs.clock.style.fontFamily = font;
      this.save();
    },
    changeClockFontSize(size) {
      this.$refs.clock.style.fontSize = size;
      this.save();
    },
    changeDateFontFamily(font) {
      this.$refs.date.style.fontFamily = font;
      this.save();
    },
    changeDateFontSize(size) {
      this.$refs.date.style.fontSize = size;
      this.save();
    },
    changeColonPosition() {
      this.$refs.colon.style.transform = `translateY(${this.colonPosition}vw)`;
      this.save();
    },
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
    save() {
      localStorage.setItem(
        "config",
        JSON.stringify({
          clockFontFamily: this.clockFontFamily,
          clockFontSize: this.clockFontSize,
          colonPosition: this.colonPosition,
          colonBlink: this.colonBlink,
          dateFontFamily: this.dateFontFamily,
          dateFontSize: this.dateFontSize,
        })
      );
    },
  },
  created() {
    const savedConfig = JSON.parse(localStorage.getItem("config"));
    if (savedConfig) {
      this.clockFontFamily = savedConfig.clockFontFamily;
      this.clockFontSize = savedConfig.clockFontSize;
      this.colonPosition = savedConfig.colonPosition;
      this.colonBlink = savedConfig.colonBlink;
      this.dateFontFamily = savedConfig.dateFontFamily;
      this.dateFontSize = savedConfig.dateFontSize;
    }

    const _this = this;
    (function update() {
      _this.date = new Date();
      if (document.fullscreenElement === null) {
        _this.fullScreen = false;
      } else {
        _this.fullScreen = true;
      }
      requestAnimationFrame(update);
    })();
  },
});
