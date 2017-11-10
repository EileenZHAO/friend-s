let local = {
  save (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  fetch (key) {
    /* return JSON.parse(localStorage.getItem(key)) || {} */
    return JSON.parse(localStorage.getItem(key)) || ''
  },
  saveSession (key, value) {
    sessionStorage.setItem(key, value)
  },
  fetchSession (key, value) {
    return sessionStorage.getItem(key) || ''
  }
}

export default {
  install: function (vm) {
    vm.prototype.$local = local
  }
}
