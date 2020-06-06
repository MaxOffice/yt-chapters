"use strict";

Vue.component('toc-item', {
    template: '\
    <tr>\
        <td>{{ item.time }}</td>\
        <td><input type="text" v-model="item.title" /></td>\
        <td><button v-on:click="$emit(\'remove\')">Remove</button></td>\
    </tr>',
    props: ['item']
})

Vue.component('toc-section', {
    template: '\
    <section id="toc">\
    <label>TOC</label><button v-on:click="updateDescription">Update Description</button>\
    <table id="toctable">\
        <thead>\
            <tr>\
                <th>Time</th>\
                <th>Title</th>\
                <th></th>\
            </tr>\
        </thead>\
        <tbody>\
            <tr is="toc-item" v-for="(item,index) in tocdata.toc" v-bind:key="index" v-bind:item="item" v-on:remove="tocdata.toc.splice(index,1)">\
            </tr>\
            <tr>\
                <td><input type="text" v-model="tocdata.currenttime" /></td>\
                <td><input type="text" v-model="tocdata.currenttitle" /></td>\
                <td><button v-on:click="additem">Add</button></td>\
            </tr>\
            <tr><td colspan="3"></td></tr>\
        </tbody>\
    </table>\
    </section>',
    props: ['tocdata'],
    methods: {
        additem: function () {
            try {
                this.$parent.updateTOCEntry(this.tocdata.currenttime, this.tocdata.currenttitle)
                this.tocdata.currenttime = ""
                this.tocdata.currenttitle = ""
            } catch (err) {
                window.alert(err)
            }
        },
        updateDescription: function() {
            this.$parent.appendTOCToDescription() 
        }
    }
})