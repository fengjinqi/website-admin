<template>
  <div>
    <Card :bordered="false">
      <p slot="title">帖子</p>
      <Row>
        <Col span="18">
          <Col span="6" style="display: flex;">
            <span style="width: 50px;padding-top: 5px">分类：</span>
            <Select v-model="selected" placeholder="请选择">
              <Option :value="item.id" v-for="(item,index) in select">{{item.name}}</Option>
            </Select>
          </Col>
          <Col span="6" style="display: flex;">
            <span style="width: 60px;padding-top: 5px;margin-left: 10px">标题：</span>
            <Input v-model="title" placeholder="请输入标题"></Input>
          </Col>
          <Col span="4" style="display: flex;">
            <Button type="primary"  icon="ios-search" @click="search">搜索</Button>
          </Col>
        </Col>
        <Col span="6" style="display: flex;justify-content: flex-end;">
          <Button type="primary"  icon="ios-add" :to="{name:'articleAdd'}">新增文章</Button>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="margin-top: 15px;">
          <Table border  :columns="columns" :data="data">
            <template slot-scope="{ row, index }" slot="id">
              <span>{{index+1}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="username">
              <span>{{row.authors.username}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="title">
            <span style="    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;">{{row.title}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="click_nums">
              <span>{{row.click_nums}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="category">
              <span>{{row.category.name}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="add_time">
              <span>{{row.add_time}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="category">
              <span>{{row.category.name}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="warning"size="small" @click="update(row.id,1)"v-if="row.hidden==false">关闭帖子</Button>
              <Button type="primary"size="small" @click="update(row.id,0)"v-else-if="row.hidden==true">开启帖子</Button>
              <Button type="error" class="text-right" size="small" @click="remove(row.id)" ><Icon type="ios-trash-outline"size="20" />删除</Button>
            </template>
          </Table>
          <Page :total="count" ref="currents" show-elevator :page-size="pageSize" show-total @on-change="page"  />
        </Col>
      </Row>
      <Modal
              v-model="modal1"
              title="删除帖子"
              @on-ok="ok"
              @on-cancel="cancel">
        <p>是否要删除此帖子?</p>
      </Modal>
      <Modal
              v-model="modal1"
              title="关闭帖子"
              @on-ok="ok"
              @on-cancel="cancel">
        <p>是否要删除此帖子?</p>
      </Modal>
    </Card>
  </div>
</template>
<style lang="less" scoped="">
  .text-right{
    margin-left: 15px;
  }
  .table-no-outerborder {
    border: none!important;
    .ivu-table:after {
      width: 0;
    }
    .ivu-table:before {
      height: 0;
    }
  }
  .span{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ccc;
    display: block;
  }

</style>
<script>
  import {getList,getListCategory,removeList,putList} from '@/api/forum'
  import {  getToken } from '@/libs/util'
  import axios from '@/libs/api.request'
  import { hasOneOf } from '@/libs/tools'
  export default {
    data () {
      return {
        select: [],
        selected:'',
        title: '',
        id:'',
        modal1:false,
        columns: [
          {
            title: '序号',
            slot: 'id',

          },
          {
            title: '作者',
            slot: 'username'
          },
          {
            title: '标题',
            slot: 'title'
          },
          {
            title: '阅读量',
            slot: 'click_nums'
          },
          {
            title: '分类',
            slot: 'category'
          },
          {
            title: '时间',
            slot: 'add_time'
          },
          {
            title: '操作',
            slot: 'action',

          }
        ],
        count:0,
        pageSize:10,
        data: [],
      }
    },
    created(){
      this.$Spin.show();
      getList(getToken('token')).then(res=>{
        if(res.status==200){
          this.data = res.data.results
          this.count = res.data.count
          this.$Spin.hide();
        }
      })
      getListCategory( getToken('token') ).then(res=>{
        this.select = res.data
      })
    },
    computed: {
      access () {
        return this.$store.state.user.access
      },
      viewAccessAll () {
        return hasOneOf(['is_staff'], this.access)
      },
      viewAccessSuper () {
        return hasOneOf(['is_superuser'], this.access)
      }
    },
    methods: {

      search(){
        this.$Spin.show();
        getList(getToken('token'),this.title,this.selected).then(res=>{
          if(res.status==200){
            this.$refs.currents.currentPage=1
            this.data = res.data.results
            this.count = res.data.count
            this.$Spin.hide();
          }
        })
      },
      page (index) {
        this.$Spin.show();
        axios.request({
          url: '/api/forum/?page='+index+'&title='+this.title+'&category='+this.selected,
          headers: {
            'Authorization':'JWT '+getToken('token')
          },
          method: 'get'
        }).then(res=>{
          if(res.status==200){
            this.data = res.data.results
            this.count = res.data.count
            this.$Spin.hide();
          }
        })
      },
      ok () {
        removeList(getToken('token'),this.id).then(res=>{
          this.$Message.info('删除成功');
          this.data.map((el,index)=>{
            if(el.id.indexOf(this.id)!=-1){
              this.data.splice(index,1)
              this.count = this.count-1
            }
          })
        })
      },
      cancel () {
        this.$Message.info('已取消');
      },
      remove(n){
        this.modal1 = true
        this.id = n
      },
      update(n,type){
        let form = new FormData()
        form.append('hidden',type)
        putList(getToken('token'),n,form).then(res=>{
          console.log(res)
        })
      }
    },

  }
</script>
