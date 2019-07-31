<template>
  <div>
    <Card :bordered="false">
      <Row>
        <Col span="18"> <p  style="font-size: 14px;font-weight:600">文章分类 </p></Col>
        <Col span="6">
          <div style="padding-bottom: 20px;width: 100%;display: flex;
    justify-content: flex-end;">
          <Tooltip content="新增" placement="right">
            <Icon type="md-add-circle" size="28" @click="add"/>
          </Tooltip>
        </div>
        </Col>
        <Divider />
      </Row>

      <Table border  :columns="columns" :data="data">
          <template slot-scope="{ row, index }" slot="id">
            <span>{{index+1}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="name">
            <span>{{row.name}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <Button type="primary"size="small" @click="update(row.id)"><Icon type="ios-eye-outline"size="20" />修改</Button>
            <!--<Button type="error" class="text-right" size="small" @click="remove(row.id)"><Icon type="ios-trash-outline"size="20" />删除</Button>-->
          </template>

      </Table>
      <Modal
        v-model="modal6"
        title="文章分类删除"
        :loading="loading" draggable scrollable
        @on-ok="asyncOK">
        <p>你确认删除吗?</p>
      </Modal>
    </Card>
  </div>
</template>
<style scoped="">
  .text-right{
    margin-left: 15px;
  }
</style>
<script>
  import { getToken,getCookie } from '@/libs/util'
  import {mapActions} from 'vuex'
  import {removeCategory} from '@/api/article'
export default {
  data () {
    return {
      modal6: false,
      loading: true,
      id:'',
      columns: [
        {
          title: '序号',
          slot: 'id'
        },
        {
          title: '分类名',
          slot: 'name'
        },
        {
          title: '操作',
          slot: 'action'
        }
      ],
      data: [
      ]
    }
  },
  mounted(){
    this.getCargortys()
  },
  methods: {
    ...mapActions([
      'getCargorty'
    ]),
    getCargortys(){
      this.getCargorty().then(res=>{
        this.data = res.data
      }).catch(err=>{
      })
    },
    update (index) {
      this.$router.push({
        name: 'cargorty_update',
        params: {id: index, types: '修改'}
      })
    },
    add () {
      this.$router.push({
        name: 'cargorty_add',
        params: {types: '新增'}
      })
    },
    asyncOK(){
      removeCategory(this.id, getToken('token')).then(res=>{
        this.modal6 = false
      })
    },
    remove (index) {
      this.modal6 = true
      this.id=index
    },
  }
}
</script>
