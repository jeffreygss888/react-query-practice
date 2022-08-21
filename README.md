# React-Query-Practice

Take note this sample project uses react-router v3 so and the latest version is already at v4 so take note of the new changes when starting from scratch.

## V4 Changes

### useQuery() keys

If we don't see network request wrap the key in the useQuery inside an array.

### ReactQueryDevTools

To get this to work with react-query@4, I had to do the following:

in the command line:
npm install @tanstack/react-query -S
npm install @tanstack/react-query-devtools -D
npm rm react-query -S

update import statements in App.js:
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

update import statement in RQSuperHeroes.js to:
import { useQuery } from '@tanstack/react-query'
