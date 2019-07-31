<template>
  <div  class="demo-spin-col">
    <Card :bordered="false">
      <p slot="title">文章发布</p>
      <template>
        <Form :label-width="110" ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem label="标题" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="关键字(Keywords)" prop="keywords">
            <Input v-model="formValidate.keywords" placeholder="请输入关键字,以英文逗号分割,利于搜索引擎收录"></Input>
          </FormItem>
          <FormItem label="描述(Description)" prop="desc">
            <Input v-model="formValidate.desc" placeholder="请输入文章描述"></Input>
          </FormItem>
          <FormItem label="列表图(List_pic)" prop="list_pic">
            <img :src="baseUrl" alt="" v-if="baseUrl" style="height: 300px;">
            <p  class="file_image">
              <input type="file" class="file" @change="preview($event)">
              <Icon type="ios-cloud-upload-outline" :size="50"/>
            </p>

          </FormItem>
          <FormItem label="文章内容" >
            <div id="test-editormd">
              <textarea  name="" id="" class="form-control" cols="30" rows="10"></textarea>
            </div>
          </FormItem>
          <FormItem label="文章分类" prop="cargorty" >
            <Select v-model="formValidate.cargorty" >
              <Option :value="item.id" v-for="(item,index) in cargorty" :key="index">{{item.name}}</Option>

            </Select>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">发布</Button>
            <Button style="margin-left: 8px" @click="handleReset('formValidate')">重置</Button>
          </FormItem>
        </Form>


      </template>
    </Card>
  </div>
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

import jquery from 'jquery'
import {mapActions,mapMutations} from 'vuex'
import {addArticle} from '@/api/article'
import { hasOneOf } from '@/libs/tools'
import { setToken, getToken } from '@/libs/util'
export default {
  data () {
    return {
      cargorty:[],
      baseUrl:'',

      testEditor:'',
      formValidate: {
        title: '',
        keywords: '',
        desc: '',
        list_pic: '',
        cargorty: '',
        content:''
      },
      ruleValidate: {
        title: [
          { required: true, message: '值不能为空', trigger: 'blur' }
        ],
        cargorty: [
          { required: true, type: 'number', message: '值不能为空', trigger: 'change' }
        ],
      }
    }
  },
  mounted(){
    this.getCargortys()
  },
  methods: {
    ...mapActions([
      'getCargorty'
    ]),
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let form = new FormData()

          form.append('authors',this.$store.state.user.userId)
          form.append('title',this.formValidate.title)
          form.append('desc',this.formValidate.desc)
          form.append('keywords',this.formValidate.keywords)
          form.append('list_pic',this.formValidate.list_pic)
          form.append('category',this.formValidate.cargorty)
          form.append('is_show',true)
          form.append('content',this.testEditor.getMarkdown())

          addArticle(form,getToken('token')).then(res=>{
            this.$Message.success('发布成功!')
            this.$router.push({
              name: 'articleList'
            })
          }).catch(err=>{
            console.log(err)
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },

    getCargortys(){
      this.getCargorty().then(res=>{
        this.cargorty = res.data
      }).catch(err=>{
      })
    },
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
        this.formValidate.list_pic = n.target.files[0]
      })
    }
  },
  created () {
    this.path = this.$route.path
    var self = this.path
    var  Editor;
    let test = this
    jquery(function () {
      if (self === '/article/add') {
        test.testEditor = editormd('test-editormd', {
          width: '100%',
          height: 640,
          syncScrolling: 'single',
          path: '/static/markdown/lib/',
          saveHTMLToTextarea: true, // 注意3：这个配置，textarea可以提交
          emoji: true, // emoji表情，默认关闭
          /** 上传图片相关配置如下 */
          imageUpload: true,
          imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
          imageUploadURL: '/api/article/blog_img_upload/'
        })
      }
    })
  }
}
</script>
