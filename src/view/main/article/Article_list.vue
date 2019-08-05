<template>
  <div>
    <Card :bordered="false">
      <p slot="title">文章管理</p>
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
          <template slot-scope="{ row, index }" slot="article_comment_set">
            {{row.article_comment_set}}
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
            <Button type="primary"size="small" @click="update(row.id)"><Icon type="ios-eye-outline"size="20" />修改</Button>
            <Button type="error" class="text-right" size="small" @click="remove(row.id)"><Icon type="ios-trash-outline"size="20" />删除</Button>
          </template>
        </Table>
        <Page :total="count" ref="currents" show-elevator :page-size="pageSize" show-total @on-change="page"  />
       </Col>
      </Row>
      <Modal
        v-model="modal1"
        title="删除文章"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>是否要删除文章?</p>
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
  import {getList,megetList, setArticle, serachArticle,meserachArticle} from '@/api/article'
  import { setToken, getToken,getCookie } from '@/libs/util'
  import {mapActions} from 'vuex'
  import axios from '@/libs/api.request'
  import { hasOneOf } from '@/libs/tools'

  export default {
  data () {
    return {
      select: '',
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
          title: '评论量',
          slot: 'article_comment_set'
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
  mounted(){
    this.getCargortys()
  },
  created(){
    this.$forceUpdate()
    console.log(this.viewAccessSuper,this.viewAccessAll)
    this.$Spin.show();
    if(this.viewAccessSuper&&this.viewAccessAll){
      getList(getToken('token')).then((res)=>{
        this.$Spin.hide();
        this.count=res.data.count
        let item = res.data.results
        console.log(this.count)
        let n=[]
        this.data=[]
        for (let i=0;i<item.length;i++){
          n.push(item[i].article_comment_set.length);
          for(let j=0,len=item[i].article_comment_set.length;j<len;j++){
            let currentChildItem = item[i].article_comment_set[j];
            n[i] += currentChildItem.articlecommentreply_set.length;
          }
          this.data.push({
            'title':item[i].title,
            'add_time':item[i].add_time,
            'authors':item[i].authors,
            'category':item[i].category,
            'click_nums':item[i].click_nums,
            'id':item[i].id,
            'article_comment_set':n[i]
          })
        }
        console.log(this.$refs.currents)
      }).catch(err=>{
        console.log(err)
      })
    }else
    if(this.viewAccessAll){
      this.$Spin.show();
      megetList(getToken('token')).then((res)=>{
        this.$Spin.hide();
        this.count=res.data.count
        let item = res.data.results
        let n=[]
        this.data=[]
        for (let i=0;i<item.length;i++){
          n.push(item[i].article_comment_set.length);
          for(let j=0,len=item[i].article_comment_set.length;j<len;j++){
            let currentChildItem = item[i].article_comment_set[j];
            n[i] += currentChildItem.articlecommentreply_set.length;
          }
          this.data.push({
            'title':item[i].title,
            'add_time':item[i].add_time,
            'authors':item[i].authors,
            'category':item[i].category,
            'click_nums':item[i].click_nums,
            'id':item[i].id,
            'article_comment_set':n[i]
          })
        }
      }).catch(err=>{
        console.log(err)
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
  methods: {
    ...mapActions([
      'getCargorty'
    ]),
    getCargortys(){
      this.getCargorty().then(res=>{
        this.select = res.data
      }).catch(err=>{
      })
    },
    search(){
      if(this.viewAccessSuper&&this.viewAccessAll){
        this.$Spin.show();
        serachArticle(this.selected?this.selected:'',this.title,getToken('token')).then(res=>{
          this.$Spin.hide();
          this.$refs.currents.currentPage=1
          this.count=res.data.count
          this.data = []
          let item = res.data.results
          let n=[]
          for (let i=0;i<item.length;i++){
            n.push(item[i].article_comment_set.length);
            for(let j=0,len=item[i].article_comment_set.length;j<len;j++){
              let currentChildItem = item[i].article_comment_set[j];
              n[i] += currentChildItem.articlecommentreply_set.length;
            }
            this.data.push({
              'title':item[i].title,
              'add_time':item[i].add_time,
              'authors':item[i].authors,
              'category':item[i].category,
              'click_nums':item[i].click_nums,
              'id':item[i].id,
              'article_comment_set':n[i]
            })
          }
        })
      }else
     if(this.viewAccessAll){
       this.$Spin.show();
       meserachArticle(this.selected?this.selected:'',this.title,getToken('token')).then(res=>{
         this.$Spin.hide();
         this.$refs.currents.currentPage=1
         this.count=res.data.count
         this.data = []
         let item = res.data.results
         let n=[]
         for (let i=0;i<item.length;i++){
           n.push(item[i].article_comment_set.length);
           for(let j=0,len=item[i].article_comment_set.length;j<len;j++){
             let currentChildItem = item[i].article_comment_set[j];
             n[i] += currentChildItem.articlecommentreply_set.length;
           }
           this.data.push({
             'title':item[i].title,
             'add_time':item[i].add_time,
             'authors':item[i].authors,
             'category':item[i].category,
             'click_nums':item[i].click_nums,
             'id':item[i].id,
             'article_comment_set':n[i]
           })
         }
       })
     }
    },
    page (index) {
      if(this.viewAccessSuper&&this.viewAccessAll) {
        this.$Spin.show();
        axios.request({
          url: '/api/article_list/?page=' + index + '&category=' + this.selected + '&title=' + this.title,
          headers: {
            'Authorization': 'JWT ' + getToken('token')
          },
          method: 'get'
        }).then(res => {
          this.$Spin.hide();
          let item = res.data.results
          let n = []
          this.data = []
          for (let i = 0; i < item.length; i++) {
            n.push(item[i].article_comment_set.length);
            for (let j = 0, len = item[i].article_comment_set.length; j < len; j++) {
              let currentChildItem = item[i].article_comment_set[j];
              n[i] += currentChildItem.articlecommentreply_set.length;
            }
            this.data.push({
              'title': item[i].title,
              'add_time': item[i].add_time,
              'authors': item[i].authors,
              'category': item[i].category,
              'click_nums': item[i].click_nums,
              'id': item[i].id,
              'article_comment_set': n[i]
            })
          }
        })
      }else if(this.viewAccessAll){
        this.$Spin.show();
        axios.request({
          url: '/api/me_article_list/?page=' + index + '&category=' + this.selected + '&title=' + this.title,
          headers: {
            'Authorization': 'JWT ' + getToken('token')
          },
          method: 'get'
        }).then(res => {
          this.$Spin.hide();
          let item = res.data.results
          let n = []
          this.data = []
          for (let i = 0; i < item.length; i++) {
            n.push(item[i].article_comment_set.length);
            for (let j = 0, len = item[i].article_comment_set.length; j < len; j++) {
              let currentChildItem = item[i].article_comment_set[j];
              n[i] += currentChildItem.articlecommentreply_set.length;
            }
            this.data.push({
              'title': item[i].title,
              'add_time': item[i].add_time,
              'authors': item[i].authors,
              'category': item[i].category,
              'click_nums': item[i].click_nums,
              'id': item[i].id,
              'article_comment_set': n[i]
            })
          }
        })
      }
    },
    ok () {
      let obj = {}
      obj.id= this.id
      obj.username = this.$store.state.user.userId

      setArticle(obj).then(res=>{
        this.$Message.info('删除成功');
        this.data.map((el,index)=>{
          if(el.id.indexOf(this.id)!=-1){
            this.data.splice(index,1)

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
    update(n){
      this.$router.push({
        //path:`update/${n}`
        name: 'articleUpdate',
        params: {
          id: n
        }
      })

    }
  },

}
</script>
