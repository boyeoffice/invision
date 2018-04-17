<template lang="html">
  <tr style="cursor: pointer" @click="editData">
    <td>{{data.first_name}} {{data.last_name}}</td>
    <td>{{data.email}}</td>
    <td>{{data.student}}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    editData(){
      this.$router.push('/staff/member/' + this.data.id)
    }
  }
}
</script>

<style lang="css">
</style>
