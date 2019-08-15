
<template>
  <div  class="demo-spin-col">
    <Card :bordered="false">
      <div style="display: flex;   justify-content: space-between;
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;">
        <p slot="title">SEO</p>
        <Button type="primary" @click="$router.go(-1)">返回</Button>
      </div>

      <template>
        <Form :label-width="110" ref="formValidate" :model="formValidate" >
          <FormItem label="名称" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="关键字(keywords)" prop="keywords">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" v-model="formValidate.keywords" ></Input>
          </FormItem>
          <FormItem label="描述(Description)" prop="desc">
            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"v-model="formValidate.desc"></Input>
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
  import {getSeoDe,patchSeo} from '@/api/user'
  import { getToken } from '@/libs/util'
  export default {
    data () {
      return {
        formValidate: {
          title: '',
          keywords: '',
          desc: '',

        },
      }
    },
    methods: {
      getSeoList(){
        getSeoDe(getToken('token'),this.$route.params.id).then(res=>{
          if(res.status==200){
            console.log(res)
            this.formValidate.title = res.data.title
            this.formValidate.keywords = res.data.keywords
            this.formValidate.desc = res.data.desc
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let form = new FormData()
            form.append('title',this.formValidate.title)
            form.append('keywords',this.formValidate.keywords)
            form.append('desc',this.formValidate.desc)

            patchSeo(this.$route.params.id,getToken('token'),form).then(res=>{
              this.$Message.success('发布成功!')
              this.$router.go(-1)
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

    },
    created(){
      this.getSeoList()
    },
  }
</script>

