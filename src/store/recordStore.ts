const localStorageKeyName = 'recordListModel';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecords() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.recordList;
  },
  // saveRecord() {
  //   return window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
  // },
  // createRecord(record: RecordItem) {
  //   const record2 = clone(record);
  //   record2.createdAt = new Date();
  //   this.recordList?.push(record2);
  //   recordStore.saveRecord();
  // },
};

recordStore.fetchRecords();

export default recordStore;