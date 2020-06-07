"use strict";

function TOCManager() {

    const me = this
    const toctimeregex = /^(\d{1,2}[:.]){0,1}(\d{1,2})[:.](\d{2})$/
    this.toc = []

    function cleartoc() {
        me.toc.splice(0, me.toc.length)
    }


    function insertzerotoc() {
        let zeroregex = /^(0{0,2}[:.]{0,1})(0{1,3})[:.]0{2}$/
        if (me.toc.length === 0 || !zeroregex.test(me.toc[0].time)) {
            let newtime = "00:00"
            if (me.toc.length > 0) {
                if ((me.toc[0].time.match(/[:.]/g) || []).length > 1) {
                    newtime = "00:00:00"
                }
            }

            me.toc.unshift({ "time": newtime, "title": "Intro" })

        }
    }

    function sorttoc() {
        me.toc.sort((a, b) => a.time === b.time ? 0 : a.time > b.time ? 1 : -1)

        insertzerotoc()
    }

    function addtocentry(time, title) {
        if (!toctimeregex.test(time)) {
            throw "Please provide valid time."
        }

        me.toc.push({
            "time": time,
            "title": title
        })

        sorttoc()
    }

    function updatetocentry(time, title) {
        if (!toctimeregex.test(time)) {
            throw "Please provide valid time."
        }

        let found = me.toc.findIndex((item) => item.time === time)
        if (found === -1) {
            addtocentry(time, title)
        } else {
            me.toc[found].title = title

            sorttoc()
        }
    }

    function parseformat1(text) {
        let f1regex = /\n(.*) - (\d{1,2}[:.]){0,1}(\d{1,2}[:.]\d{2})/g
        let matches = [...text.matchAll(f1regex)]
        if (matches.length > 0) {
            cleartoc()
            matches.map(function (matchvalue) {
                me.toc.push({
                    time: (matchvalue[2] ? matchvalue[2] : "") + matchvalue[3],
                    title: matchvalue[1]
                })
            })
            sorttoc()
        } else {
            cleartoc()
            insertzerotoc()
        }
    }

    function gettocformat1() {
        let toc = me.toc
        return toc.reduce(function (prev, current) {
            return prev + current.title + " - " + current.time + "\n"
        }, "")
    }

    this.addTOCEntry = addtocentry
    this.updateTOCEntry = updatetocentry
    this.clearTOC = cleartoc
    this.getTOCFormat1 = gettocformat1
    this.parseTOCFormat1 = parseformat1

    cleartoc()
}

