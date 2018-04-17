<template lang="html">
  <tr style="cursor: pointer" @click="editData">
    <td>{{data.name}}</td>
    <td>{{data.parent}}</td>
    <td>{{data.school}}</td>
    <td>{{data.grade}} / {{data.teacher}}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    editData(){
      this.$router.push('/staff/student/' + this.data.id)
    }
  }
}
</script>

<style lang="css">
</style>
