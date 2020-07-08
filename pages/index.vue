<template>
  <div class="page">
    <div class="page__loader" v-if="loaderPage">Идёт загрузка данных с сервера...</div>
    <div class="page__wrapp" v-else>
      <div class="header">
        <div class="header__title">
          <h2>Заказ воды</h2>
        </div>
      </div>

      <div class="content">
        <v-form ref="form">
          <v-select
            :items="regionsName"
            v-model="meRegion"
            :rules="[v => !!v || 'Выберите регион']"
            label="Регион"
            required
          ></v-select>
          <v-select
            :items="waterBases"
            v-model="selectedBase"
            :rules="[v => !!v || 'Выберите водобазу']"
            label="Водобаза"
            required
          ></v-select>
          <v-text-field
            v-model="tons"
            :rules="tonsRules"
            label="Количество воды (в тоннах)"
            required
            type="number"
          ></v-text-field>
          <v-text-field
            v-model="adress"
            :rules="adressRules"
            label="Куда доставить (адрес)"
            required
          ></v-text-field>
          <div class="date-show">
            Выберите дату доставки
            <v-btn @click="showCalendar=!showCalendar" color="normal">{{picker}}</v-btn>
          </div>
          <div class="form__calendar" v-show="showCalendar">
            <v-date-picker
              color="primary"
              v-model="picker"
              :show-current="true"
              @dblclick:date="showCalendar=!showCalendar"
            ></v-date-picker>
            <div class="form__calendar__text">
              <p>Для выбора даты кликните 2 раза</p>
            </div>
          </div>
        </v-form>
      </div>
      <div class="submit-form">
        <v-btn
          color="green"
          @click="sendFormToServer()"
          :loading="loading"
          :disabled="loading || !validForm()"
        >Отправить</v-btn>
      </div>
      <div class="sendOk" v-if="sendOk">Данные были успешно отправлены</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCalendar: false,
      picker: new Date().toISOString().substr(0, 10),
      tonsRules: [v => !!v || "Введите тонаж", v => (v = this.validTonas(v))],
      adressRules: [
        v => !!v || "Адрес не введён",
        v =>
          (v && v.length >= 3) ||
          "Разве это адрес? Укажите хотя бы 3 буквы, а там мы догадаемся"
      ],
      tons: 0,
      adress: "",
      meRegion: "",
      selectedBase: "",
      loaderPage: true,
      loading: false,
      sendOk: false
    };
  },
  computed: {
    regionsName() {
      let listRegions = this.$store.getters.getRegions;
      let nameRegions = [];
      listRegions.forEach(region => {
        nameRegions.push(region.name);
      });
      return nameRegions;
    },
    waterBases() {
      let meRegion = this.$store.getters.getMeRegion;
      let listWaterBases = this.$store.getters.getWaterBasesForRegions(
        meRegion.uuid
      );
      let nameWaterBases = [];
      listWaterBases.forEach(waterBase => {
        nameWaterBases.push(waterBase.name);
      });
      return nameWaterBases;
    }
  },
  methods: {
    selectedRegion(region) {
      this.$store.dispatch("addMeRegion", region);
    },
    createPointPosition() {
      if (!navigator.geolocation) {
      } else {
        /*Так как нам сперва надо получить разрешение от пользователя
		    на доступ к геопозиции, то остальной код выполняем после этого*/
        navigator.geolocation.getCurrentPosition(
          position => {
            let lat = position.coords.latitude;
            let lng = position.coords.longitude;

            let city = "";
            fetch(
              `https://geocode-maps.yandex.ru/1.x/?apikey=45ccaf60-7908-468d-adde-66b6dca72de5&format=json&geocode=${lng},${lat}&kind=locality`
            )
              .then(response => response.json())
              .then(response => response.response.GeoObjectCollection)
              .then(res => {
                city = res.featureMember[0].GeoObject.name;
                console.log(lng + ", " + lat);
                console.log(city);
                this.meRegion = this.$store.getters.searchRegionFromGeoposition(
                  city
                );
              })
              .catch(err => {
                console.log(err);
              });
          },
          function(err) {
            console.log(`ERROR(${err.code}): ${err.message}`);
          }
        );
      }
    },
    validTonas(v) {
      let ton = +v;
      if (typeof ton === "number" && ton != 0) return true;
      else return "Необходимо ввести цифры";
    },
    validForm() {
      if (
        this.tons > 0 &&
        this.adress.length > 2 &&
        this.meRegion &&
        this.selectedBase
      )
        return true;
      else return false;
    },
    getBasesWaterFromServer() {
      fetch("https://testforbackend.000webhostapp.com/?name=dataRegionAndBases")
        .then(response => response.json())
        .then(json => {
          console.log("Ответ с сервера");
          console.log(json);
          // Записываем полученные данные в store
          this.$store.dispatch("addDataRegAndBW", json);
          // Отображаем основное окно
          this.loaderPage = false;
          // Вызываем определение геопозиции, чтобы подставить в select необходимый регион
          this.createPointPosition();
        })
        .catch(err => {
          console.log(
            "Произошла ошибка соединения с сервером. Попробуйте позже"
          );
        });
    },
    // Отправляем данные формы на сервер
    sendFormToServer() {
      this.loading = true; // Запускаем на кнопке лоадер, пока запрос не выполнится
      const picker = this.picker;
      const meRegion = this.meRegion;
      const selectedBase = this.selectedBase;
      const tons = this.tons;
      const adress = this.adress;
      const formData = {
        date: picker,
        select1: meRegion,
        select2: selectedBase,
        tons: tons,
        adress: adress
      };
      // Запрос отправляем через прокси, чтобы не настраивать CORS (временное решение)
      fetch(
        "https://cors-anywhere.herokuapp.com/" +
          "https://testforbackend.000webhostapp.com/",
        {
          method: "POST",
          body: JSON.stringify(formData), // Объект в формате JSON
          withCredentials: true,
          headers: {
            "Content-type": "application/json;charset=utf-8"
          }
        }
      )
        .then(response => {
          console.log("Данные успешно отправлены на сервер");
          // Отключить loader на кнопке
          this.loading = false;
          this.sendOk = true;
          setTimeout(() => {
            this.sendOk = false;
          }, 4000);
        })
        .catch(err => {
          console.log(
            "Произошла ошибка соединения с сервером. Попробуйте позже"
          );
          this.loading = false;
        });
    }
  },
  watch: {
    // эта функция запускается при любом изменении meRegion
    meRegion: function(newRegion, oldRegion) {
      this.selectedRegion(newRegion);
    }
  },
  created() {
    this.getBasesWaterFromServer();
  }
};
</script>

<style lang="scss" scoped>
.page__wrapp {
  margin: auto;
  max-width: 600px;
}
.header {
  text-align: center;
  margin: 20px 10px;
}
.content {
  padding-left: 20px;
  padding-right: 20px;
}
.submit-form {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}
// Loading кнопки
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>