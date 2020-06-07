"use strict";

Vue.component('video-section', {
    template: '\
    <section id="video">\
        <div class="videorow">\
            <div class="videocol head">\
                <label>Video ID:\
                    <input type="text" class="videoid" v-model="videodata.currentvideoid" />\
                </label>\
                <button disabled="true" v-bind:disabled="videodata.godisabled" v-on:click="getvideosnippet">Go</button>\
                <button disabled="true" v-bind:disabled="!videodata.fetched" v-on:click="clearvideodata">Clear</button>\
            </div>\
            <div class="videocol">\
                <label>Description: </label><button v-bind:disabled="!videodata.fetched" v-on:click="updatevideosnippet">Update</button>\
            </div>\
        </div>\
        <div class="videorow">\
            <div class="videocol">\
                <iframe id="video-player" v-bind:src="embedUrl">\
                </iframe>\
            </div>\
            <div class="videocol">\
                <textarea v-model="videodata.currentdescriptiontext"></textarea>\
            </div>\
        </div>\
    </section>\
    ',
    props: ['videodata'],
    computed: {
        embedUrl: function () {
            return !this.videodata.currentvideoid ? "about:blank" : "https://www.youtube.com/embed/" + this.videodata.currentvideoid
        }
    },
    watch: {
        "videodata.currentvideoid": function (val) {
            if (val === "") {
                this.$parent.resetVideoData()
            }
        }
    },
    methods: {
        getvideosnippet: function () {
            this.$parent.getVideoSnippet()
        },
        updatevideosnippet: function () {
            this.$parent.updateVideoSnippet()
        },
        clearvideodata: function () {
            this.$parent.resetVideoData()
        }
    }
})
