# SPDX-FileCopyrightText: 2026 Joe Heffer
#
# SPDX-License-Identifier: CC0-1.0

"""MkDocs hook that points links outside docs/ at the files on GitHub.

The Markdown in docs/ links to files elsewhere in the repository, such as
../hardware/bom.csv. Those links work when browsing on GitHub but not on the
website, which is built from docs/ only. This hook rewrites them to GitHub
URLs, so the same Markdown works in both places.
"""

import posixpath
import re
from pathlib import Path

GITHUB = "https://github.com/Joe-Heffer/dimpsy"
BRANCH = "main"

# Inline Markdown links and images: ](target) or ](target "title").
LINK = re.compile(r"\]\((?P<target>[^)\s]+)(?P<rest>[^)]*)\)")
FENCE = re.compile(r"^(```|~~~)")


def _rewrite(target, page_dir, repo_root):
    if re.match(r"^[a-z][a-z0-9+.-]*:|^#|^/", target, re.IGNORECASE):
        return None
    path, _, fragment = target.partition("#")
    resolved = posixpath.normpath(posixpath.join(page_dir, path))
    if not resolved.startswith("../"):
        return None
    repo_path = posixpath.normpath(posixpath.join("docs", resolved))
    if repo_path.startswith("../"):
        return None
    kind = "tree" if (repo_root / repo_path).is_dir() else "blob"
    url = f"{GITHUB}/{kind}/{BRANCH}/{repo_path}"
    return f"{url}#{fragment}" if fragment else url


def on_page_markdown(markdown, page, config, files):
    repo_root = Path(config["config_file_path"]).parent
    page_dir = posixpath.dirname(page.file.src_uri)
    lines = []
    in_fence = False
    for line in markdown.splitlines(keepends=True):
        if FENCE.match(line.lstrip()):
            in_fence = not in_fence
        if not in_fence:
            def replace(match):
                url = _rewrite(match.group("target"), page_dir, repo_root)
                if url is None:
                    return match.group(0)
                return f"]({url}{match.group('rest')})"

            line = LINK.sub(replace, line)
        lines.append(line)
    return "".join(lines)
