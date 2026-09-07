# Learning Loop

> A public record of continuous learning through small lessons, practice, feedback, and revision.

Learning Loop is a collection of independent learning tracks. Each track has one concrete mission and grows through a repeated cycle:

```text
learn -> practice -> feedback -> revise -> retrieve
```

The repository is public by design. Lessons may be validated against authorized real-world projects, but this repository contains only transferable knowledge, synthetic examples, and public-safe learning records.

## Tracks

| Track | Mission | Status |
| --- | --- | --- |
| [`java-backend-engineering`](./tracks/java-backend-engineering/) | Learn to trace, change, test, and explain enterprise Java backend behavior | Setting the foundation |
| [`codex-harness`](./tracks/codex-harness/) | Build a concept-level map of the open-sourced Codex agent harness (codex-rs): mechanisms, trade-offs, and crate-level evidence | Lesson 0001 published |

## How a track works

Each track owns its learning state:

- `MISSION.md` defines the practical outcome, constraints, and boundaries.
- `RESOURCES.md` curates high-trust knowledge sources and real-world feedback channels.
- `lessons/` contains short, self-contained lessons.
- `reference/` contains compact material meant for repeated use.
- `learning-records/` records demonstrated understanding, corrected misconceptions, and meaningful mission changes.
- `assets/` contains reusable components shared by lessons in that track.

Directories are created only when they have real content. Empty scaffolding is deliberately avoided.

## Public-first boundary

Private source material may be inspected live to verify understanding. It is never copied, linked, or mirrored here. Public artifacts use generic architecture, independently written examples, and public references.

See [PUBLICATION.md](./PUBLICATION.md) before staging or publishing any change. The repository design is recorded in [DESIGN.md](./DESIGN.md).

## License

- Original prose, lessons, diagrams, learning records, and non-code learning assets are licensed under [CC BY 4.0](./LICENSE).
- Original source code, code samples, and executable components are licensed under the [MIT License](./LICENSE-CODE).
- Third-party material remains subject to its original license and attribution requirements.
