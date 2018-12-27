# appstoreconnect

An unofficial REST client for Apple's App Store Connect API, for use with Node.js.

## Installation

```
npm i -S appstoreconnect
```

## Usage

```javascript
import { v1 } from 'appstoreconnect'

const api = v1()
// Read .p8 private key from disk or from environment, and supply the issuer ID and key identifier as outlined here:
// https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests
api.token = v1.token()

v1
  .testflight
  .listBuilds(api, {})
  .then(builds => console.log(builds))
  .catch(err => console.error(err))
```

## Examples

This is an ongoing work in progress so I don't have a ton of examples yet. If you have an idea for an example, please feel free to [file an issue](https://github.com/aaronsky/appstoreconnect/issues/new) or a [pull request](https://github.com/aaronsky/appstoreconnect/pulls/new)!

1. [Getting Started](./examples/getting-started.js)

## License

This code is licensed under the [MIT License](./LICENSE). 

## TODO

- [ ] Fully stub App Store Connect API
  - [x] Confirm basic functionality
  - [ ] Confirm complex edge cases (complex queries, mutating calls, non-JSON responses, etc.)
  - [ ] Determine work involved in stubbing a v2 API and compatibility between different components
- [ ] Testing
  - [ ] Write end-to-end tests to confirm interface and design
  - [ ] Write unit tests for individual, internal components
  - [ ] Run tests on CI
- [ ] Improve documentation
  - [ ] Add more examples
  - [ ] Improve code comments around API surface
  - [ ] Update README
  - [ ] Produce API reference site when new tags are pushed
