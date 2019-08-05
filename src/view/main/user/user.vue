<template>
  <div>
    <Card :bordered="false">
      <p slot="title">用户列表</p>
      <template>
        <Table border  :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="id">
            <span>{{index+1}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="username">

            <span>{{ row.username }}</span>
          </template>

          <template slot-scope="{ row, index }" slot="user_imag">
            <img :src="row.user_imag" alt="" style="width: 50px;height: 50px;border-radius: 50%;"v-if="row.user_imag">
            <img :src="row.user_image" alt="" style="width: 50px;height: 50px;border-radius: 50%;"v-else-if="row.user_image">
            <span v-else class="span"></span>

          </template>

          <template slot-scope="{ row, index }" slot="email">
           <span>{{row.email}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="mobile">
            <span>{{row.mobile}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="is_active">
            <span v-if="row.is_active== true"><Icon type="md-checkmark-circle-outline" size="24" color="#00bb00"/></span>
            <span v-else><Icon type="md-close-circle" size="24" color="red"/></span>
          </template>
          <template slot-scope="{ row, index }" slot="address">

            <div style="display: flex;justify-content: space-around;">
            <Button type="primary" @click="detail(row.id)">查看</Button>
            <Button type="warning" class="text-right"  @click="disbale(row.id,0)" v-if="row.is_active== true">禁用</Button>
            <Button type="warning"class="text-right"@click="disbale(row.id,1)" v-else>启用</Button>
            </div>
          </template>
        </Table>
        <Page :total="count" :page-size="pageSize"  show-elevator show-total @on-change="page"  />
      </template>
    </Card>
  </div>
</template>
<style lang="less" scoped="">
  .text-right{
    margin-left: 15px;
  }
  .table-no-outerborder {
    border: none!important;
    .ivu-table:after {
      width: 0;
    }
    .ivu-table:before {
      height: 0;
    }
  }
.span{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ccc;
  display: block;
}

</style>
<script>
import { getUserallInfo,setUserallInfo } from '@/api/user'
import {getToken } from '@/libs/util'
import axios from '@/libs/api.request'
import { hasOneOf } from '@/libs/tools'
export default {
  data () {
    return {
      count:0,
      pageSize:10,
      columns: [
        {
          title: '序号',
          slot: 'id',
        },
        {
          title: '昵称',
          slot: 'username'
        },
        {
          title: '头像',
          slot: 'user_imag',

        },
        {
          title: '邮箱',
          slot: 'email'
        },
        {
          title: '手机号',
          slot: 'mobile'
        },
        {
          title: '状态',
          slot: 'is_active'
        },
        {
          title: '操作',
          slot: 'address'
        }
      ],
      data: []
    }
  },
  created(){
    getUserallInfo(getToken('token')).then(res=>{
      this.count = res.data.count
      this.data = res.data.results
      console.log(res.data)
    }).catch(err =>{
      console.log(err)
    })
  },
  methods: {
    disbale(n,type){
      let form = new FormData()
      form.append('is_active',type)
      form.append('type',true)
      setUserallInfo(n,form,getToken('token')).then(res=>{
        this.data.map((item,index)=>{
          if(item.id ==res.data.id){
            this.data[index].is_active=res.data.is_active
          }
        })
      })
    },
    page (index) {
      axios.request({
        url: '/api/all_info/?page='+index,
        headers: {
          'Authorization':'JWT '+getToken('token')
        },
        method: 'get'
      }).then(res=>{
        this.data=[]
        this.data=res.data.results

      })
    },
    detail(id){
      this.$router.push({
        name:'user_detail',
        params:{id:id}
      })
    }
  }
}
</script>
