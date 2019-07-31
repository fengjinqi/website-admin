<template>
  <Card shadow>

    <div style="overflow: hidden">

      <Row>
        <Col span="3"> <div class="message-page-con message-category-con"style="width: 100%">
          <Menu width="auto" active-name="unread" @on-select="handleSelect">
            <MenuItem name="unread">
              <span class="category-title">未读消息</span><Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
            </MenuItem>
            <MenuItem name="readed">
              <span class="category-title">已读消息</span><Badge style="margin-left: 10px" class-name="gray-dadge" :count="messageReadedCount"></Badge>
            </MenuItem>
          </Menu>
        </div></Col>
        <Col span="21"><div class="message-page-con message-list-con"style="width: 100%">
          <Spin fix v-if="listLoading" size="large"></Spin>
          <Menu
            width="100%"
            active-name=""
            :class="titleClass"
            @on-select="handleView"

          >
            <MenuItem v-for="item in messageList" :name="item.id" :key="`msg_${item.id}`"style="width: 100%">
              <div>
                <p class="msg-title"style="overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;">{{ item.message }}</p>
                <Badge status="default" :text="item.add_time" />
                <Button
                  style="float: right;margin-right: 20px;"
                  :style="{ display: item.loading ? 'inline-block !important' : '' }"
                  :loading="item.loading"
                  size="small"
                  :icon="currentMessageType === 'readed' ? 'md-trash' : 'md-redo'"
                  :title="currentMessageType === 'readed' ? '删除' : '已读'"
                  type="text"
                  v-show="currentMessageType !== 'unread'"
                  @click.native.stop="removeMsg(item.id)"></Button>
                <Button  style="float: right;margin-right: 20px;" icon="ios-settings"   @click.native.stop="setMsg(item.id)" v-show="currentMessageType == 'unread'">设置已读</Button>
              </div>
            </MenuItem>
          </Menu>
          <Page :total="count" style="margin: 5px 0" v-show="currentMessageType == 'unread'" v-if="count>1" show-elevator show-total @on-change="page"  />
          <Page :total="count1" style="margin: 5px 0" v-show="currentMessageType != 'unread'" show-elevator show-total @on-change="page1"  />
        </div></Col>
      </Row>

  <!--    <div class="message-page-con message-view-con">
        <Spin fix v-if="contentLoading" size="large"></Spin>
        <div class="message-view-header">
          <h2 class="message-view-title">{{ showingMsgItem.message }}</h2>
          <time class="message-view-time">{{ showingMsgItem.create_time }}</time>
        </div>
        <div v-html="messageContent"></div>
      </div>-->
    </div>
  </Card>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { setContentByMsgId,  removeMsgId} from '@/api/user'
import axios from '@/libs/api.request'
import { getToken } from '@/libs/util'
const listDic = {
  unread: 'messageUnreadList',
  readed: 'messageReadedList',
  trash: 'messageTrashList'
}
export default {
  name: 'message_page',
  data () {
    return {
      listLoading: true,
      contentLoading: false,
      currentMessageType: 'unread',
      messageContent: '',
      showingMsgItem: {},
      count:0,
      count1:0
    }
  },
  computed: {
    ...mapState({
      messageUnreadList: state => state.user.messageUnreadList,
      messageReadedList: state => state.user.messageReadedList,
      messageTrashList: state => state.user.messageTrashList,
      messageList () {
        this.count = this.messageUnreadCount
        this.count1 = this.messageReadedCount
        return this[listDic[this.currentMessageType]]
      },
      titleClass () {
        return {
          'not-unread-list': this.currentMessageType !== 'unread'
        }
      }
    }),
    ...mapGetters([
      'messageUnreadCount',
      'messageReadedCount',
      'messageTrashCount'
    ])
  },
  methods: {
    ...mapMutations([
      //
    ]),
    ...mapActions([
      'getContentByMsgId',
      'getMessageList',
      'getMessage',
      'hasRead',
      'removeReaded',
      'restoreTrash'
    ]),
    stopLoading (name) {
      this[name] = false
    },
    handleSelect (name) {
      this.currentMessageType = name
    },
    handleView (msg_id) {
      this.contentLoading = true
      this.getContentByMsgId({ msg_id }).then(content => {
        this.messageContent = content
        const item = this.messageList.find(item => item.msg_id === msg_id)
        if (item) this.showingMsgItem = item
        if (this.currentMessageType === 'unread') this.hasRead({ msg_id })
        this.stopLoading('contentLoading')
      }).catch(() => {
        this.stopLoading('contentLoading')
      })
    },
    removeMsg (id) {
      removeMsgId(id,getToken('token')).then(res=>{
        this.$store.state.user.messageReadedList.map((item,index)=>{
          if (item.id == id){
            this.$store.state.user.messageReadedList.splice(index,1)
          }
        })
      })
    },
    setMsg(item){
      let form = new FormData()
      form.append('active',1)
      let _this = this
      setContentByMsgId(item,form,getToken('token')).then(res=>{
        window.location.reload()
      })
    },
    page(index){
      let url = this.currentMessageType=='unread'?"/api/UserMessages/?page="+index+"&type=unread":"/api/UserMessages/?page="+index+"&type=read"
      axios.request({
        url: url,
        headers: {
          'Authorization':'JWT '+getToken('token')
        },
        method: 'get'
      }).then(res=>{
        this.$store.state.user.messageUnreadList = res.data.results

      })
    },
    page1(index){
      let url = this.currentMessageType=='unread'?"/api/UserMessages/?page="+index+"&type=unread":"/api/UserMessages/?page="+index+"&type=read"
      axios.request({
        url: url,
        headers: {
          'Authorization':'JWT '+getToken('token')
        },
        method: 'get'
      }).then(res=>{
         this.$store.state.user.messageReadedList = res.data.results

      })
    }
  },
  mounted () {
    this.listLoading = true
    // 请求获取消息列表
    console.log(this.$store.state.user)
    this.getMessageList().then(() => this.stopLoading('listLoading')).catch(() => this.stopLoading('listLoading'))
    this.getMessage().then(() => this.stopLoading('listLoading')).catch(() => this.stopLoading('listLoading'))
  }
}
</script>

<style lang="less">
.message-page{
  &-con{
    height: ~"calc(100vh - 176px)";
    display: inline-block;
    vertical-align: top;
    position: relative;
    &.message-category-con{
      border-right: 1px solid #e6e6e6;
      width: 200px;
    }
    &.message-list-con{
      //border-right: 1px solid #e6e6e6;
      /*width: 230px;*/
    }
    &.message-view-con{
      position: absolute;
      left: 446px;
      top: 16px;
      right: 16px;
      bottom: 16px;
      overflow: auto;
      padding: 12px 20px 0;
      .message-view-header{
        margin-bottom: 20px;
        .message-view-title{
          display: inline-block;
        }
        .message-view-time{
          margin-left: 20px;
        }
      }
    }
    .category-title{
      display: inline-block;
      width: 65px;
    }
    .gray-dadge{
      background: gainsboro;
    }
    .not-unread-list{
      .msg-title{
        color: rgb(170, 169, 169);
      }
      .ivu-menu-item{
        .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
          display: none;
        }
        &:hover{
          .ivu-btn.ivu-btn-text.ivu-btn-small.ivu-btn-icon-only{
            display: inline-block;
          }
        }
      }
    }
  }
}

.ivu-menu-vertical.ivu-menu-light:after {
content: '';
display: block;
width: 1px;
height: 0%;
background: #dcdee2;
position: absolute;
top: 0;
bottom: 0;
right: 0;
z-index: 1;
}
.message-page-con{
  height: 100%;
}
</style>
