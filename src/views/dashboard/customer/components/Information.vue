<template>
  <el-card class="information-container">
    <div class="borrow-head">
      <span>Borrowing Books</span>
    </div>
    <div class="process-wrapper"
         v-if="borrowBooks.length">
      <div class="progress-item text-center clearfix"
           v-for="(book,index) in borrowBooks"
           :key="index">
        <div class="book-info">
          <span>{{book.bookName}}</span>
          <div class="start">{{parseTime(book.start,'{y}-{m}-{d}')}}</div>
          <el-progress :percentage="percent(book.start,book.end)"
                       :status="book.overdue?'warning':''"
                       :color="book.overdue?'#e22c29':'#409eff'"
                       :stroke-width="24"
                       :text-inside="true"
                       :format="(percentage) => (percentage>=100 ? '逾期！请按时还书' : `${percentage}%`)"
                       class="progress" />
          <div class="end">{{parseTime(book.end,'{y}-{m}-{d}')}}</div>
        </div>
        <div class="book-btn">
          <el-button type="primary"
                     :disabled="book.overdue"
                     @click="{bookState.showRenew=true ;bookState.currBook=book}">renew</el-button>
          <el-button type="success"
                     @click="{bookState.showReturn=true ;bookState.currBook=book}">return</el-button>
        </div>
      </div>
    </div>
    <div v-else
         class="prompt-wrapper">
      You don't have any books you're borrowing.
      <router-link to='/booklist'
                   class="link">
        click here to borrow
      </router-link>
    </div>

    <div class="timeline-head">
      <span>Dynamic</span>
    </div>
    <el-timeline class="timeline"
                 v-if="dynamics.length">
      <el-timeline-item v-for="(activity, index) in dynamics"
                        :key="index"
                        :timestamp="parseTime(activity.time)"
                        :icon="icon(activity.action)"
                        placement='top'>
        <div v-if="activity.action==='borrow'">
          <span>
            borrow《{{ activity.bookName }}》{{activity.days}}days
          </span>
        </div>
        <div v-else-if="activity.action==='renew'">
          <span>
            renew《{{ activity.bookName }}》{{activity.days}}days
          </span>
        </div>
        <div v-else-if="activity.action==='return'">
          <span>
            return《{{ activity.bookName }}》
          </span>
        </div>
        <div v-else-if="activity.action==='buy'">
          <span>
            buy《{{ activity.bookName }}》
          </span>
        </div>
      </el-timeline-item>
    </el-timeline>
    <div v-else
         class="prompt-wrapper">
      You haven't do anything yet.
    </div>
  </el-card>
  <Return v-model:showReturn="bookState.showReturn"
          :book='bookState.currBook' />
  <Borrow v-model:showBorrow="bookState.showRenew"
          type="renew"
          :book='bookState.currBook' />
</template>

<script>
import { reactive } from "@vue/reactivity"
import { parseTime } from "@/utils/index.js"
import Return from "@/components/Return"
import Borrow from "@/components/Borrow"
import { borrowing, dynamic } from "@/api/user"
import { useStore } from "vuex"

export default {
  components: { Return, Borrow },
  setup() {
    const bookState = reactive({
      showReturn: false,
      showRenew: false,
      currBook: {}
    })
    const store = useStore()

    const borrowBooks = reactive([])

    const dynamics = reactive([])
    borrowing(store.getters.token).then((res) => {
      res.data.forEach((item) => {
        item.start = new Date(item.start)
        item.end = new Date(item.end)
        borrowBooks.push(item)
      })
    })
    dynamic(store.getters.token).then((res) => {
      res.data.forEach((item) => {
        item.time = new Date(item.time)
        dynamics.push(item)
      })
    })

    function percent(start, end) {
      const now = new Date()
      const res = Math.round(((now - start) / (end - start)) * 100)
      return res > 100 ? 100 : res
    }

    function icon(action) {
      if (action === "borrow") {
        return <svg-icon icon-class='borrow' />
      } else if (action === "buy") {
        return <svg-icon icon-class='buy' />
      } else if (action === "renew") {
        return <svg-icon icon-class='renew' />
      } else if (action === "return") {
        return <svg-icon icon-class='return' />
      }
    }

    return { borrowBooks, percent, parseTime, dynamics, icon, bookState }
  }
}
</script>

<style scoped lang='less'>
.information-container {
  margin: 30px 20px 0 0;
  .borrow-head {
    font-weight: bold;
    font-size: 20px;
    border-bottom: 1px solid #dfe6ec;
  }
  .progress-item {
    .book-info {
      position: relative;
      width: 80%;
      float: left;
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
    .book-btn {
      float: right;
      width: 20%;
      position: relative;
      bottom: -20px;
      .el-button {
        width: 45%;
      }
    }
  }
  .prompt-wrapper {
    font-size: 17px;
    padding: 10px 0 0 15px;
    .link {
      display: block;
      color: #66ccff;
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

