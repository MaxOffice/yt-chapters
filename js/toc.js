"use strict";

function TOCManager() {

    const me = this
    const toctimeregex = /^(\d{1,2}[:.]){0,1}(\d{1,2})[:.](\d{2})$/
    this.toc = []

    function cleartoc() {
        this.toc = []
    }

    function sorttoc() {
        me.toc.sort((a, b) => a.time === b.time ? 0: a.time > b.time ?  1 : -1)
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

    function gettocformat1() {
        let toc = me.toc
        return toc.reduce(function(prev, current){
            return prev + current.title + " - " + current.time + "\n"
        },"")
    }

    this.addTOCEntry = addtocentry
    this.updateTOCEntry = updatetocentry
    this.clearTOC = cleartoc
    this.getTOCFormat1 = gettocformat1
}

