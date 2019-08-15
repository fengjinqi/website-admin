<template>
  <div>
    <Card :bordered="false">
      <p slot="title">SEO</p>
      <Row>
       <Col span="24" style="margin-top: 15px;">
        <Table border  :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="id">
            <span>{{row.id}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="name">
            <span>{{row.name}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="title">
            <span style="    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;">{{row.title}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary"size="small" @click="update(row.id)"><Icon type="ios-eye-outline"size="20" />修改</Button>
          </template>
        </Table>
       </Col>
      </Row>
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
  import { setToken, getToken,getCookie } from '@/libs/util'
  import {getSeo} from '@/api/user'
  export default {
  data () {
    return {
      columns: [
        {
          title: '序号',
          slot: 'id',
        },
        {
          title: '板块',
          slot: 'name'
        },
        {
          title: '标题',
          slot: 'title'
        },
        {
          title: '操作',
          slot: 'action',

        }
      ],
      data: [],
    }
  },

  created(){
    getSeo(getToken('token')).then(res=>{
      console.log(res)
      if(res.status==200){
        this.data = res.data
      }
    })
  },
  methods: {
    update(n){
      this.$router.push({
        name: 'seoUpdate',
        params: {
          id: n
        }
      })

    }
  },

}
</script>
