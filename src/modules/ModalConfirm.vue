<template>
    <v-dialog v-model="settings.SHOW" width="300" :persistent="persistent">
        <v-card>
        <v-card-title :class="`${settings.TYPE} white--text`">{{ settings.TITLE }}</v-card-title>

        <v-card-text><span v-html="settings.MESSAGE"></span></v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="confirmed" :color="settings.TYPE" depressed >Yes</v-btn>
            <v-btn flat @click="close" outline>No</v-btn>
        </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    data(){
        return{
            persistent: true
        }
    },
    props: {
        settings: Object
    },
    methods: {
        confirmed() {
            this.MODAL_CONFIRM({ 
                callback: true,
                item: this.GET_MODAL_CONFIRM_SETTINGS.ITEM
            })
        },
        close() {
            this.MODAL_CONFIRM({ 
                show: false
            })
        }
    }
}
</script>
