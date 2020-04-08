<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">编辑标签</span>
      <span class="rightIcon"/>
    </div>

    <div class="form-wrapper">
      <FormItem :value="currentTag.name" @update:value="update"
                field-name="标签名" placeholder="请输入标签名"/>
    </div>

    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import FormItem from '@/components/Money/FormItem.vue';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button, FormItem}
  })
  export default class EditLabel extends Vue {
    get currentTag() {
      return this.$store.state.currentTag;
    }

    created() {
      this.$store.commit('fetchTags'); // 防止刷新后，数据丢失
      this.$store.commit('setCurrentTag', this.$route.params.id);

      if (!this.currentTag) {
        this.$router.replace('/404');
      }
    }

    update(name: string) {
      if (this.currentTag) {
        this.$store.commit('updateTag', {
          id: this.currentTag.id, name
        });
      }
    }

    remove() {
      if (this.currentTag) {
        this.$store.commit('removeTag', this.currentTag.id);
      }
    }

    goBack() {
      this.$router.back();
    }
  }
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > .title {

    }

    > .leftIcon {
      width: 18px;
      height: 18px;
    }

    > .rightIcon {
      width: 18px;
      height: 18px;
    }
  }

  .form-wrapper {
    background: white;
    margin-top: 8px;
  }

  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
</style>