<template>
  <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
    <FormItem label="Name" prop="name">
      <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
    </FormItem>
    <FormItem label="E-mail" prop="mail">
      <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem label="password" prop="password">
      <Input v-model="formValidate.password" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem label="password1" prop="password1">
      <Input v-model="formValidate.password1" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem label="yzm" prop="yzm">
      <Input v-model="formValidate.yzm" placeholder="Enter your e-mail"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
        name: '',
        mail: '',
        password: '',
        password1: ''

      },
      ruleValidate: {
        name: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        password1: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ],
        yzm: [
          { required: true, message: 'Please select the city', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!');
        } else {
          this.$Message.error('Fail!');
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields();
    }
  }
}
</script>
