# Public-first Publication Policy

This repository is intended to be public from its first remote commit. Every tracked file and commit message must therefore be safe to publish permanently.

## Publishable material

- Transferable technical concepts supported by public sources
- Original explanations, diagrams, exercises, and synthetic examples
- Generic architecture with non-identifying component names
- Learning records that state demonstrated capabilities without private context
- Assets that are original, generated with documented provenance, or licensed for reuse

## Material that must never be committed

- Private source code or close paraphrases of distinctive implementations
- Internal repository names, filesystem paths, domains, endpoints, package coordinates, schemas, table names, system names, or topology
- Business data, user data, employee information, account details, portfolio values, addresses, contracts, or private conversations
- Cookies, tokens, credentials, request signatures, environment files, or unredacted network requests
- Internal documentation, screenshots, logs, metrics, traces, incident details, or unpublished business rules
- Local notes under `NOTES.md`, `private/`, or `raw/`

Replacing names with placeholders does not automatically make material safe. A distinctive combination of flow, behavior, and failure semantics may still identify a private system. When publication safety is uncertain, leave the material out.

## Source-use rule

Private projects may be inspected live and read-only to verify the learner's understanding. They are evidence for the private teaching interaction, not sources for the public lesson.

Public claims should cite public primary sources. Code examples must be independently written for the concept being taught. Production changes, data access, or operational checks require a separate task and explicit authorization.

## License classification

- Original prose, lessons, diagrams, learning records, and non-code learning assets use CC BY 4.0.
- Original source code, code samples, and executable components use the MIT License.
- Third-party material keeps its original license and required attribution.
- A file-specific license notice takes precedence when a future artifact needs different terms.

## Before staging

- Confirm that every new file belongs in the public learning record.
- Remove local notes and raw evidence rather than trying to sanitize them in place.
- Confirm that third-party material has a suitable license and attribution.
- Check image metadata and visible content for private information.

## Before committing

1. Verify the effective author identity:

   ```bash
   git config user.name
   git config user.email
   ```

2. Review the exact staged file list and diff:

   ```bash
   git diff --cached --name-status
   git diff --cached --check
   git diff --cached
   ```

3. Search the staged content for organization-only identifiers, credentials, local absolute paths, and private names.
4. Read the commit message as public metadata.
5. Stop when the result is uncertain. Deleting a later commit does not remove sensitive material from existing Git history or remote clones.

## Before pushing

- Read back the exact remote URL and visibility.
- Verify the local branch and commits that will be published.
- Confirm that the selected license matches the intended reuse policy.
- Push once, then read back the public repository state. Never automatically retry an uncertain external write.

## If a leak is suspected

Stop publishing immediately. Rotate any exposed credential, determine what reached the remote, and treat history cleanup as a separate destructive operation. Do not assume deleting the working-tree file or the latest commit is sufficient.
