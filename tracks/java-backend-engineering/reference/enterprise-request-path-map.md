# Reference: Enterprise Java Request-Path Map

An illustrative map of common enterprise Java backend responsibilities.
It does not describe or verify any particular system. Applications may combine
layers or use different process boundaries and protocols. Classify by
responsibility, not by class name.

## Two views of "layering"

### Deployment view — which processes a request crosses

```
browser / frontend app
  │  HTTP + JSON
edge / gateway  (routing, load balancing, edge auth, rate limiting)
  │
web-tier service  (facade for the frontend: protocol conversion,
  │                aggregation, response shaping; no DB access)
  │  RPC (cross-process call)
business service  (business rules, transactions, DB access)
  │  JDBC / ORM (SQL)
database
```

Side dependencies hang off the services: cache, message queue, other services
(via RPC), configuration center.

First diagnostic step for "which layer does this problem belong to": identify
**which process**, then **which code inside that process**.

### In-process view — layers inside one Java service

| Responsibility | What it owns | Typical names |
| --- | --- | --- |
| Protocol boundary | transport ↔ objects; param validation; auth context; unified error response | Controller, handler, VO |
| Use-case orchestration | one method = one business action; calls multiple downstreams; transaction boundary | Application, Service, Facade |
| Domain logic | business rules, state machines, composition of data operations | Manager, Service, domain |
| Data access | SQL, object ↔ table mapping | DAO, Mapper, Repository |

Not every codebase has a separate class per layer; some collapse use-case and
domain logic. The four responsibilities still exist somewhere.

### Annotation-driven machinery

Java annotations are inert metadata compiled into the class file; they do
nothing by themselves. A runtime consumer — interceptor, AOP proxy, framework —
reads them via reflection before or around the target method and executes the
behavior. Contrast with TypeScript decorators, which are functions that execute
at class-definition time. Consequence: to understand what an annotation does,
find its consumer. The consumer often lives in a shared library outside the
repository — follow the import to the dependency jar and, when necessary, read
the bytecode (`javap`).

## Failure fingerprints per layer

| Layer | Typical problems | How they get introduced | Frequency |
| --- | --- | --- | --- |
| Gateway | 404 / routing errors, rate-limit false positives, wrong timeout defaults | config or deploy changes | rare, high blast radius |
| Controller | 400 binding errors, missing validation, leaked internal errors, wrong auth context | new endpoints, field renames | very high, easy to locate and fix |
| Orchestration | wrong transaction boundary, unhandled partial failure, N+1 downstream calls, bloated aggregation | requirement iteration | high |
| Domain logic | state-machine holes, concurrent duplicate submits, missing idempotency, wrong rules | misunderstood business rules | high, hardest class — the "real" business bugs |
| RPC boundary | bad timeout / retry config, serialization incompatibility, downstream failure propagation | independent upstream / downstream changes | medium-high |
| DAO / SQL | slow queries, missing indexes, N+1 queries, large transactions, field mapping errors | data growth exposing old code | very high |
| Database | lock waits, deadlocks, connection-pool exhaustion | concurrency and scale | common at scale |
| Cache (cross-cutting) | cache inconsistency, penetration / stampede | introduced when caching is added | inevitable once introduced |
| Messaging (cross-cutting) | lost messages, duplicate consumption, ordering | introduced when async is added | inevitable once introduced |

## Triage: three questions

1. **Did the transport succeed?** HTTP status / RPC reply / timeout —
   distinguish "never arrived" from "arrived and failed".
2. **How far did the business logic get?** Follow one trace ID through the logs —
   which layer stopped.
3. **Is the final data state correct?** Stored data vs expectation — separates
   process failure from wrong-result success.

These map to transport success, business failure, downstream failure, timeout,
and partial-success behavior in the mission.

Note the two-view trap: one failure can classify differently on each side.
When a caller times out and gives up, the server-side work is still running —
the caller experiences a transport-level failure while the server experiences
an in-flight request. Reconstruct both timelines before concluding.

## Timeout budget and orphan work

A caller's timeout does not cancel downstream work. After the caller gives up,
the in-flight work continues holding its thread, DB connection, and memory
(orphan work) and completes with no consumer.

A single orphan is harmless. Sustained slowness converts orphans into
exhaustion by Little's Law: concurrency = arrival rate × mean duration. The
pool fills, requests queue, more of them time out and become orphans, and
requests that would otherwise have succeeded start failing — the cascade.
Retries and user refresh amplify the arrival rate.

Correct design: each hop's timeout exceeds the sum of all downstream hops'
timeouts, so the innermost hop times out first and errors bubble up quickly —
no hop does doomed work. Circuit breaking (pause calls after consecutive
failures, probe periodically) and rate limiting (reject excess load to protect
the pool) are the adjacent defenses.

## How the curriculum traverses this map

1. **Read path (in-process spine)** — one query from protocol boundary to SQL
   and back; see the four responsibilities in real code.
2. **Write path** — validation → transaction → persistence → rollback →
   partial failure.
3. **Cross-process boundary** — web → RPC → service; timeout, retry, failure
   propagation; why the split exists and what it costs.
4. **Cross-cutting concerns** — cache consistency, async messaging, idempotency,
   concurrency.

Each lesson: predict → trace code → reverse classification drill (symptom →
layer) → public lesson written from transferable concepts.
