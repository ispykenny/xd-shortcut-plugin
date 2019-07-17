global.setTimeout = function (fn) { fn() }
global.clearTimeout = function () { };

const styles = require("./styles.css");
const Vue = require("vue").default;
const index = require("./index.vue").default
let dialog;


function show(e) {
  document.body.innerHTML = `<div id="container">uijdwaij</div>`
  var app4 = new Vue({
    el: "#container",
    components: { index },
    render(h) {
      return h(index, { props: { dialog } })
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
