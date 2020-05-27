<template>
    <v-alert :value="isAlert" :type="type">
        <span v-html="errorMessage"></span>
    </v-alert>
</template>

<script>
export default{
    props:{
        isAlert: Boolean,
        errorMessage: String,
        type: String
    },
    data(){
        return{

        }
    }
}

</script>