"use strict";

Vue.component('video-section', {
    template: '\
    <section id="video-bar">\
        <div>\
            <label>Video ID:</label><input type="url" v-model="videodata.currentvideoid" />\
            <button disabled="true" v-bind:disabled="videodata.godisabled" v-on:click="getvideosnippet">Go</button>\
            <button disabled="true" v-bind:disabled="!videodata.fetched" v-on:click="clearvideodata">Clear</button>\
        </div>\
        <div>\
            <label>Video</label>\
            <iframe id="video-player" v-bind:src="embedUrl" class="standardsize">\
            </iframe>\
        </div>\
        <div>\
            <div><label>Description</label><button v-bind:disabled="!videodata.fetched" v-on:click="updatevideosnippet">Update</button></div>\
            <textarea class="standardsize" v-model="videodata.currentdescriptiontext"></textarea>\
        </div>\
    </section>\
    ',
    props: ['videodata'],
    computed: {
        embedUrl: function() {
            return !this.videodata.currentvideoid ? "about:blank" : "https://www.youtube.com/embed/" + this.videodata.currentvideoid
        }
    },
    watch: {
        "videodata.currentvideoid": function(val) {
            if(val === "") {
                this.$parent.resetVideoData()
            }
        }
    },
    methods: {
        getvideosnippet: function() {
            this.$parent.getVideoSnippet()
        },
        updatevideosnippet: function() {
            this.$parent.updateVideoSnippet()
        },
        clearvideodata: function() {
            this.$parent.resetVideoData()
        }
    }
})
