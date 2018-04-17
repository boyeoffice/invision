<template lang="html">
  <div v-bind:class="open" style="position: relative; display: inline-block">
    <input type="text" name="" :value="value" class="form-control input-sm"
    style="width: 60px; border-radius: 4px;"
    @click="dropdown"
    @keydown.enter="enter"
    @keydown.down="down"
    @keydown.up="up">
    <span class="custom-arrow" @click="dropdown"></span>
    <ul v-bind:class="classes" style="min-width: 60px">
      <li v-for="(option, index) in options"
      v-bind:class="(index === current) && 'active'"
      @click="selected(index)">
      <a href="javascript:void(0)">{{option}}</a>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: ''
    },
    classes: {
      type: String,
      default: 'dropdown-menu'
    },
    options: {
      type: Array
    }
  },
  data(){
    return{
      toggleOnOff: false,
      current: 0
    }
  },
  computed: {
    open(){
      return {'open' : this.toggleOnOff}
    }
  },
  methods: {

    dropdown(){
      this.toggleOnOff = !this.toggleOnOff
    },

    enter(){
      this.$emit('input', this.options[this.current])
      this.dropdown()
    },
    up(){
      if(this.current > 0){
        this.current--
      }
    },
    down(){
      if (this.current < this.options.length - 1) {
        this.current++
      }
    },
    selected(index){
      this.$emit('input', this.options[index])
      this.current = index
      this.dropdown()
    }
  }
}
</script>

<style lang="css">
.custom-arrow::before {
    position: relative;
    right: 0;
    top: 65%;
    color: #999;
    margin-top: 4px;
    border-style: solid;
    border-width: 5px 5px 0;
    border-color: #999 transparent transparent;
    content: "";
}
.custom-arrow {
    position: absolute;
    width: 40px;
    height: 38px;
    right: -5px;
    top: -6px;
    padding: 4px 8px;
    text-align: center;
    -webkit-transition: -webkit-transform .2s ease;
    transition: -webkit-transform .2s ease;
    transition: transform .2s ease;
    transition: transform .2s ease, -webkit-transform .2s ease;
    cursor: pointer;
}
</style>
