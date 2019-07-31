<template>
  <div>

    <div v-if="err">
      <Card :bordered="false">
        <p>{{err}}</p>
      </Card>
    </div>
    <div v-else>
      <Card :bordered="false">
        <p slot="title">教程修改</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="教程名字" prop="title">
            <Input v-model="formValidate.title" placeholder="请输入教程名字"></Input>
          </FormItem>
          <FormItem label="缩略图">
            <img :src="baseUrl" alt="" v-if="baseUrl" style="height: 300px;">
            <p  class="file_image">
              <input type="file" class="file" @change="preview($event)">
              <Icon type="ios-cloud-upload-outline" :size="50"/>
            </p>
          </FormItem>

          <FormItem label="状态" prop="offline">
            <RadioGroup v-model="formValidate.offline">
              <Radio label='1'>上线</Radio>
              <Radio label='0'>下线</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="更新状态" prop="is_active">
            <RadioGroup v-model="formValidate.is_active">
              <Radio label='1'>更新中...</Radio>
              <Radio label='0'>已完结</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="课程介绍" prop="info">
            <Input v-model="formValidate.info" type="textarea"  placeholder="请输入简介..."></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  </div>

</template>
<style scoped>
  .file_image{
    position: relative;
  }
  .file{
    width: 50px;
    height: 50px;
    position: absolute;
    opacity: 0;
  }
</style>
<script>
  import {getCourseDetaile,updateCourse} from '@/api/course'
  import { getToken } from '@/libs/util'
  export default {
    data () {
      return {
        baseUrl:'',
        id:'',
        err:'',
        user:'',
        formValidate: {
          title: '',
          offline: '',
          is_active: '',
          info: '',
          image:''
        },
        ruleValidate: {
          title: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ],
          is_active: [
            { required: true,  message: '值不能为空', trigger: 'change' }
          ],
          offline: [
            { required: true, message: '值不能为空', trigger: 'change' }
          ],
          image: [
            { required: true, message: '值不能为空', trigger: 'change' }
          ],
          info: [
            { required: true, message: '值不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let form = new FormData()
            form.append('user',this.user)
            form.append('title',this.formValidate.title)
            form.append('offline',this.formValidate.offline)
            form.append('is_active',this.formValidate.is_active)
            form.append('image',this.formValidate.image)
            form.append('info',this.formValidate.info)
            updateCourse(this.id,form,getToken('token')).then(res=>{
              if(res.status ==200){
                this.$Message.success('修改成功!');
                this.$router.push({
                  name:'course_list'
                })
              }
            })

          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
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
          this.formValidate.image = n.target.files[0]
        })
      }
    },
    created(){
      this.id = this.$route.params.id
      getCourseDetaile(this.id,getToken('token')).then(res=>{
        if(res.status == 200){
          this.formValidate.title = res.data.title
          this.formValidate.offline = res.data.offline?'1':'0'
          this.formValidate.is_active = res.data.is_active?'1':'0'
          this.formValidate.info = res.data.info
          this.baseUrl = res.data.image
          this.user = res.data.user.id
          console.log(this.formValidate)
        }
      }).catch(err=>{
        this.err = err
      })
    }
  }
</script>

<style scoped>

</style>
