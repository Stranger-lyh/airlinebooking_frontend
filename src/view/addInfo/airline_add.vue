<template>
<Row>
    <i-col span="8" offset="8">
        <Card>
            <Form :label-width="80">
                <FormItem label="起飞机场">
                  <Input/>
                </FormItem>
                <FormItem label="降落机场">
                  <Input/>
                </FormItem>
                <FormItem>
                  <Button type="primary">Submit</Button>
                  <Button  style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Card>
    </i-col>
</Row>
</template>
<script>
export default {
  name: 'AirlineAdd',
  data () {
    return {

    }
  }
}
</script>
<style>
</style>
