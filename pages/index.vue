<template>
  <!-- <div class="v-app"> -->
  <div class="page">
    <div class="page__wrapp">
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
    </div>
    <div class="submit-form">
      <v-btn color="green">Отправить</v-btn>
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
        v => !!v || "Адресс не введён",
        v =>
          (v && v.length >= 3) ||
          "Разве это адрес? Укажите хотябы 3 буквы, а там мы дагадаемся"
      ],
      tons: 0,
      adress: "",
      meRegion: ""
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
    }
  },
  watch: {
    // эта функция запускается при любом изменении meRegion
    meRegion: function(newRegion, oldRegion) {
      this.selectedRegion(newRegion);
    }
  },
  mounted() {
    this.createPointPosition();
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
</style>