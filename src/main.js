global.setTimeout = function (fn) { fn() }
global.clearTimeout = function () { };

const styles = require("./styles.css");
const Vue = require("vue").default;
const index = require("./index.vue").default


function show(e) {
  document.body.innerHTML = `<div id="container"></div>`
  var app4 = new Vue({
    el: "#container",
    components: { index },
    render(h) {
      return h(index)
    }
  })
}

function hide () {
  console.log('hiding')
}

function update(e) {
  console.log('updating')
}


module.exports = {
  panels: {
    "fetchShortCuts": {show, hide, update}
  }
};
