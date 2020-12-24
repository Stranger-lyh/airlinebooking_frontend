<template>
  <Row>
    <Form :label-width="80">
        <FormItem label="账号id">
          <div class="input_width_150">
            <Input v-model="id" />
          </div>
        </FormItem>
        <FormItem label="账号密码">
          <div class="input_width_150">
            <Input v-model="password" />
          </div>
        </FormItem>
        <FormItem label="身份证号">
          <div class="input_width_150">
            <Input v-model="idcard" />
          </div>
        </FormItem>
        <FormItem label="姓名">
          <div class="input_width_150">
            <Input v-model="name" />
          </div>
        </FormItem>
        <FormItem label="联系方式">
          <div class="input_width_150">
            <Input v-model="phone" />
          </div>
        </FormItem>
        <FormItem label="会员等级">
          <div class="input_width_150">
            <Input v-model="vip" />
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit">Submit</Button>
          <Button  style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
  </Row>
</template>
<script>
import { getErrModalOptions } from '@/libs/util'
import { addAccount } from '@/api/addInfo'
export default {
  name: 'AccountAdd',
  data () {
    return {
      id: '',
      password: '',
      idcard: '',
      name: '',
      phone: '',
      vip: ''
    }
  },
  methods: {
    async handleSubmit () {
      try {
        await addAccount({
          accountid: this.id,
          secret: this.password,
          customerid: this.idcard,
          name: this.name,
          telnum: this.phone,
          levelid: this.vip,
          balance: '1000'
        })
        this.$Message.success('success')
      } catch (error) {
        this.$Modal.error(getErrModalOptions(error))
      }
    }
  }
}
</script>
<style>
.input_width_150{
    width:150px;
}
</style>
