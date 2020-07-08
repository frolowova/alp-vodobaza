export const state = () => ({
  regions: [],
  meRegion: [
    {
      uuid: "",
      name: "",
      area_names: []
    }
  ],
  waterBases: []
});

export const mutations = {
  ADD_MeRegionFromName(state, name) {
    // Получаем из выбранного имени объект с данными региона
    let selectedRegion = state.regions.filter(element => {
      return element.name == name;
    });

    state.meRegion.push(selectedRegion[0]);
    if (state.meRegion.length > 1) state.meRegion.splice(0, 1);
  },
  ADD_DataRegAndBW(state, datas) {
    state.regions = JSON.parse(JSON.stringify(datas.regions));
    state.waterBases = JSON.parse(JSON.stringify(datas.basesWater));
  }
};

export const actions = {
  addMeRegion({ commit }, name) {
    commit("ADD_MeRegionFromName", name);
  },
  addDataRegAndBW({ commit }, datas) {
    commit("ADD_DataRegAndBW", datas)
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
