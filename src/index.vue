<template>
  <div class="shortcut">
    <div class="close-out">
      <img id="cancel" v-on:click="close" src="/images/close.png" width="30px" height="30px"> 
    </div>
    <div class="form-parent">
      <h1>{{this.title}}</h1>
      <form v-on:submit="submit">
        <input id="query" uxp-quiet="true" @keydown="submit" v-model="message" placeholder="Search XD Shortcuts">
        <div class="button-flex">
          <div style="width:100px;" v-if="this.message.length >= 1 ? true : false"><button v-on:click="showAll" uxp-primary="cta">Show All</button></div>
          <div style="width:100px;"><button v-on:click="submit" uxp-variant="cta">Search</button></div>
        </div>
      </form>
    </div>
    <div class="copy-element">
      <div v-for="item in items" :key="item.id">
        <div class="copy-element__item">
          <h4 class="shortcut-name">{{item.name}}</h4>
          <p class="shortcut-command">{{item.shortcut}}</p>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
// const fs = require("uxp").storage.localFileSystem;
  const os = require('os');
  let localData = null;
  let Fuse = require('fuse.js');
  let userOs = os.platform();
  let isMacUser = userOs === "darwin";
  let fetchUserOs = null;
  let options = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 10,
    maxPatternLength: 32,
    minMatchCharLength: 0,
    keys: [ "name", "tags"]
  }
  let fuse = new Fuse(localData, options);

  // check if they're win or mac user
  if(isMacUser) {
    localData = require('./macData.js');
  } else {
    localData = require('./winData.js');
  }
  //

  module.exports = {
    props: {
      dialog: {
          type: Object
      }
    },
    data() {
      return {
        userType: fetchUserOs,
        message: '',
        title: 'Keyboard Shortcuts',
        items: localData //  array of local data 
       
      }
    },
    methods: {
      close() {
        this.dialog.close();
      },
      showAll: function() {
        this.message = '';
        this.items = localData;
      },
      submit : function(event) {
        event.preventDefault();
        fuse = new Fuse(localData, options);
        if(this.message.length >= 1) {
          this.items = fuse.search(this.message);
        } else {
          this.items = localData;
        }
      }
    } 
  }
</script>


