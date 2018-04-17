<template lang="html">
  <tr style="cursor: pointer;" @click="editData">
    <td>{{data.first_name}}  {{data.last_name}}</td>
    <td>{{data.email}}</td>
    <td><span v-if="data.is_superuser === true">Administrator,</span> <span v-if="data.is_staff">Staff</span> </td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    editData(){
      this.$router.push('/staff/staff/' + this.data.id)
    }
  }
}
</script>

<style lang="css">
</style>
