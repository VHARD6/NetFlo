# Security policy

## Reporting a vulnerability

Please don't open a public issue for a security problem. Report it privately through GitHub instead: open the [Security tab](https://github.com/anmolkapil/plexo/security) and click **Report a vulnerability**. Only the maintainer can see the report.

A useful report includes:

- what an attacker can do, and what they need first (a crafted link or file, a malicious website, code already running on the computer)
- the steps or a small test that shows it, and the NetFlo version and operating system
- a suggested fix, if you have one

## What to expect

NetFlo aims to address security reports promptly:

- a reply within a week
- an assessment, and a planned fix or an explanation, within a few weeks
- a new release once it's fixed, which reaches users through automatic updates

The advisory is published once the fix has been released, with credit to you unless you'd rather stay anonymous. Please keep the details private until then.

## Supported versions

Only the latest release gets security fixes. NetFlo updates itself, so most people are already on it.

## Scope

In scope:

- the NetFlo app for macOS, Windows, and Linux, including its download, torrent, and update code
- the browser extension in `extension/`
- the release workflows and build setup in this repository

Out of scope:

- problems in upstream Plexo or a dependency that NetFlo doesn't expose (please report those upstream at https://github.com/anmolkapil/plexo/security)
- a malicious server sending the wrong content for a link you chose to download, unless NetFlo makes it worse (for example, by writing outside the folder you picked)
