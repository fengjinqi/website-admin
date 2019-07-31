<template>
  <Card :bordered="false">
    <Row>
      <Col span="18"> <p  style="font-size: 14px;font-weight:600">友情链接 </p></Col>
      <Col span="6">
        <div style="padding-bottom: 20px;width: 100%;display: flex;
    justify-content: flex-end;">
          <Tooltip content="新增" placement="right" >
            <Icon type="md-add-circle" size="28" @click="add"/>
          </Tooltip>
        </div>
      </Col>
      <Divider />
    </Row>
    <Table border :columns="columns" :data="data">
      <template slot-scope="{ row, index }" slot="id">
        <span>{{index+1 }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="title">
        <span >{{ row.title }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="url">
        <span >{{ row.url }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <div style="display: flex;justify-content: space-around;">
        <Button type="primary" @click="update(row.id)">修改</Button>
        <Button type="warning" @click="del(row.id)">删除</Button>
        </div>
      </template>
    </Table>

    <Modal
      v-model="modal1"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="formItem" :label-width="80" v-if="title!='删除'">
        <FormItem label="链接名">
          <Input v-model="formItem.title" placeholder="请输入链接名"></Input>
        </FormItem>
        <FormItem label="地址">
          <Input v-model="formItem.url" placeholder="请输入地址必须加上http协议"></Input>
        </FormItem>
      </Form>
      <p v-else>是否删除?</p>
    </Modal>
  </Card>
</template>

<script>
  import {Friendship,addFriendship,getFriendship,putFriendship,delFriendship} from '@/api/banners'
  import { getToken } from '@/libs/util'
  export default {
    name: 'email',
    data () {
      return {
        columns: [
          {
            title: '序号',
            slot: 'id'
          },
          {
            title: '链接名',
            slot: 'title'
          },
          {
            title: '地址',
            slot: 'url'
          },
          {
            title: '操作',
            slot: 'action'
          }
        ],
        data: [],
        id:'',
        modal1: false,
        title:'',
        formItem:{
          iphone:'',
          email:'',
          qq:''
        }

      }
    },
    methods:{
      update(id){
        this.title = '修改'
        this.id=id
        getFriendship(id,getToken('token')).then(res=>{
          this.formItem.title=res.data.title
          this.formItem.url=res.data.url
          this.modal1=true
        })
      },
      add(){
        this.modal1=true
        this.title = '新增'
        this.id = ''
        this.formItem.title = ''
        this.formItem.url = ''
      },
      ok () {
        if(this.title=='修改'){
          let form = new FormData()
          form.append('title', this.formItem.title)
          form.append('url', this.formItem.url)
          putFriendship(this.id,form,getToken('token')).then(res=>{
            if(res.status==200){
              this.$Message.info('修改成功');
              //window.location.reload()
              this.getList()
              this.id = ''
              this.get
            }else {
              this.$Message.info('修改失败');
            }
          })
        }else if(this.title=='删除'){
          delFriendship(this.id,getToken('token')).then(res=>{
            console.log(res)
            this.data.map((item,id)=>{
              if(item.id==this.id){
                this.data.splice(id,1)
              }
            })
            this.id = ''
          })
        }else {
          let form = new FormData()
          form.append('title', this.formItem.title)
          form.append('url', this.formItem.url)
          addFriendship(form,getToken('token')).then(res=>{
            console.log(res)
            if(res.status==201){
              this.getList()
              this.$Message.info('创建成功');
            }else {
              this.$Message.info('创建失败');
            }
          }).catch(e=>{  this.$Message.info('创建失败');})
        }

      },
      cancel () {
        this.id=''
        this.$Message.info('取消');
      },
      del(row){
        this.modal1=true
        this.title = '删除'
        this.id = row

      },
      getList(){
        Friendship(getToken('token')).then(res=>{
          this.data = res.data.results
        })
      }
    },
    created () {
      this.getList()
    }
  }
</script>

<style scoped>

</style>
