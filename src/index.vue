<template>
  <div class="shortcut">
    <div class="form-parent">
      <h1>{{this.title}}</h1>
      <form v-on:submit="submit">
        <input id="query" uxp-quiet="true" v-model="message" placeholder="Search XD Shortcuts">
        <div class="button-flex">
          <div style="width:100px;" v-if="this.message.length >= 1 ? true : false"><button v-on:click="showAll" uxp-primary="cta">Show All</button></div>
          <div style="width:100px;"><button v-on:click="submit" uxp-variant="cta">Search</button></div>
        </div>
      </form>
    </div>
    <div v-if="this.userType">
      <div class="copy-element">
        <div v-for="item in items" :key="item.id">
          <div class="copy-element__item">
            <h4 class="shortcut-name">{{item.name}}</h4>
            <p class="shortcut-command">{{item.macshortcut}}</p>
          </div>
        </div>
      </div>  
    </div>
    <div v-else>
      <div class="copy-element">
        <div v-for="item in items" :key="item.id">
          <div class="copy-element__item">
            <h4 class="shortcut-name">{{item.name}}</h4>
            <p class="shortcut-command">{{item.pcshortcut}}</p>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>
  let connection = null;
  let shortcuts = require('./shortcuts.js');


  // Check Operating System
  const os = require('os');
  let userOs = os.platform();
  let isMacUser = userOs === "darwin";  // true || false (depends on user)
  
  // Search Filter 
  let Fuse = require('fuse.js');


  // Endpoint Settings 
  let url = "https://raw.githubusercontent.com/atokad5/keyboard-shortcut-list/master/endpoint.json";
  

  module.exports = {
    props: {
      dialog: {
          type: Object
      }
    },
    mounted() {
      console.log("mounted")
      console.log(userOs, 'here')
    },
    data() {
      return {
        connectionType: true,
        userType: isMacUser,
        message: '',
        offlineMsg: ' Offline (Last updated: 5/24/19)',
        title: 'Keyboard Shortcuts',
        items: shortcuts //  array of local data 
      }
    },
    methods: {
      close() {
        this.dialog.close();
      },
      showAll: function() {
        this.message = '';
        this.items = shortcuts;
      },
      submit : function(event) {
        let fuse = new Fuse(shortcuts, {
          shouldSort: true,
          threshold: 0.6,
          location: 0,
          distance: 10,
          maxPatternLength: 32,
          minMatchCharLength: 0,
          keys: [ "name", "tags"]
        });
        if(this.message.length >= 1) {
          this.items = fuse.search(this.message);
        } else {
          this.items = shortcuts;
        }
      }
    } 
  }
</script>


