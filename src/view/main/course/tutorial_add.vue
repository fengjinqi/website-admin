<template>

    <div style="height: calc(100%)">

      <Card :bordered="false">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="目录" prop="title">
          <Input v-model="formValidate.title" ></Input>
        </FormItem>
        <FormItem label="内容">
          <div id="editormd">
            <textarea  name="" class="form-control" cols="30" rows="10"></textarea>
          </div>
        </FormItem>
        <FormItem >
          <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>(注:编辑器不会清空)
        </FormItem>
      </Form>
      </Card>
    </div>
</template>

<script>
  import jquery from 'jquery'
  import { getToken, base } from '@/libs/util'
  import { addTutorial } from '@/api/course'
  export default {
    data(){
      return{
        content:'',
        id:'',
        formValidate:{
          title:''
        },
        ruleValidate: {
          title: [
            { required: true, message: '值不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let form = new FormData()
            form.append('titles',this.formValidate.title)
            form.append('conent',this.testEditor.getMarkdown())
            form.append('course',this.id)
            addTutorial(form,getToken('token')).then(res=>{
              if(res.status=200){
                this.$router.go(-1)
              }else {
                this.$Message.error('error!');
              }
            })
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
        this.$refs[name].resetFields();
      }
    },
     created () {

      this.id = this.$route.params.id

    },
    mounted() {
      let test = this
      jquery(function () {
        test.testEditor = editormd('editormd', {
          markdown : "",
          width: '100%',
          height: 640,
          syncScrolling: 'single',
          path: '/static/markdown/lib/',
          saveHTMLToTextarea: true, // 注意3：这个配置，textarea可以提交
          emoji: true, // emoji表情，默认关闭
          /** 上传图片相关配置如下 */
          imageUpload: true,
          imageFormats: ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
          imageUploadURL: '/article/blog_img_upload/'
        })
      console.log(test.testEditor)
      })
    }
  }
</script>

<style scoped>

</style>
