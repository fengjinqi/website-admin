<template>
  <div>
    <Card :bordered="false">
      <p slot="title">文章分类{{types}}</p>
      <div style="display: flex;justify-content: space-between">
        <p>分类名字</p>
        <Button type="primary" @click="go" >返回</Button>
      </div>
      <template>


      <Form :label-width="110" ref="formValidate" :model="formValidate" :rules="ruleValidate">
        <FormItem label="标题" prop="value">
          <Input v-model="formValidate.value"  style="width: 300px" />

        </FormItem>


      <FormItem>
        <Button type="primary"@click="submit('formValidate')">确定</Button>
        <Button type="warning" class="text-right" @click="handleReset('formValidate')">重置</Button>
      </FormItem>
      </Form>
      </template>
   <!--   <p class="btn">
        <Button type="primary"@click="submit('ruleValidate')">确定</Button>
        <Button type="warning" class="text-right">重置</Button>
      </p>-->
    </Card>
  </div>
</template>
<style scoped="">
  .btn{
    padding: 20px 0;
  }
  .text-right{
    margin-left: 15px;
  }
</style>
<script>
  import { setToken, getToken,getCookie } from '@/libs/util'
  import {updateCategory,addCategory} from '@/api/article'
export default {
  data () {
    return {
      types: '',
      id:'',
      formValidate:{
        value:''
      },
      ruleValidate: {
        value: [
          { required: true, message: '值不能为空', trigger: 'blur' }
        ],
      }
    }
  },
  watch: {
    '$route': 'getParams'
  },
  created () {
    let self = this
    self.getParams()
    console.log(this.types)
    console.log(this.$route)
  },
  methods: {
    getParams () {
      this.types = this.$route.params.types ? this.$route.params.types : ''
      this.id = this.$route.params.id ? this.$route.params.id : ''
    },
    go () {
      this.$router.back(-1)
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    },
    submit(name){
      this.$refs[name].validate((valid) => {
        if (valid) {
          if(this.$route.name == 'cargorty_add'){
            addCategory(this.formValidate.value, getToken('token')).then(res=>{
              this.$Message.success('添加成功')
              this.$router.push({
                name: 'cargorty_list'
              })
            })
          }
        if (this.$route.name == 'cargorty_update'){
          updateCategory(this.id, this.formValidate.value, getToken('token')).then(res => {
            this.$Message.success('修改成功')
            this.$router.push({
              name: 'cargorty_list'
            })
          })
        }
        }else{
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
