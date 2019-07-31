<template>
  <Card :bordered="false">
    <Row>
      <Col span="18"> <p  style="font-size: 14px;font-weight:600">交流群 </p></Col>
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
      <template slot-scope="{ row, index }" slot="qq">
        <span >{{ row.qq }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="is_active">
        <span >{{ row.is_active?'满人':'未满' }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="action"style="display: flex">
        <div style="display: flex;justify-content: space-around;">
          <Button type="primary" @click="update(row.id)">修改</Button>
          <Button type="warning"  @click="del(row.id)">删除</Button>
        </div>

      </template>
    </Table>

    <Modal
      v-model="modal1"
      :title="title"
      @on-ok="ok('formItem')"
      :mask-closable="false"
      @on-cancel="cancel">
      <Form :model="formItem" :label-width="80" v-if="title!='删除'" ref="formItem" :rules="ruleValidate">
        <FormItem label="群名称" prop="title">
          <Input v-model="formItem.title" placeholder="请输入群名称"></Input>
        </FormItem>
        <FormItem label="qq群号" prop="qqs">
          <Input v-model="formItem.qqs" placeholder="请输入qq群号"></Input>
        </FormItem>
        <FormItem label="qq群状态">
          <Checkbox v-model="formItem.is_active">是否满人</Checkbox>
        </FormItem>
      </Form>
      <p v-else>是否删除?</p>
    </Modal>
  </Card>
</template>

<script>
  import {getQQList,getQQDetail,setQQDetail,delQQDetail,addQQDetail} from '@/api/banners'
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
            title: '名称',
            slot: 'title'
          },
          {
            title: '群号',
            slot: 'qq'
          },
          {
            title: '状态',
            slot: 'is_active'
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
          title:'',
          is_active:'',
          qqs:''
        },

        ruleValidate:{
          qqs:[{ required: true, trigger: 'blur'}],
          title: [{ required: true, trigger: 'blur' }],

        }

      }
    },
    methods:{
      update(id){
        this.title = '修改'
        this.id=id
        getQQDetail(id,getToken('token')).then(res=>{
          this.formItem.title=res.data.title
          this.formItem.is_active=res.data.is_active
          this.formItem.qqs=String(res.data.qq)
          this.modal1=true
        })
      },
      add(){
        this.modal1=true
        this.title = '新增'
        this.id = ''
        this.formItem.title = ''
        this.formItem.qqs = ''
        this.formItem.is_active=''
      },
      ok () {
        if(this.title=='修改'){
          this.$refs.formItem.validate((valid) => {
            if (valid) {
              let form = new FormData()
              form.append('title', this.formItem.title)
              form.append('qq', Number(this.formItem.qqs))
              form.append('is_active', this.formItem.is_active)
              setQQDetail(this.id,form,getToken('token')).then(res=>{
                if(res.status==200){
                  this.$Message.info('修改成功');
                  this.getList()
                  this.id = ''
                }else {
                  this.$Message.info('修改失败');
                }
              })
            } else {
              this.$Message.error('请全部填写!');
            }
          })
        }
        else if(this.title=='删除'){
          delQQDetail(this.id,getToken('token')).then(res=>{
            console.log(res)
            this.data.map((item,id)=>{
              if(item.id==this.id){
                this.data.splice(id,1)
              }
            })
            this.id = ''
          })
        }
        else {
          this.$refs.formItem.validate((valid) => {
            if (valid) {
              let form = new FormData()
              form.append('title', this.formItem.title)
              form.append('qq', this.formItem.qqs)
              form.append('is_active', this.formItem.is_active)
              addQQDetail(form, getToken('token')).then(res => {
                console.log(res)
                if (res.status == 201) {
                  this.getList()
                  this.$Message.info('创建成功');
                } else {
                  this.$Message.info('创建失败');
                }
              }).catch(e => {
                this.$Message.info('创建失败');
              })
            } else {
              this.$Message.info('新增失败');
            }
          })
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
        getQQList(getToken('token')).then(res=>{
          console.log(res)
          this.data = res.data
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
