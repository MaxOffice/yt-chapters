"use strict";

function YTAPI(apikey, clientid) {
    if (!this) {
        return new ytauth(apikey, clientid)
    }

    if(!apikey || !clientid) {
        throw "API Key and Client ID required. Cannot proceed."
    }

    const SCOPE = 'https://www.googleapis.com/auth/youtube' // 'https://www.googleapis.com/auth/youtube.force-ssl' //'https://www.googleapis.com/auth/youtube.upload'
    var me = this
    var authInstance
    var authinited = false
    var youtubeapiinited = false
    var lasterror = ""


    function inityoutubedataapi(resolve, reject) {
        gapi.client.setApiKey(apikey);
        gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            .then(
                () => {
                    youtubeapiinited = true
                    resolve()
                },
                (err) => {
                    youtubeapiinited = false
                    reject("Could not load Youtube data API:" + err)
                })
    }

    function initapi() {
        return new Promise(function initpromise(resolve, reject) {
            // Load Google API auth
            gapi.load("client:auth2", function onauth2loaded() {
                gapi.client.init({
                    'apikey': apikey,
                    'clientId': clientid,
                    'scope': SCOPE
                }).then(
                    function () {
                        authInstance = gapi.auth2.getAuthInstance()
                        authinited = true
                        lasterror = ""
                        resolve(me)
                    },
                    function (err) {
                        authinited = false
                        lasterror = "Could not initialize authentiction. Please see console for details."
                        console.error(err)
                        reject(lasterror)
                    }
                )
            })
        })
    }

    function issignedin() {
        if (!authinited) {
            return false
        }

        return authInstance.isSignedIn.get()
    }

    function isauthorized() {
        if (!authinited) {
            return false
        }

        let user = authInstance.currentUser.get()
        return user.hasGrantedScopes(SCOPE)
    }

    function signin() {
        if (!authinited) {
            throw "Unauthorized."
        }

        return new Promise(
            function signinpromise(resolve, reject) {
                if (issignedin()) {
                    resolve()
                }
                authInstance.signIn()
                    .then(
                        () => {
                            inityoutubedataapi(resolve, reject)
                        },
                        (err) => {
                            console.error(err)
                            reject("Could not sign in. Please see console for details.")
                        })
            }
        )
    }

    function signout() {
        if (!authinited) {
            throw "Unauthorized."
        }

        if (issignedin()) {
            authInstance.signOut()
        }
    }

    function getsnippet(videoid) {
        return new Promise(
            function getsnippetpromise(resolve, reject) {
                if (!isauthorized()) {
                    reject("Unauthorized.")
                    return
                }

                inityoutubedataapi(
                    () => {
                        gapi.client.youtube.videos.list({
                            "part": [
                                "snippet"
                            ],
                            "id": [
                                videoid
                            ]
                        }).then(
                            (response) => {
                                let items = response.result.items
                                if (items && items.length > 0) {
                                    resolve(items[0].snippet)
                                } else {
                                    reject("Video with id " + videoid + " not found.")
                                }
                            },
                            (err) => {
                                console.error(err)
                                reject("Could not get snippet. Please see console for details.")
                            }
                        )
                    },
                    reject
                )
            })
    }

    function updatesnippet(videoid, snippet) {
        return new Promise(
            function updateSnippetDescriptionPromise(resolve, reject) {
                if (!isauthorized()) {
                    reject("Unauthorized.")
                    return
                }

                inityoutubedataapi(
                    () => {
                        gapi.client.youtube.videos.update({
                            "part": [
                                "snippet"
                            ],
                            "resource": {
                                "id": videoid,
                                "snippet": snippet
                            }
                        }).then(
                            (response) => {
                                resolve(response.result.snippet)
                            },
                            (err) => {
                                console.error(err)
                                reject("Could not update description. Please see console for details.")
                            }
                        )
                    },
                    reject
                )
            }
        )
    }

    this.isSignedIn = issignedin
    this.isAuthorized = isauthorized
    this.signIn = signin
    this.signOut = signout
    this.init = initapi
    this.getSnippet = getsnippet
    this.updateSnippet = updatesnippet
}