# Learning Loop Design

Status: approved for local implementation on 2026-08-27.

## Purpose

Learning Loop is a public, long-running record of learning through small lessons, deliberate practice, feedback, and revision. It is intended to make progress observable without turning private work material into public documentation.

## Repository model

One Git repository contains multiple independent tracks under `tracks/`. A track is the unit of learning and has exactly one mission. The repository root provides shared navigation and publication policy; it does not have its own teaching mission.

```text
learning-loop/
├── README.md
├── DESIGN.md
├── PUBLICATION.md
└── tracks/
    └── <track>/
        ├── MISSION.md
        ├── RESOURCES.md
        ├── NOTES.md          # local only, ignored by Git
        ├── lessons/          # created when the first lesson exists
        ├── reference/        # created when reusable reference material exists
        ├── learning-records/ # created after learning is demonstrated
        └── assets/           # created when a lesson needs reusable components
```

## Teaching model

Each lesson follows this loop:

1. Select one narrow, real-world capability tied to the mission.
2. Ask the learner to predict or recall before receiving an explanation.
3. Inspect authorized source material read-only when real evidence is needed.
4. Separate confirmed facts, inference, and unknowns.
5. Give the learner a source-independent retrieval or application exercise.
6. Record learning only after the learner demonstrates understanding.
7. Publish only a generalized lesson built from public sources and original synthetic examples.

Coverage is not treated as evidence of learning. Learning records capture demonstrated capability, corrected misconceptions, prior knowledge that changes the teaching level, or a meaningful change to the mission.

## Private evidence and public knowledge

Authorized enterprise projects can supply realistic examples and verification. They remain separate from this repository:

- no source files are copied;
- no internal repositories are linked as submodules or symlinks;
- no internal paths, identifiers, endpoints, schemas, logs, screenshots, or topology are recorded;
- no production data is queried merely for teaching;
- source inspection is read-only by default;
- a production change is a separate task that requires its own purpose, authorization, and verification.

Public lessons express transferable concepts using generic component names, original diagrams, synthetic data, and independently written examples. Conceptual similarity is not sufficient protection when a combination of facts could reconstruct a private implementation; uncertain material stays unpublished.

## First track

The first track is `java-backend-engineering`. Request tracing is its initial learning method, starting with a read-only request before introducing writes, transactions, asynchronous work, retries, or idempotency.

The intended progression is:

1. Java code-reading essentials encountered in a real request path.
2. HTTP entry points and enterprise application layers.
3. Data models, persistence, and service-to-service calls.
4. Validation, writes, transactions, and consistency boundaries.
5. Error semantics, timeouts, retries, authorization, and observability.
6. Tests, small authorized changes, and independent verification.
7. JVM and concurrency topics grounded in observed engineering problems.

Go is intentionally deferred. A future Go track should transfer established backend concepts instead of combining a new language with a new engineering model.

## Git and publication

The canonical local project lives under `products/learning-loop`. Because that path inherits the machine's work identity, the repository uses a local Git identity of `yearthmain <yearthmain@gmail.com>`.

The intended remote is a public GitHub repository. Original learning content uses CC BY 4.0; original source code, code samples, and executable components use the MIT License. Third-party material retains its original terms. Creating the remote and pushing are separate publication decisions. Each external write requires an explicit review of the target, content, identity, and side effects.

## Deliberate omissions

The first version has no application runtime, generated site, shared design system, CI workflow, or sample backend. These may be added only when a real lesson or publication need justifies them.
