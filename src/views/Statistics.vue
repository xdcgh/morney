<template>
  <Layout>
    <Tabs class-prefix="type"
          :data-source="recordTypeList" :value.sync="type"/>

    <ol v-if="groupedList.length > 0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>￥{{group.total}}</span>
        </h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record">
            <span>{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>

    <div v-else class="noResult">
      目前没有相关数据
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';

  @Component({
    components: {Tabs}
  })
  export default class Statistics extends Vue {
    type = '-';
    recordTypeList = recordTypeList;

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupedList() {
      // [
      //   {title, items},  // 今天
      //   {title, items}   // 昨天
      // ]
      const {recordList} = this;

      if (recordList.length === 0) {
        return [];
      }

      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort(
          (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
        );

      type Result = {
        title: string;
        items: RecordItem[];
        total?: number;
      }[]

      const result: Result = [
        {
          title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'),
          items: [newList[0]]
        }
      ];

      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];

        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({
            title: dayjs(current.createdAt).format('YYYY-MM-DD'),
            items: [current]
          });
        }
      }

      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });

      return result;
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' : tags.map(t => t.name).join('，');
    }

    beautify(string: string) {
      const now = dayjs();
      const day = dayjs(string);

      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;

  }

  .record {
    @extend %item;

    background: white;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999999;
  }

  .noResult {
    padding: 16px;
    text-align: center;
  }
</style>