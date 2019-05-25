<template>
  <div class="shortcut">
    <div class="close-out">
      <img id="cancel" v-on:click="close" src="/images/close.png" width="30px" height="30px"> 
    </div>
    <div class="form-parent">
      <h1>{{this.title}}</h1>
      <form v-on:submit="submit">
        <input id="query" uxp-quiet="true" @keydown="submit" v-model="message" placeholder="Search XD Shortcuts">
        <p v-if="!this.connectionType" style="color: #999;">
          Offline (Last updated: 5/24/19)
        </p>
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
  let shortcuts = null;

  // Check Operating System
  const os = require('os');
  let userOs = os.platform();
  let isMacUser = userOs === "darwin";  // true || false (depends on user)

  // Search Filter 
  let Fuse = require('fuse.js');
  let fuse = new Fuse(shortcuts, {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 10,
    maxPatternLength: 32,
    minMatchCharLength: 0,
    keys: [ "name", "tags"]
  });

  // Endpoint Settings 
  let url = "https://raw.githubusercontent.com/atokad5/keyboard-shortcut-list/master/endpoint.json";

  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // do success stuff here 
      let resp = request.responseText;
      let returnJson = JSON.parse(resp);
      let baseEndPoint = returnJson.shortcuts;
      console.log(returnJson)
      shortcuts = baseEndPoint;
      connection = true;
    } else {
      // Response was error
    }
  };

  request.onerror = function() {
    // no connection or connection error
    // fetch local shortcut list
    connection = false;
    shortcuts = require('./shortcuts.js');
  };

  request.send();

  module.exports = {
    props: {
      dialog: {
          type: Object
      }
    },
    data() {
      return {
        connectionType: connection,
        userType: isMacUser,
        message: '',
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
        event.preventDefault();
        fuse = new Fuse(shortcuts, {
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


