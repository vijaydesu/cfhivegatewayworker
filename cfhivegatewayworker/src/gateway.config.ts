import { defineConfig } from '@graphql-hive/gateway'
 
export const gatewayConfig = defineConfig({
 
  cache: {
    type :'cfw-kv',
    namespace: 'HiveGateway' // The namespace of the KV
  }
})