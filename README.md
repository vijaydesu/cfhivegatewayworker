Deploy HiveGateway using Cloudflare workers


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