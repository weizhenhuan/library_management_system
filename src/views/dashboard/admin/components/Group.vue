<template>
  <el-row :gutter="40"
          class="panel-group">
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Registered
          </div>
          <div class="card-panel-num">
            {{dateList[0]}}
            <span style="font-size:5px">readers</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Borrowed
          </div>
          <div class="card-panel-num">
            {{dateList[1]}}
            <span style="font-size:5px">books</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Lost
          </div>
          <div class="card-panel-num">
            {{dateList[2]}}
            <span style="font-size:5px">books</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Damage
          </div>
          <div class="card-panel-num">
            {{dateList[3]}}
            <span style="font-size:5px">books</span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Unpaid
          </div>
          <div class="card-panel-num">
            {{dateList[4]}}￥
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="12"
            :sm="12"
            :lg="4"
            class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="admin" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Fine
          </div>
          <div class="card-panel-num">
            {{dateList[5]}}￥
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  components: {

  },
  props: {
    width: {
      type: String,
      default: "800px"
    },
    height: {
      type: String,
      default: "300px"
    },
    dateList: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.panel-group {
  padding-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 25px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 40px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
