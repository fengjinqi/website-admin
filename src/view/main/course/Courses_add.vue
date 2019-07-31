<template>
  <div>
    <Card :bordered="false">
      <p slot="title">添加教程</p>
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
            <Radio label="1">上线</Radio>
            <Radio label="0">下线</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="更新状态" prop="is_active">
          <RadioGroup v-model="formValidate.is_active">
            <Radio label="1">更新中...</Radio>
            <Radio label="0">已完结</Radio>
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
  import { getToken, base } from '@/libs/util'
  import { createdCourse } from '@/api/course'
  export default {

    data () {
      return {
        baseUrl:'',
        id:'',
        formValidate: {
          title: '',
          offline:'1',
          is_active: '1',
          info: '',
          image:''
        },
        ruleValidate: {
          title: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ],
          is_active: [
            { required: true, message: '值不能为空', trigger: 'change' }
          ],
          offline: [
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
            form.append('user',this.$store.state.user.userId)
            form.append('title',this.formValidate.title)
            form.append('offline',this.formValidate.offline)
            form.append('is_active',this.formValidate.is_active)
            form.append('image',this.formValidate.image)
            form.append('info',this.formValidate.info)

            createdCourse(form,getToken('token')).then(res=>{
              console.log(res)
              if(res.status == 201){
                this.$Message.success('添加成功!');
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
        base(n).then(url=>{
          this.baseUrl = url
          this.formValidate.list_pic = n.target.files[0]
        })
      }
    }
  }
</script>

<style scoped>

</style>
