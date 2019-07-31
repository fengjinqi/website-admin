<template>
  <Card :bordered="false">
    <Row>
      <Col span="18"> <p  style="font-size: 14px;font-weight:600">帖子分类 </p></Col>
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
        <span>{{ index+1}}</span>
      </template>
      <template slot-scope="{ row, index }" slot="name">
        <span >{{ row.name }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="image">
        <img :src="row.image"  alt="">
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" @click="update(row.id)">修改</Button>
      </template>
    </Table>

    <Modal
            v-model="modal1"
            :title="title"
            @on-ok="ok"
            :loading="modal1"
            @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="分类名">
          <Input v-model="formItem.name" placeholder="请输分类名"></Input>
        </FormItem>
        <FormItem label="图标">
          <img :src="baseUrl" alt="" v-if="baseUrl" style="height: 100px;">
          <p  class="file_image">
            <input type="file" class="file" @change="preview($event)">
            <Icon type="ios-cloud-upload-outline" :size="50"/>
          </p>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>
<style scoped>
  label{
    font-size: 16px;
    font-weight: 600;
  }
  .file_image{
    position: relative;
  }
  .file{
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
  @keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
  }
  .demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
  }
</style>
<script>
  import {getListCategory,putListCategory,putListCategorys,addListCategorys} from '@/api/forum'
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
            title: '分类名',
            slot: 'name'
          },
          {
            title: '图标',
            slot: 'image'
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
        baseUrl:'',
        formItem:{
          name:'',
          image:''
        }
      }
    },
    methods:{
      preview(n){
        let base= new Promise((resolve, reject) => {
          var read=new FileReader() // 创建FileReader对像;
          read.readAsDataURL(n.target.files[0])  // 调用readAsDataURL方法读取文件;
          read.onload=function(){
            resolve(read.result)
          }
        })
        base.then(url=>{
          this.baseUrl = url
          this.formItem.image = n.target.files[0]
        })
      },
      getListCategorys(){
        getListCategory( getToken('token') ).then(res=>{
          this.data = res.data
        })
      },
      update(id){
        this.title = '修改'
        this.id=id
        putListCategory(id,getToken('token')).then(res=>{
          this.formItem.name=res.data.name
           this.modal1=true
        })
      },
      add(){
        this.modal1=true
        this.title = '新增'
        this.id = ''
      },
      ok () {
        if(this.id){
          let form = new FormData()
          form.append('name', this.formItem.name)
          form.append('image', this.formItem.image)
          putListCategorys(this.id,form,getToken('token')).then(res=>{
            this.modal1 = false

            if(res.status==200){
              this.baseUrl = ''
              this.$Message.info('修改成功');
              //window.location.reload()
              this.getListCategorys()
            }else {
              this.$Message.info('修改失败');
            }
          })
        }else {
          let form = new FormData()
          form.append('name', this.formItem.name)
          form.append('author', this.$store.state.user.userId)
          form.append('image', this.formItem.image)
          addListCategorys(form,getToken('token')).then(res=>{
            this.modal1 = false
            if(res.status==201){
              this.baseUrl = ''
              this.$Message.info('创建成功');
              this.getListCategorys()
            }else {
              this.$Message.info('创建失败');
            }
          }).catch(err=>{
            this.$Message.info('创建失败');
          })
        }
      },
      cancel () {
        this.id=''
        this.$Message.info('取消');
      },

    },
    created () {
      this.getListCategorys()
    }
  }
</script>

<style scoped>

</style>
