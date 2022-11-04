# API Documentation

## Using the API (from the client)

```ts
// Import the API class
import API from "src/api"

// Make a request to the API
// This should all be type checked with typescript
API.makeRequest("demo"/* Route */ { example:"data" } /* Data Payload */)

```


## Createing API endpoints (on the server)

Each endpoint will have it's own file in the `pages/api` directory
The types related to this endpoing (resolved value and input data types) should be declared and exported in this file

The handler must be the default export in this file

The two basic types are TypedGetEndpoint and TypedPostEndpoint

A basic handler might look like this

```ts
// pages/api/demo.ts

import { TypedGetEndpoint } from '../../src/lib/types/request';


export interface DemoArgs {
  arg1: string,
  other: number,
}

export interface DemoReturn {
  returnValue: string,
}

const handler: TypedGetEndpoint<DemoArgs, DemoReturn> = (req, res) => {
  res.status(200).json({ returnValue: "return" });
}
```

For each api route made, it must be registered in the `src/api.ts` file as well.
This is done by adding it to the `I[Get/Post]Endpoints` interface.
The key will be the string version of the route, and the value will be an `EndpointHandler` type 
with the same generic arguments as the endpoint handler.


```ts
interface IGetEndpoints {
  "demo": EndpointHandler<DemoArgs, DemoReturn>,
}
```
