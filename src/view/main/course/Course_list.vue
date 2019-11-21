<template>
  <div>
    <Card :bordered="false">
      <p slot="title">教程管理</p>
      <Row>
        <Col span="18">
          <Col span="6" style="display: flex;">
            <span style="width: 60px;padding-top: 5px;margin-left: 10px">标题：</span>
            <Input v-model="title" placeholder="请输入标题"></Input>
          </Col>
          <Col span="4" style="display: flex;">
            <Button type="primary"  icon="ios-search" @click="search">搜索</Button>
          </Col>
        </Col>
        <Col span="6" style="display: flex;justify-content: flex-end;">
<!--          <Button type="primary"  icon="ios-add" :to="{name:'course_add'}">新增教程</Button>-->
        </Col>
      </Row>
      <Row>
        <Col span="24" style="margin-top: 15px;">
          <Table border  :columns="columns":data="data">
            <template slot-scope="{ row, index }" slot="id">
              <span>{{index+1}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="title">
              <span>{{row.title}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="info">
              <span style=" display: block;  overflow: hidden ;   text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 3;">{{row.info}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="is_active">
              {{row.is_active==true?'更新中...':'已完结'}}
            </template>
            <template slot-scope="{ row, index }" slot="offline">
              <span><Icon type="md-checkmark-circle" style="color: #00bb00" :size="24" v-if="row.offline ==true"/><Icon  :size="24" type="md-close-circle"style="color: red" v-else/>{{row.offline ==true?'上线':'已下线'}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="add_time">
              <span>{{row.add_time}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="user">
              <span>{{row.user.username}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary"size="small" @click="courses_add(row.id,row.title)"><Icon type="ios-eye-outline":size="18" />查看</Button>
              <Button type="primary"size="small" class="text-right" @click="update(row.id)"><Icon type="md-create" :size="18"/>修改</Button>
            </template>
          </Table>
          <Page :total="count" ref="currents" :page-size="pageSize" show-elevator show-total @on-change="page"  />
        </Col>
      </Row>
    </Card>
  </div>
</template>
<style>
  .text-right{
    margin-left: 15px;
  }
</style>
<script>
  import {getCourseList,getMeCourseList,setCourseList,serachCourse} from '@/api/course'
  import { getToken } from '@/libs/util'
  import { hasOneOf } from '@/libs/tools'
  import axios from '@/libs/api.request'
  export default {
    data(){
      return{
        title: '',
        count:0,
        columns:[

          {
            title: '序号',
            slot: 'id',
          },
          {
            title: '课程名字',
            slot: 'title'
          },
          {
            title: '缩略图',
            slot:'info',
            tooltip:true,
            width:350,
            align:'center'
          },
          {
            title: '状态',
            slot:'offline'
          },
          {
            title: '更新状态',
            slot:'is_active'
          },
          {
          title:'作者',
            slot:'user'
          },
          {
            title:'创建时间',
            slot:'add_time'
          },
          {
            title:'操作',
            slot:'action'
          }
        ],
        data:[],
        pageSize:10,
      }
    },
    created(){
      if(this.viewAccessAll) {
        getMeCourseList(getToken('token')).then(res => {
          if (res.status == 200) {
            this.data = res.data.results
            this.count = res.data.count
          }
        })
      }
      if(this.viewAccessSuper){
        getCourseList(getToken('token')).then(res => {
          if (res.status == 200) {
            this.data = res.data.results
            this.count = res.data.count
          }
        })
      }
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
    methods:{
      page (index) {
        axios.request({
          url: '/api/courseList/?page='+index+'&title='+this.title,
          headers: {
            'Authorization':'JWT '+getToken('token')
          },
          method: 'get'
        }).then(res=>{
          this.data=res.data.results

        })
      },
      update(id){
        this.$router.push({
          name:'course_update',
          params:{
            id:id
          }
        })
      },
      courses_add(id,title){
        this.$router.push({
          name:'tutorial',
          params:{
            id:id,
            title:title
          }
        })
      },
      search(){
        serachCourse(this.title,getToken('token')).then(res=>{
          if(res.status == 200){
            this.$refs.currents.currentPage=1
            this.data = res.data.results
            this.count = res.data.count
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
