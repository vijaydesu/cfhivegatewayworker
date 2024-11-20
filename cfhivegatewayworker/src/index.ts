/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 * https://the-guild.dev/graphql/hive/docs/gateway/other-features/header-propagation
 * https://the-guild.dev/graphql/hive/docs/api-reference/gateway-config
 * 
 */

/*export default {
	async fetch(request, env, ctx): Promise<Response> {
		return new Response('Hello World!');
	},
} satisfies ExportedHandler<Env>;*/

import { createGatewayRuntime, createOtlpHttpExporter, createStdoutExporter } from '@graphql-hive/gateway'
import http from '@graphql-mesh/transport-http'
import { LogLevel } from '@graphql-mesh/utils';
import { KeyValueCache } from '@graphql-mesh/types'
import Logger from './CustomLogger';
import { useOpenTelemetry } from "@graphql-hive/gateway";
import CloudflareKVCacheStorage from "@graphql-mesh/cache-cfw-kv";
import CFWorkerKVCache from './CFKVCache'



export default {
	

	async fetch(request: any, env: any, ctx: any) {
		//console.log("Global KV Namespace : "+globalThis.HiveGateway);
		const logger=new Logger();
		const gateway = createGatewayRuntime(

			{
				// All options available in `gateway.config.ts` configuration can also be passed here.
				supergraph: {
					// The CDN type.
					type: 'hive',
					// The endpoint of CDN
					endpoint: 'https://cdn.graphql-hive.com/artifacts/v1/e41e9e21-6705-4502-b0e4-1d04dbf6da43/supergraph',
					// The API key provided by Hive Registry
					key: 'hv2ZGYyYmQxNGEtOTNlNS00ZjIwLTk3ZWYtZmU3OWVkMDdlNzFjOmM1Zjc5YjBjMjA4NGE4MzY5MDcyMTEzOWE4NjAxYjFiMzRkNjYyN2I='
				},
				//supergraph,
				transports: {
					http // http transport is required for subgraphs using standard GraphQL over HTTP.
				},
				landingPage: true,
				transportEntries: {
					'*': {
						headers: [
							['client_id', '{context.header.client_id}'],
							['client_secret', '{context.header.correalation-id}']
						]
					}
				},
				propagateHeaders: {
					fromClientToSubgraphs({ request, subgraphName }) {

						return {
							'client_id': request.headers.get('client_id'),
							'client_secret': request.headers.get('client_secret')
						}

					}
				},
				healthCheckEndpoint: '/healthcheck',
				readinessCheckEndpoint: '/readiness',

				/* plugins(ctx) {
					return [
					  useOpenTelemetry({
						logger: ctx.logger,
						exporters: [
						  createOtlpHttpExporter({
							url: "https://otlp.nr-data.net:4318",
							headers: {
							  apikey: '4c6dec88985c833a69df36f79536ef62FFFFNRAL',
							  OTEL_EXPORTER_OTLP_HEADERS:'apikey=4c6dec88985c833a69df36f79536ef62FFFFNRAL'
							},
						  }),
						],
						serviceName: "cf-hive-gateway-muletest", // Optional, the name of your service
						//tracer: 'CFHiveGatewayCustomTracer', // Optional, a custom tracer to use
						inheritContext: true, // Optional, whether to inherit the context from the incoming request
						propagateContext: true, // Optional, whether to propagate the context to the outgoing requests
						// Optional config to customize the spans. By default all spans are enabled.
						spans: {
						  http: true, // Whether to track the HTTP request/response
						  graphqlParse: true, // Whether to track the GraphQL parse phase
						  graphqlValidate: true, // Whether to track the GraphQL validate phase
						  graphqlExecute: true, // Whether to track the GraphQL execute phase
						  subgraphExecute: true, // Whether to track the subgraph execution phase
						  upstreamFetch: true, // Whether to track the upstream HTTP requests
						},
					  }),
					];
				  }, */

				/* OpenTelemetry: {
					exporters: [
						createOtlpHttpExporter({
							url: 'https://otlp.nr-data.net:4318',
							headers: {
								'OTEL_EXPORTER_OTLP_HEADERS': 'apikey=4c6dec88985c833a69df36f79536ef62FFFFNRAL',
								'apikey': '4c6dec88985c833a69df36f79536ef62FFFFNRAL',
								'OTEL_SERVICE_NAME': 'cf-hive-gateway-muletest',
								'OTEL_RESOURCE_ATTRIBUTES': 'service.instance.id=12345',
								'OTEL_ATTRIBUTE_VALUE_LENGTH_LIMIT': '4095',
								'OTEL_EXPORTER_OTLP_COMPRESSION': 'gzip',
								'OTEL_EXPORTER_OTLP_PROTOCOL': 'http/protobuf'
							}
						}),
						createStdoutExporter()
					],
					serviceName: 'cf-hive-gateway-muletest', // Optional, the name of your service
					//tracer: 'CFHiveGatewayCustomTracer', // Optional, a custom tracer to use
					inheritContext: true, // Optional, whether to inherit the context from the incoming request
					propagateContext: true, // Optional, whether to propagate the context to the outgoing requests
					// Optional config to customize the spans. By default all spans are enabled.
					spans: {
						http: true, // Whether to track the HTTP request/response
						graphqlParse: true, // Whether to track the GraphQL parse phase
						graphqlValidate: true, // Whether to track the GraphQL validate phase
						graphqlExecute: true, // Whether to track the GraphQL execute phase
						subgraphExecute: true, // Whether to track the subgraph execution phase
						upstreamFetch: true // Whether to track the upstream HTTP requests
					}
				}, */

				//logging: LogLevel.info
				logging: logger,
				cache: new CloudflareKVCacheStorage({
					logger,
					namespace: env.HiveGateway,
				  }), 
				  /*cache: new CFWorkerKVCache({
					logger,
					namespace: env.HiveGateway,
				  }),*/
				  responseCaching: {
					// global cache
					session: () => null
				  }

				//graphqlEndpoint : "/graphQLi"

				/*cache: {
					type : 'cfw-kv',
					namespace: 'HiveGateway' // The namespace of the KV
				   
				 }, 
				 responseCaching: {
				   session: () => null
				 }*/


			}
		);

		return await gateway(request, env, ctx);
	}
}
