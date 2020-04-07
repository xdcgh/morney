<template>
  <Layout class-prefix="layout">
    {{recordList}}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes @update:value="onUpdateNotes"/>
    <Tags :data-source.sync="tags" @update:value="onUpdateTags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import Tags from '@/components/Money/Tags.vue';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import {Component, Watch} from 'vue-property-decorator';

  const recordList: Record[] = JSON.parse(window.localStorage.getItem('recordList') || '[]');


  const version = window.localStorage.getItem('version') || 0;
  if (version === '0.0.1') {
    // 数据库升级 数据迁移
    recordList.forEach(record => {
      record.createdAt = new Date(2020, 0, 1);
    });

    window.localStorage.setItem('recordList', JSON.stringify(recordList));
  }

  window.localStorage.setItem('version', '0.0.2');

  type Record = {
    tags: string[];
    notes: string;
    type: stiring;
    amount: number;
    createdAt?: Date;
  }

  @Component({
      components: {Tags, Notes, Types, NumberPad}
    }
  )
  export default class Money extends Vue {
    tags = ['衣', '食', '住', '行'];

    record: Record = {tags: [], notes: '', type: '-', amount: 10};

    onUpdateTags(value: string[]) {
      this.record.tags = value;
    }

    onUpdateNotes(value: string) {
      this.record.notes = value;
    }

    saveRecord() {
      const record2 = JSON.parse(JSON.stringify(this.record));
      record2.createdAt = new Date();
      this.recordList.push(record2);
    }

    @Watch('recordList')
    onRecordListChange() {
      window.localStorage.setItem('recordList', JSON.stringify(this.recordList));
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>