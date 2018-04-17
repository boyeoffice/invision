<template lang="html">
  <tr @click="editData" style="cursor: pointer">
    <td>{{data.name}}</td>
    <td>{{data.school}}</td>
    <td>{{data.grade}}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    editData(){
      this.$router.push('/staff/teacher/' + this.data.id)
    }
  }
}
</script>
