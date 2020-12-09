<template>
  <Row>
    <Form label-width=80>
        <FormItem label="航线id">
          <div style="width:150px;">
            <Input />
          </div>
        </FormItem>
        <FormItem label="起飞时间">
          <DatePicker type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
        </FormItem>
        <FormItem label="降落时间">
          <DatePicker type="datetime"  format="yyyy-MM-dd HH:mm" placeholder="Select date" style="width: 250px"/>
        </FormItem>
        <FormItem label="价格">
            <div style="width:150px;">
            <Input />
          </div>
        </FormItem>
        <FormItem label="票数">
            <div style="width:150px;">
            <Input />
          </div>
        </FormItem>
        <FormItem>
          <Button type="primary">Submit</Button>
          <Button  style="margin-left: 8px">Reset</Button>
        </FormItem>
    </Form>
  </Row>
</template>
<script>
export default {
  name: 'FlightAdd',
  data () {
    return {

    }
  }
}
</script>
<style>
</style>
