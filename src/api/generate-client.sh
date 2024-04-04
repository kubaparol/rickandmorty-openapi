#!/bin/bash

openapi-generator generate -i src/api/spec.yml -g typescript-fetch -o src/api/api-client-generated