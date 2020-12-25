<template>
  <div class="tag-input">
    <IonInput
      type="text"
      placeholder="Enter a Tag"
      class="input"
      :disabled="disabled"
      @keydown.enter="addTag"
      @keydown.space="addTag"
      @keydown.,="addTag"
      @keydown.delete="removeLastTag"
    />
    <div v-for="(tag, index) in tags" :key="index" class="tag-input__tag ">
      {{ tag }}
      <span @click="removeTag(index)">x</span>
    </div>
  </div>
</template>
<script>
import { IonInput } from "@ionic/vue";
export default {
  components: { IonInput },
  data() {
    return {
      tags: [],
      disabled: false,
    };
  },
  methods: {
    addTag(event) {
      console.log("started");
      event.preventDefault();
      const val = event.target.value.trim();
      if (val.length > 0) {
        this.tags.push(val);
        if (this.tags.length == 3) {
          this.disabled = true;
        }

        event.target.value = "";
        this.$emit("added", this.tags);
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
      this.disabled = false;
    },
    removeLastTag(event) {
      if (event.target.value.length === 0) {
        this.removeTag(this.tags.length - 1);
        this.$emit("added", this.tags);
      }
    },
  },
};
</script>
<style scoped>
input {
  width: 232px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  outline: none;
  border: none;
  background: #eef0f2;
  color: #00276f;
  font-size: 14px;
  font-weight: bold;
}

.tag-input__tag {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  height: 30px;
  color: #00276f;
  float: left;
  margin-right: 10px;
  background-color: #eee;
  margin-top: 10px;
  line-height: 30px;
  padding: 0 5px;
  border-radius: 3px;
}

.tag-input__tag > span {
  cursor: pointer;
  opacity: 0.75;
}
.input {
  width: 232px !important;
  height: 36px !important;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25) !important;
  outline: none !important;
  border: none !important;
  background: #eef0f2 !important;
  color: #00276f !important;
  font-size: 14px !important;
  font-weight: bold !important;
}

.tag-input__text {
  border: none;
  outline: none;
  font-size: 0.9em;
  line-height: 50px;
  background: none;
}
</style>
