<template>
  <Card :bordered="false">
    <Row>
      <Col span="18"> <p  style="font-size: 14px;font-weight:600">Banner </p></Col>
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
      <template slot-scope="{ row, index }" slot="title">
        <span >{{ row.title }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="url">
        <span >{{ row.url }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="image">
        <span ><img :src="row.image" alt="" style="width: 100%"></span>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button type="error" @click="remove(row.id)">删除</Button>
      </template>
    </Table>

    <Modal
      v-model="modal1"
      :title="title"
      @on-ok="ok"
      @on-cancel="cancel">
      <Form :model="formItem" :label-width="80">
        <FormItem label="链接名">
          <Input v-model="formItem.title" placeholder="请输入链接名"></Input>
        </FormItem>
        <FormItem label="地址">
          <Input v-model="formItem.url" placeholder="请输入地址"></Input>
        </FormItem>
        <FormItem label="图片">
          <Upload
                  :before-upload="handleUpload"
                  action="">
            <Button icon="ios-cloud-upload-outline">Select the file to upload</Button>
          </Upload>
        </FormItem>
      </Form>
    </Modal>
    <Modal
            v-model="modal2"
            title="删除"
            @on-ok="oks"
            @on-cancel="cancels">
      <p>是否要删除?</p>
    </Modal>
  </Card>
</template>

<script>
  import {bannerList,RemoveBanners,AddBanners} from '@/api/banners'
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
            title: '图片',
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
        modal2:false,
        title:'',
        n:null,
        file:null,
        formItem:{
          title:'',
          url:'',
          url1:''
        }

      }
    },
    methods:{
      add(){
        this.modal1=true
        this.title = '新增'
      },
      handleUpload (file) {
        this.file = file;
        return false;
      },
      ok () {
        console.log(this.file)
        let obj=new FormData()
        obj.append('title',this.formItem.title)
        obj.append('image',this.file)
        obj.append('url',this.formItem.url)
        AddBanners(getToken('token'),obj).then(res=>{
          if(res.status==201){
            this.getList()
          }
        })
      },
      oks () {
        RemoveBanners(getToken('token'),this.n).then(res=>{
          if(res.status==204){
            this.$Message.info('删除成功');
            window.location.reload()
          }
        })
      },
      cancel () {
        this.id=''
        this.$Message.info('取消');
      },
      cancels () {

        this.$Message.info('取消');
      },
      remove(n){
        this.modal2=true
        this.n=n

      },
      getList(){
        bannerList(getToken('token')).then(res=>{
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
