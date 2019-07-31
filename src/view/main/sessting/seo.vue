
<template>
  <div  class="demo-spin-col">
    <Card :bordered="false">
      <p slot="title">SEO</p>
      <template>
        <Form :label-width="110" ref="formValidate" :model="formValidate" :rules="ruleValidate">
          <FormItem label="名称" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="关键字(keywords)" prop="keywords">
            <Input v-model="formValidate.keywords" ></Input>
          </FormItem>
          <FormItem label="描述(Description)" prop="desc">
            <Input v-model="formValidate.desc"></Input>
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
  import {setUserInfo} from '@/api/user'
  import { getToken } from '@/libs/util'
  export default {
    data () {
      return {
        baseUrl:'',
        formValidate: {
          username: '',
          info: '',
          position: '',
          list_pic: '',

        },
        ruleValidate: {
          username: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods: {

      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let form = new FormData()
            form.append('username',this.formValidate.username)
            form.append('info',this.formValidate.info)
            form.append('position',this.formValidate.position)
            form.append('list_pic',this.formValidate.list_pic)

            setUserInfo(this.$store.state.user.userId,form,getToken('token')).then(res=>{
              this.$Message.success('发布成功!')
              this.$router.push({
                path:'/home'
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
    created(){
      console.log(this.$store.state.user)
      this.formValidate.username=this.$store.state.user.userName
      this.baseUrl=this.$store.state.user.avatorImgPath
      this.formValidate.position=this.$store.state.user.position
      this.formValidate.info=this.$store.state.user.info

    },
  }
</script>

