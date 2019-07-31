<template>
  <Card :bordered="false">
    <Row>
      <Col span="18"> <p  style="font-size: 14px;font-weight:600">联系方式 </p></Col>
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
        <span>{{ row.id }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="email">
        <span >{{ row.email }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="qq">
        <span >{{ row.qq }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="iphone">
        <span >{{ row.iphone }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" @click="update(row.id)">修改</Button>
      </template>
    </Table>

    <Modal
      v-model="modal1"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="邮箱">
          <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="QQ">
          <Input v-model="formItem.qq" placeholder="请输入QQ"></Input>
        </FormItem>
        <FormItem label="手机">
          <Input v-model="formItem.iphone" placeholder="请输入手机号"></Input>
        </FormItem>
      </Form>
    </Modal>
  </Card>
</template>

<script>
  import {getEmail,getEmailDetail,putEmailDetail,addEmail} from '@/api/banners'
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
            title: '邮箱',
            slot: 'email'
          },
          {
            title: 'QQ',
            slot: 'qq'
          },
          {
            title: '手机',
            slot: 'iphone'
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

        getEmailDetail(id,getToken('token')).then(res=>{
          this.formItem.iphone=res.data.iphone
          this.formItem.email=res.data.email
          this.formItem.qq=res.data.qq
          this.modal1=true
        })
      },
      add(){
        this.modal1=true
        this.title = '新增'
      },
      ok () {
        if(this.id){
          let form = new FormData()
          form.append('email', this.formItem.email)
          form.append('iphone', this.formItem.iphone)
          form.append('qq', this.formItem.qq)
          putEmailDetail(this.id,form,getToken('token')).then(res=>{
            if(res.status==200){
              this.$Message.info('修改成功');
              window.location.reload()
            }else {
              this.$Message.info('修改失败');
            }
          })
        }else {
          let form = new FormData()
          form.append('email', this.formItem.email)
          form.append('iphone', this.formItem.iphone)
          form.append('qq', this.formItem.qq)
          addEmail(form,getToken('token')).then(res=>{
            if(res.status==201){
              this.$Message.info('创建成功');
              window.location.reload()
            }else {
              this.$Message.info('修改失败');
            }
          })
        }

      },
      cancel () {
        this.id=''
        this.$Message.info('取消');
      }
    },
    created () {
      getEmail(getToken('token')).then(res=>{
        this.data = res.data.results
      })
    }
  }
</script>

<style scoped>

</style>
