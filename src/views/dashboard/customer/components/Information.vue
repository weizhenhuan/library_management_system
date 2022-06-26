<template>
  <el-card class="information-container">
    <div class="container"
         v-if="reserveBooks.length">
      <div class="container-head">
        <span>Reserving Books</span>
      </div>
      <div v-for="book in reserveBooks"
           class="reserve-item clearfix"
           :key="book.id">
        <div class="reserve-info">
          《{{book.bookName}}》has{{parseM2Time(book.leftTime)}}left
        </div>

        <el-button type="danger"
                   class="btn"
                   @click="()=>{bookState.showReserve=true;bookState.currBook=book}">
          <span>cancel</span>
        </el-button>
      </div>
    </div>

    <div class="container">
      <div class="container-head">
        <span>Borrowing Books</span>
      </div>
      <div class="process-wrapper"
           v-if="borrowBooks.length">
        <div class="progress-item text-center clearfix"
             v-for="book in borrowBooks"
             :key="book.id">
          <div class="book-info">
            <span>{{book.bookName}}</span>
            <div class="start">{{parseTime(book.start,'{y}-{m}-{d}')}}</div>
            <el-progress :percentage="percent(book.start,book.end)"
                         :status="book.overdue?'warning':''"
                         :color="book.overdue?'#e22c29':'#409eff'"
                         :stroke-width="24"
                         :text-inside="true"
                         :format="(percentage) => (percentage>=100 ? `${book.amount}￥ arrears` : `${book.left} days`)"
                         class="progress" />
            <div class="end">{{parseTime(book.end,'{y}-{m}-{d}')}}</div>
          </div>
          <div class="book-btn">
            <el-button v-if="!book.overdue"
                       type="primary"
                       @click="{bookState.showRenew=true ;bookState.currBook=book}">renew</el-button>
            <el-button type="warning"
                       v-else
                       @click="{bookState.showReturn=true ;bookState.currBook=book}">pay</el-button>
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
    </div>

    <div class="container">
      <div class="container-head">
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
          <div v-else-if="activity.action==='pay'">
            <span>
              pay《{{ activity.bookName }}》fine
            </span>
          </div>
          <div v-else>
            <span>
              reserve《{{ activity.bookName }}》
            </span>
          </div>
        </el-timeline-item>
      </el-timeline>
      <div v-else
           class="prompt-wrapper">
        You haven't do anything yet.
      </div>
    </div>
  </el-card>
  <Return v-model:showReturn="bookState.showReturn"
          v-if="bookState.showReturn"
          :book='bookState.currBook' />
  <Borrow v-model:showBorrow="bookState.showRenew"
          type="renew"
          :book='bookState.currBook' />
  <Reserve v-model:showReserve="bookState.showReserve"
           type="cancel"
           :book='bookState.currBook' />
</template>

<script>
import { reactive } from "@vue/reactivity"
import { parseTime, formatTime } from "@/utils/index.js"
import Return from "@/components/Return"
import Borrow from "@/components/Borrow"
import Reserve from "@/components/Reserve"
import { getBorrowing, dynamic, getReserving } from "@/api/user/info"
import { useStore } from "vuex"

export default {
  components: { Return, Borrow, Reserve },
  setup() {
    const bookState = reactive({
      showReturn: false,
      showRenew: false,
      showReserve: false,
      currBook: {}
    })
    const store = useStore()

    const reserveBooks = reactive([])
    const borrowBooks = reactive([])
    const dynamics = reactive([])

    function parseM2Time(lefttime) {
      var lefth = Math.floor(lefttime / (60 * 60) % 24)
      var leftm = Math.floor(lefttime / (60) % 60)
      return " " + lefth + " hours " + leftm + " minutes "
    }

    getReserving(store.getters.token).then(res => {
      res.data.forEach((item) => {
        item.leftTime *= 60
        reserveBooks.push(item)
      })
    })
    getBorrowing(store.getters.token).then((res) => {
      res.data.forEach((item) => {
        item.start = new Date(item.start)
        item.end = new Date(item.end)
        item.left = Math.round((item.end - Date.now()) / (1000 * 60 * 60 * 24))
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
      } else if (action === "pay") {
        return <svg-icon icon-class='buy' />
      } else if (action === "renew") {
        return <svg-icon icon-class='renew' />
      } else if (action === "return") {
        return <svg-icon icon-class='return' />
      } else if (action === "reserve") {
        return <svg-icon icon-class='reserve' />
      }
    }

    return { borrowBooks,
      percent,
      parseTime,
      formatTime,
      dynamics,
      icon,
      bookState,
      reserveBooks,
      parseM2Time }
  }
}
</script>

<style scoped lang='less'>
.information-container {
  margin: 30px 20px 0 0;
  .reserve-item {
    padding: 5px 50px 5px 50px;
    .reserve-info {
      position: relative;
      width: 80%;
      float: left;
      height: 40px;
      line-height: 40px;
    }
    .btn {
      float: right;
      width: 10%;
      position: relative;
      bottom: -5px;
      .el-button {
        width: 45%;
      }
    }
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
      bottom: -25px;
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
  .container {
    margin-bottom: 30px;
    .container-head {
      font-weight: bold;
      font-size: 20px;
      border-bottom: 1px solid #dfe6ec;
    }
  }
  .timeline {
    margin-top: 20px;
  }
}
</style>

