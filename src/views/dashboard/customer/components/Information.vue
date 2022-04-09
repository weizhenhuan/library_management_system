<template>
  <transition name="user-card"
              mode="out-in">
    <el-card class="information-container">
      <div class="borrow-head">
        <span>Borrowing Books</span>
      </div>
      <div class="progress-item text-center"
           v-for="(book,index) in borrowBooks"
           :key="index">
        <span>{{book.bookName}}</span>
        <div class="start">{{parseTime(book.start,'{y}-{m}-{d}')}}</div>
        <el-progress :percentage="percent(book.start,book.end)"
                     :status="book.overdue?'warning':''"
                     :stroke-width="24"
                     :text-inside="true"
                     :format="(percentage) => (percentage>=100 ? '逾期！请按时还书' : `${percentage}%`)"
                     class="progress" />
        <div class="end">{{parseTime(book.end,'{y}-{m}-{d}')}}</div>
      </div>

      <div class="timeline-head">
        <span>Dynamic</span>
      </div>
      <el-timeline class="timeline">
        <el-timeline-item v-for="(activity, index) in dynamics"
                          :key="index"
                          :timestamp="parseTime(activity.time)"
                          :icon="icon(activity.action)"
                          placement='top'>
          <div v-if="activity.action==='borrow'">
            <span>
              借阅《{{ activity.bookName }}》{{activity.days}}天
            </span>
          </div>
          <div v-else-if="activity.action==='renew'">
            <span>
              续借《{{ activity.bookName }}》{{activity.days}}天
            </span>
          </div>
          <div v-else-if="activity.action==='return'">
            <span>
              归还了《{{ activity.bookName }}》
            </span>
          </div>
          <div v-else-if="activity.action==='buy'">
            <span>
              购买了《{{ activity.bookName }}》
            </span>
          </div>

        </el-timeline-item>
      </el-timeline>

    </el-card>
  </transition>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { parseTime } from '@/utils/index.js'
//import { borrowing, dynamic } from '@/api/user'

export default {
  setup () {
    let borrowBooks = [
      {
        start: new Date('2022-3-2'),
        end: new Date('2022-4-10'),
        bookName: '算法从入门到入土',
        overdue: false,
        key: '123',
      },
      {
        start: new Date('2022-4-1'),
        end: new Date('2022-4-3'),
        bookName: '计网从入门到入土',
        overdue: true,
        key: '234',
      },
      {
        start: new Date('2022-4-1'),
        end: new Date('2022-4-9'),
        bookName: '前端从入门到入土',
        overdue: false,
        key: '23s4',
      },
      {
        start: new Date('2022-3-1'),
        end: new Date('2022-4-18'),
        bookName: '后端从入门到入土',
        overdue: false,
        key: '2z34',
      }
    ]

    let dynamics = reactive([
      {
        time: new Date('2022-4-3'),
        bookName: '前端从入门到入土',
        action: 'borrow',
        days: '10',
      },
      {
        time: new Date('2022-4-3'),
        bookName: '前端从入门到入土',
        action: 'renew',
        days: '10',
      },
      {
        time: new Date('2022-4-4'),
        bookName: '前端从入门到入土',
        action: 'return',

      },
      {
        time: new Date('2022-4-6'),
        bookName: '前端从入门到入土',
        action: 'buy',
      },
    ])

    function percent (start, end) {
      let now = new Date()
      let res = Math.round(((now - start) / (end - start)) * 100)
      return res > 100 ? 100 : res
    }

    function icon (action) {
      if (action == 'borrow')
        return <svg-icon icon-class='borrow' />
      else if (action == 'buy')
        return <svg-icon icon-class='buy' />
      else if (action == 'renew')
        return <svg-icon icon-class='renew' />
      else if (action == 'return')
        return <svg-icon icon-class='return' />
    }



    return { borrowBooks, percent, parseTime, dynamics, icon }
  }
}
</script>

<style scoped lang='less'>
.information-container {
  margin-top: 30px;
  .borrow-head {
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid #dfe6ec;
  }
  .progress-item {
    position: relative;
    span {
      line-height: 30px;
    }
    .start {
      position: absolute;
      width: 25%;
      bottom: 0;
      line-height: 24px;
    }
    .progress {
      width: 50%;
      margin: 0 auto;
    }
    .end {
      position: absolute;
      width: 25%;
      bottom: 0;
      right: 0;
      line-height: 24px;
    }
  }

  .timeline-head {
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid #dfe6ec;
    margin-top: 30px;
  }
  .timeline {
    margin-top: 20px;
  }
}
</style>

