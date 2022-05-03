<template>
<li class="nav-item">
    <a :href="$router.resolve({'name':to}).href" class="nav-link" style="color: white">
        <i :class="icon"></i> {{title}}
    </a>
</li>
    
</template>
<script>
export default {
    props : {
        to : String,
        icon : String,
        title : String
    }
}
</script>

<style scoped>

</style>
