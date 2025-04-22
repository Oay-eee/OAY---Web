/**
 * Commitlint Configuration
 *
 * This configuration enforces conventional commit messages using the
 * `@commitlint/config-conventional` preset with some custom rules.
 *
 * @see https://commitlint.js.org/
 *
 * Key Configuration:
 *
 * - **extends**: Inherits rules from `@commitlint/config-conventional`.
 * - **parserPreset**: Uses `conventional-changelog-atom` for commit message parsing.
 * - **formatter**: Formats output using `@commitlint/format`.
 * - **rules**:
 *   - `type-enum`: Enforces allowed commit types.
 *     - Allowed types:
 *       - `feat`: New feature
 *       - `fix`: Bug fix
 *       - `docs`: Documentation changes
 *       - `style`: Non-functional changes (e.g., formatting)
 *       - `refactor`: Code changes not fixing a bug or adding a feature
 *       - `perf`: Performance improvements
 *       - `test`: Test additions or corrections
 *       - `build`: Changes to the build system or dependencies
 *       - `ci`: CI-related changes
 *       - `chore`: Maintenance tasks not affecting source or tests
 *       - `revert`: Reverts a previous commit
 *
 *   - `scope-enum`: Enforces allowed scopes for commits.
 *     - Allowed scopes:
 *       - `setup`: Project setup
 *       - `config`: Configuration files
 *       - `deps`: Dependency updates
 *       - `feature`: Feature-specific changes
 *       - `bug`: Bug fixes
 *       - `docs`: Documentation
 *       - `style`: Code style or formatting
 *       - `refactor`: Code refactoring
 *       - `test`: Test-related changes
 *       - `build`: Build scripts or configuration
 *       - `ci`: Continuous integration changes
 *       - `release`: Release process
 *       - `other`: Miscellaneous changes
 */

import type { UserConfig } from "@commitlint/types";

const Configuration: UserConfig = {
  extends: ["@commitlint/config-conventional"],
  parserPreset: "conventional-changelog-atom",
  formatter: "@commitlint/format",
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
      ],
    ],
    "scope-enum": [
      2,
      "always",
      [
        "ui",
        "ci",
        "bug",
        "deps",
        "test",
        "docs",
        "auth",
        "build",
        "setup",
        "other",
        "style",
        "config",
        "release",
        "feature",
        "refactor",
      ],
    ],
  },
};

export default Configuration;
