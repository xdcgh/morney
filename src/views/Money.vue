<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :data-source="recordTypeList" :value.sync="record.type"/>
    <div class="note-wrapper">
      <FormItem field-name="备注" placeholder="请在这里输入备注"
                :value.sync="record.notes"/>
    </div>
    <Tags @update:value="record.tags = $event"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import {Component} from 'vue-property-decorator';
  import recordTypeList from '@/constants/recordTypeList';
  import Tabs from '@/components/Tabs.vue';

  @Component({
      components: {Tabs, Tags, FormItem, NumberPad}
    }
  )
  export default class Money extends Vue {
    recordTypeList = recordTypeList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 10};

    get recordList() {
      return this.$store.state.recordList;
    }

    created() {
      this.$store.commit('fetchRecords');
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      if (!this.record.tags || this.record.tags.length === 0) {
        return window.alert('请至少选择一个标签');
      }

      this.$store.commit('createRecord', this.record);

      this.record.notes = '';
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }

  .note-wrapper {
    padding: 12px 0;
  }
</style>