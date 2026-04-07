#!/usr/bin/env python3
"""
sanitize_code.py - Simple Python code sanitizer.
Strips trailing whitespace, ensures consistent line endings (LF),
and validates basic syntax by attempting to compile.
"""
import sys
import py_compile
import tempfile
import os


def sanitize(filepath):
    """Sanitize a Python file: strip trailing whitespace, normalize line endings, check syntax."""
    if not os.path.isfile(filepath):
        print('ERROR: File not found: %s' % filepath)
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Normalize line endings to LF
    content = content.replace('\r\n', '\n').replace('\r', '\n')

    # Strip trailing whitespace from each line
    lines = content.split('\n')
    lines = [line.rstrip() for line in lines]
    content = '\n'.join(lines)

    # Ensure file ends with a newline
    if not content.endswith('\n'):
        content += '\n'

    # Remove consecutive blank lines (more than 2)
    while '\n\n\n' in content:
        content = content.replace('\n\n\n', '\n\n')

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    # Syntax check
    try:
        py_compile.compile(filepath, doraise=True)
        print('OK: %s - sanitized and syntax valid' % filepath)
        return True
    except py_compile.PyCompileError as e:
        print('SYNTAX ERROR in %s: %s' % (filepath, e))
        return False


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python sanitize_code.py <file.py> [file2.py ...]')
        sys.exit(1)
    success = True
    for fp in sys.argv[1:]:
        if not sanitize(fp):
            success = False
    sys.exit(0 if success else 1)
