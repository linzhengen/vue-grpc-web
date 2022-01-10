<template>
  <p>
    Recommended IDE setup:
    <a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Docs
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
  </p>

  <button type="button" @click="count++">count is: {{ count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script lang="ts">
import {ref} from 'vue'
import * as grpcWeb from 'grpc-web'
import {EchoClient} from '../protobuf/pb/echo/EchoServiceClientPb'
import {EchoRequest, EchoResponse} from '../protobuf/pb/echo/echo_pb'

export default {
  setup() {
    const content = ref<string>('')
    const count = ref(0)
    const client = new EchoClient("http://localhost:9000")

    const echo = () => {
      const request = new EchoRequest()
      request.setContent((new Date()).toDateString())
      client.echo(request, null,
          (err: grpcWeb.RpcError, response: EchoResponse) => {
            if (err) {
              console.error('Error code: ' + err.code + ' "' + err.message + '"')
            } else {
              content.value = response.getContent()
            }
          })
    }
    return {
      count,
      content,
      echo
    }
  },
}
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
