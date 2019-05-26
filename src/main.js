global.setTimeout = function (fn) { fn() }
global.clearTimeout = function () { };

const styles = require("./styles.css");
const Vue = require("vue").default;
const index = require("./index.vue").default
let dialog;


function getDialog() {
  if (dialog == null) {
    document.body.innerHTML = `<dialog><div id="container"></div></dialog>`
    dialog = document.querySelector("dialog");
    var app4 = new Vue({
      el: "#container",
      components: { index },
      render(h) {
        return h(index, { props: { dialog } })
      }
    })
  }
  return dialog
}

module.exports = {
  commands: {
    fetchShortCuts: function () {
      getDialog().showModal();
    }
  }
};
