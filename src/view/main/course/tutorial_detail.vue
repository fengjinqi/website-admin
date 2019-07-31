<template>

    <div style="height: calc(100%)">
      <Card :bordered="false"v-if="error"style="height: calc(100%)">
        <p>{{error}}</p>
      </Card>
      <Card :bordered="false" v-else style="height: calc(100%)">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="目录" prop="title">
          <Input v-model="formValidate.title" ></Input>
        </FormItem>
        <FormItem label="内容">
          <div id="test-editormd">
            <textarea  name="" class="form-control" cols="30" rows="10" >{{content}}</textarea>
          </div>
        </FormItem>

        <FormItem v-if="is_update">
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
  import {mapActions} from 'vuex'
  import {detailTutorial,updateTutorial} from '@/api/course'
  export default {
    data(){
      return{
        content:'',
        id:'',
        error:'',
        is_update:'',
        testEditor:'',
        course:'',
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
    watch:{
     content(){
       // console.log(this.content)
       return this.content
     }
    },
   mounted:function (){
      //this._getCourse()
   },
    methods:{
      ...mapActions([
        'getCourse'
      ]),
      //_getCourse(){
        // this.getCourse(this.id).then(res=>{
        //       if(res.status == 200){
        //         this.formValidate.title = res.data.titles
        //         this.content =  res.data.conent
        //       }
        //
        //     }).catch(err=>{
        //       alert()
        //       console.log(err)
        //       this.error = err
        // })
      //},
      getDetailTutorial(){
        return new Promise((resolve,reject)=>{
          detailTutorial(this.id,getToken('token')).then(res=>{
            if(res.status == 200){
              // this.formValidate.title = res.data.titles
              // this.content = res.data.conent
              // this.course = res.data.course
              resolve(res.data);
              this.$forceUpdate();
            }
          }).catch(err=>{
            this.error = err
          })
        })

      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let form = new FormData()
            form.append('titles',this.formValidate.title)
            form.append('conent',this.testEditor.getMarkdown())
            form.append('course',this.course)
            updateTutorial(this.id,form,getToken('token')).then(res=>{
              if(res.status=200){
                this.$router.go(-1)
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
    async created () {
      this.id = this.$route.params.id
      this.is_update = this.$route.params.is_update
      let {conent,titles,course} = await this.getDetailTutorial()
      this.content = conent
      this.formValidate.title = titles
      this.course = course;
      let test = this
      jquery(function () {
        test.testEditor = editormd('test-editormd', {
          markdown : conent,
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
      })
    }
  }
</script>

<style scoped>

</style>
