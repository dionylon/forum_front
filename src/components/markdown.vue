<template>
  <div v-html="value"></div>
</template>
<script>
export default {
  props: {
    source: String
  },
  data() {
    return {
      value: ""
    };
  },
  created() {
    let MarkdownIt = require("markdown-it");
    let md = new MarkdownIt();
    this.value = md.render(this.source);
  },
  methods: {}
};
</script>