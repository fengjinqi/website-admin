<template>
  <div>
    <div id="test-editormd">
      <textarea  name="" id=""  class="form-control" cols="30" rows="10"v-model="content"></textarea>
    </div>
  </div>
</template>

<script>
  import jquery from 'jquery'
export default {
  props:{
    content:[String]
  },
  created () {

    let test = this
    jquery(function () {
      test.testEditor = editormd('test-editormd', {
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
  },
}
</script>

<style>

</style>
