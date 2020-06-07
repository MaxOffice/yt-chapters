"use strict";

Vue.component('auth-button', {
    template: '\
    <div>\
    <button v-if="!authdata.authorized" v-on:click="signin">Sign in/Authorize</button>\
    <button v-if="authdata.authorized" v-on:click="signout">Sign Out</button>\
    </div>\
    ',
    props: ['authdata'],
    methods: {
        signin: function() {
            this.$parent.signin()
        },
        signout: function() {
            this.$parent.signout()
        }
    }
})