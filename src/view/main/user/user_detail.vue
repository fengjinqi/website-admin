<template>
  <Card>
    <Form :model="formItem" :label-width="100">
      <FormItem label="账号">
        <Input v-model="formItem.username" disabled=""></Input>
      </FormItem>
      <FormItem label="头像">
        <img :src="formItem.image" alt="" height="250px;">
      </FormItem>
      <FormItem label="邮箱">
        <Input v-model="formItem.email" disabled=""></Input>
      </FormItem>
      <FormItem label="是否超级管理员">
        <RadioGroup v-model="formItem.is_superuser">
          <Radio label="1"disabled="">是</Radio>
          <Radio label="0"disabled="">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="是否作者">
        <RadioGroup v-model="formItem.is_staff">
          <Radio label="1"disabled="">是</Radio>
          <Radio label="0"disabled="">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="是否启用">
        <RadioGroup v-model="formItem.is_active">
          <Radio label="1"disabled="">是</Radio>
          <Radio label="0"disabled="">否</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="职位">
        <Input v-model="formItem.position" disabled=""></Input>
      </FormItem>

      <FormItem label="个人介绍">
        <Input v-model="formItem.info" type="textarea"disabled=""></Input>
      </FormItem>
    </Form>
  </Card>

</template>
<script>
  import {getDetailUserallInfo} from '@/api/user'
  import { getToken } from '@/libs/util'
  export default {
    data () {
      return {
        formItem: {
          username: '',
          image:'',
          email: '',
          is_superuser:'0',
          is_staff: '0',
          is_active: '0',
          position: '',
          info: '',
        }
      }
    },
    created(){
      getDetailUserallInfo(this.$route.params.id,getToken('token')).then(res=>{
        this.formItem.username=res.data.username
        this.formItem.image=res.data.user_imag
        this.formItem.email=res.data.email
        this.formItem.position=res.data.position
        this.formItem.info=res.data.info
        this.formItem.is_superuser=res.data.is_superuser?'1':'0'
        this.formItem.is_staff=res.data.is_staff?'1':'0'
        this.formItem.is_active=res.data.is_active?'1':'0'
        console.log(res)
      })
    }
  }
</script>
