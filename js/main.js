"use strict";

// Provide your Google API Key and Client ID below
const APIKEY = ""
const CLIENTID = ""

const api = new YTAPI(APIKEY, CLIENTID)
const tocmanager = new TOCManager()

var vmdata = {
    authdata: {
        authorized: false
    },
    tocdata: {
        toc: tocmanager.toc,
        "currenttime": "",
        "currenttitle": ""
    },
    videodata: {
        fetched: false,
        godisabled: true,
        currentvideoid: "",
        currentdescriptiontext: "",
        currentvideotitle: "",
        currentvideocategoryid: ""

    }
}

var vm = new Vue({
    el: '#main',
    data: vmdata,
    mounted: function () {
        api.init()
            .then(() => {
                this.setAuthorized(api.isAuthorized())
            })
            .catch((err) => {
                window.alert(err)
                this.setAuthorized(false)
            })
    },
    methods: {
        signin: function () {
            api.signIn().then(
                () => {
                    this.setAuthorized(true)
                },
                (err) => {
                    window.alert(err)
                    this.setAuthorized(false)
                }
            )
        },
        signout: function () {
            api.signOut()
            this.setAuthorized(false)
        },
        setAuthorized: function (authorized) {
            if (this.authdata.authorized === authorized) {
                return
            }

            this.authdata.authorized = authorized

            this.videodata.godisabled = !authorized

            this.resetVideoData()

        },
        updateTOCEntry: tocmanager.updateTOCEntry,
        getTOCFormat1: tocmanager.getTOCFormat1,
        appendTOCToDescription: function (text) {
            this.videodata.currentdescriptiontext += "\n\n" + this.getTOCFormat1()
        },
        resetVideoData: function () {
            this.videodata.currentvideoid = ""
            this.videodata.currentvideotitle = ""
            this.videodata.currentvideocategoryid = ""
            this.videodata.currentdescriptiontext = ""
            this.videodata.fetched = false

            tocmanager.clearTOC()
        },
        getVideoSnippet: function () {
            let id = this.videodata.currentvideoid
            if (!id) {
                window.alert("Please provide a valid Youtube video id.")
                return
            }

            api.getSnippet(id).then(
                (result) => {
                    this.videodata.currentdescriptiontext = result.description
                    this.videodata.currentvideotitle = result.title
                    this.videodata.currentvideocategoryid = result.categoryId
                    this.videodata.fetched = true

                    tocmanager.parseTOCFormat1(this.videodata.currentdescriptiontext)
                },
                (err) => {
                    window.alert(err)
                    this.videodata.currentdescriptiontext = ""
                    this.videodata.fetched = false
                }
            )

        },
        updateVideoSnippet: function () {
            if (!this.videodata.currentvideoid || !this.videodata.currentdescriptiontext) {
                window.alert("Nothing to update.")
                return
            }

            api.updateSnippet(
                this.videodata.currentvideoid,
                {
                    title: this.videodata.currentvideotitle,
                    description: this.videodata.currentdescriptiontext,
                    categoryId: this.videodata.currentvideocategoryid
                })
                .then(
                    (result) => {
                        this.videodata.currentvideoid = ""
                    },
                    (err) => {
                        window.alert(err)
                    }
                )
        }
    }
})