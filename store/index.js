export const state = () => ({
  regions: [
    {
      uuid: "b26b0080",
      name: "Офис продаж г. Москва",
      area_names: ["Москва", "Московская область"]
    },
    {
      uuid: "9d932f01",
      name: "Офис продаж г. Санкт-Петербург",
      area_names: ["Санкт-Петербург", "Ленинградская область"]
    },
    {
      uuid: "a8bad9e2",
      name: "Офис продаж г. Ярославль",
      area_names: ["Ярославль", "Ярославская область"]
    }
  ],
  meRegion: [
    {
      uuid: "",
      name: "",
      area_names: []
    }
  ],
  //
  waterBases: [
    {
      uuid: "23620d97",
      name: "Славвода-ЯНОС Транзит (вода МО)",
      region_uuid: "b26b0080"
    },
    {
      uuid: "23620ddc",
      name: "Тверьводопродукт Осташковская водобаза СО ООО ЦФ МО",
      region_uuid: "b26b0080"
    },
    {
      uuid: "23620e1b",
      name: "Кореновская ВБ",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23620e76",
      name: "Кудьминская ООО ВБ РП",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23620ea5",
      name: "ЯНОС АСН вода МО",
      region_uuid: "b26b0080"
    },
    {
      uuid: "23620eea",
      name: "Пассажирводасервис",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23620f1f",
      name: 'Наливная станция "Солнечногорская"',
      region_uuid: "b26b0080"
    },
    {
      uuid: "23620f67",
      name: "Краснодарская ВБ",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23620f96",
      name: "Ивановская ВБ",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23620fec",
      name: "Невская ВБ - ЛПДС",
      region_uuid: "9d932f01"
    },
    {
      uuid: "2362103b",
      name: "Тверьводопродукт Тверская водобаза СО ООО ЦФ МО",
      region_uuid: "b26b0080"
    },
    {
      uuid: "2362108c",
      name: "Череповецкая ВБ Лукойл-Волгаводопродукт ООО РП",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "236210bc",
      name: "МВПЗ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "2362110e",
      name: "ЯНОС",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23621135",
      name: "Гладкое АО ВБ - Пустынька",
      region_uuid: "9d932f01"
    },
    {
      uuid: "2362115b",
      name: 'ЛПДС "Володарская"',
      region_uuid: "b26b0080"
    },
    {
      uuid: "236211a5",
      name: "Шуйская ВБ",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "236211e1",
      name: "Фирма «С.А.С» ООО ВБ ЦФ КО",
      region_uuid: "9d932f01"
    },
    {
      uuid: "2362121b",
      name: "Павельцевская ВБ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "23621249",
      name: "Ярославль ВБ ГПН-РП",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23621285",
      name: "Звезда ВБ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "236212c1",
      name: "БН-Юг ООО ЦФ МО",
      region_uuid: "b26b0080"
    },
    {
      uuid: "236212e8",
      name: "Нефто-Сервис ВБ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "2362130e",
      name: 'Наливная станция "Нагорная"',
      region_uuid: "b26b0080"
    },
    {
      uuid: "23621345",
      name: "Невский вода ООО ВБ Товарный Московский",
      region_uuid: "9d932f01"
    },
    {
      uuid: "236213c4",
      name: "АВИАвода АО ВБ",
      region_uuid: "9d932f01"
    },
    {
      uuid: "236213eb",
      name: "водопродуктсервис ООО ВБ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "2362143d",
      name: "Союз ВБ",
      region_uuid: "b26b0080"
    },
    {
      uuid: "23621464",
      name: "ТЭК-Сервис ООО ВБ",
      region_uuid: "9d932f01"
    },
    {
      uuid: "2362149f",
      name: "Несте - Санкт-Петербург ООО ВБ Бронка",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23621502",
      name: "Рыбинская ВБ",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "23621529",
      name: "Полтавская ВБ",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23621551",
      name: "ГПН-СЗ ООО ВБ - Ст.Петергоф",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23621580",
      name: "Омский ВПЗ (транзит) ЯО",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "236215b5",
      name: "Нижегородская ВБ (Зуевская ВБ)",
      region_uuid: "a8bad9e2"
    },
    {
      uuid: "236215e9",
      name: "Назиевская водяная компания ЗАО ВБ Жихарево",
      region_uuid: "9d932f01"
    },
    {
      uuid: "23621617",
      name: "Тверьводопродукт Бежецкая водобаза СО ООО ЦФ МО",
      region_uuid: "b26b0080"
    }
  ]
});

export const mutations = {
  ADD_MeRegionFromName(state, name) {
    // Получаем из выбранного имени объект с данными региона
    let selectedRegion = state.regions.filter(element => {
      return element.name == name;
    });

    state.meRegion.push(selectedRegion[0]);
    if (state.meRegion.length > 1) state.meRegion.splice(0, 1);
  }
};

export const actions = {
  addMeRegion({ commit }, name) {
    commit("ADD_MeRegionFromName", name);
  }
};

export const getters = {
  getRegions: state => {
    return state.regions;
  },
  getMeRegion: state => {
    return state.meRegion[0];
  },
  getWaterBases: state => {
    return state.waterBases;
  },
  getWaterBasesForRegions: state => regionUID => {
    let waterBases = state.waterBases.filter(element => {
      return element.region_uuid == regionUID;
    });
    return waterBases;
  },
  searchRegionFromGeoposition: state => city => {
    let region = state.regions.filter(element => {
      return element.area_names[0] == city;
    });
    return region[0].name;
  }
};
