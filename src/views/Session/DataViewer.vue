<template lang="html">
  <tr :class="{'is-open': data.is_open}"  @click="editData" style="cursor: pointer;">
    <td>{{data.schools[0]}}</td>
    <td>{{data.name}}</td>
    <td>{{data.items}}</td>
    <td>{{data.orders}}</td>
    <td v-if="data.is_open == true">Y</td>
    <td  v-else>N</td>
    <td>{{data.start_on}}</td>
    <td>{{data.end_on}}</td>
  </tr>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    editData(){
      this.$router.push('/staff/lunch/sessions/' + this.data.id)
    }
  }
}
</script>
