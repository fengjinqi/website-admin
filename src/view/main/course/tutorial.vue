<template>
  <div style="height: calc(100%)">
    <Card :bordered="false" v-if="error_404"style="height: calc(100%)">
      <p>{{error_404}}</p>
    </Card>
    <Card :bordered="false" v-else>
      <Row>
        <Col span="18">
          <p style="font-weight: 600">{{title}}</p>
        </Col>
        <Col span="6"><p style="text-align: right;font-weight: 600;cursor: pointer;" @click="add(id)"><Icon type="md-add-circle" :size="18" />添加内容</p></Col>
      </Row>
      <Divider />
      <Row>
        <Col span="24" style="margin-top: 15px;">
          <Table border  :columns="columns":data="historyData">
            <template slot-scope="{ row, index }" slot="id">
              <span>{{row.id}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="titles">
              <span>{{row.titles}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="add_time">
              <span>{{row.add_time}}</span>
            </template>
            <template slot-scope="{ row, index }" slot="action">
              <Button type="primary"size="small" @click="tutorialDetail(row.id)"><Icon type="ios-eye-outline":size="18" />查看</Button>
              <Button type="primary"size="small" class="text-right" @click="tutorialupdate(row.id)"><Icon type="md-create" :size="18"/>修改</Button>
            </template>
          </Table>
          <Page :total="count" ref="currents" :page-size="10" show-elevator show-total @on-change="changepage"  />
        </Col>
      </Row>
    </Card>
  </div>
</template>
<style scoped>
  .text-right{
    margin-left: 15px;
  }
</style>
<script>
  import { getToken, base } from '@/libs/util'
  import {getCourseDetaile } from '@/api/course'

  export default {
    data () {
      return {
        error_404:'',
        title:'',
        id:'',
        count:0,
        pageSize:10,
        columns:[

          {
            title: '序号',
            slot: 'id',
          },
          {
            title: '课程名字',
            slot: 'titles'
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
        ajaxHistoryData:[],
        historyData:[]
      }
    },
    created(){
      getCourseDetaile(this.$route.params.id,getToken('token')).then(res=>{
        this.title = res.data.title
        this.data=res.data.courselist_set
        this.count = res.data.courselist_set.length
        this.id = res.data.id
        this.handleListApproveHistory();
      }).catch(err=>{
        //this.error_404=err
      })

    },
    methods: {
      // 获取历史记录信息
      handleListApproveHistory () {
        // 保存取到的所有数据
        this.ajaxHistoryData = this.data
        this.count = this.data.length;
        // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
        if (this.data.length < this.pageSize) {
          this.historyData = this.ajaxHistoryData;
        } else {
          this.historyData = this.ajaxHistoryData.slice(0, this.pageSize);
        }
      },
      changepage(index){
        var _start = ( index - 1 ) * this.pageSize;
        var _end = index * this.pageSize;
        this.historyData = this.ajaxHistoryData.slice(_start,_end);
      },
      tutorialDetail(id){
        this.$store.state.course.id=id
        this.$router.push({
          name:'tutorials_detail',
          params:{
            id:id
          }
        })
      },
      add(id){
        // this.$store.commit({
        //   type:'setId',
        //   id:id
        // })
        this.$router.push({name:'tutorialadd',params:{id:id}})
      },
      tutorialupdate(id){
        this.$router.push({
          name:'tutorials_detail',
          params:{
            id:id,
            is_update:true
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
