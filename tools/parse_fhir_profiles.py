import json, re, glob, os

BASE = "/workspace/tonnard-verpaele/fhir"

def parse(path, release):
    lines = open(path, encoding="utf-8").read().splitlines()
    prof = {"release": release, "file": os.path.relpath(path, BASE),
            "table": None, "items": [], "profile": None, "parent": None,
            "id": None, "title": None, "description": ""}
    mappings = []   # (path, target, note)
    rules = {}      # path -> [rule strings]
    pending_note = []
    section = None
    for raw in lines:
        line = raw.rstrip()
        s = line.strip()
        if not s:
            continue
        if s.startswith("//"):
            pending_note.append(s[2:].strip())
            continue
        if s.startswith("Mapping:"):
            section = "mapping"; pending_note = []; continue
        if s.startswith("Profile:"):
            section = "profile"; prof["profile"] = s.split(":",1)[1].strip(); pending_note = []; continue
        if s.startswith("Extension:"):
            section = "ext"; pending_note = []; continue
        if section == "mapping" and s.startswith(("Source:","Target:","Id:","Title:")):
            continue
        if section == "profile":
            for key, field in (("Parent:","parent"),("Id:","id"),("Title:","title"),("Description:","description")):
                if s.startswith(key):
                    val = s.split(":",1)[1].strip().strip('"')
                    prof[field] = val
                    break
            else:
                if s.startswith("* "):
                    body = s[2:].strip()
                    m = re.match(r'^extension contains (\S+) named (\S+) (\S+)$', body)
                    if m:
                        p = "extension[%s]" % m.group(2)
                        rules.setdefault(p, []).append("%s (extension %s)" % (m.group(3), m.group(1).rsplit("/",1)[-1]))
                        pending_note = []
                        continue
                    m = re.match(r'^(\S+)\s+(\d+\.\.[\d*]+)$', body)
                    if m:
                        rules.setdefault(m.group(1), []).append(m.group(2))
                    else:
                        m = re.match(r'^(\S+)\s+(from .+|only .+|obeys .+|=.+)$', body)
                        if m:
                            rules.setdefault(m.group(1), []).append(m.group(2))
                        else:
                            rules.setdefault(body, []).append("")
                    if pending_note:
                        rules.setdefault("__notes__:" + body.split()[0], []).append(" ".join(pending_note))
                    pending_note = []
            continue
        if section == "mapping" and s.startswith("* "):
            body = s[2:]
            m = re.match(r'^(.*?)\s*->\s*"(.*)"$', body)
            if m:
                p = m.group(1).strip()
                target = m.group(2)
                note = " ".join(pending_note) if pending_note else ""
                if p == "":
                    prof["table"] = target
                else:
                    mappings.append((p, target, note))
            pending_note = []
            continue
        pending_note = []

    order = [p for p, _, _ in mappings]
    for p in rules:
        if p.startswith("__notes__:"):
            continue
        if p not in order:
            order.append(p)
    # hoist a rule-only parent path in front of its first mapped child
    for extra in [p for p in order if not any(mp == p for mp, _, _ in mappings)]:
        children = [i for i, o in enumerate(order) if o.startswith(extra + ".") or o.startswith(extra + "[")]
        if children:
            order.remove(extra)
            order.insert(min(children), extra)

    seen = set()
    for p in order:
        if p in seen:
            continue
        seen.add(p)
        target = next((t for pp, t, _ in mappings if pp == p), None)
        note = next((n for pp, _, n in mappings if pp == p and n), "")
        extra = rules.get("__notes__:" + p, [])
        if extra:
            note = (note + " " + " ".join(extra)).strip()
        prof["items"].append({
            "path": p,
            "sql": target,
            "rules": [r for r in rules.get(p, []) if r],
            "note": note,
        })
    return prof

profiles = []
for rel, folder in (("R4", "r4"), ("R5", "r5")):
    for f in sorted(glob.glob(f"{BASE}/{folder}/input/fsh/EHR*.fsh")):
        profiles.append(parse(f, rel))

out = "/tmp/claude-0/-workspace-demo-sdk/7ad83d47-8b42-59aa-b2db-ad228a85fd56/scratchpad/profiles.json"
json.dump(profiles, open(out, "w", encoding="utf-8"), indent=1, ensure_ascii=False)
print(len(profiles), "profiles,", sum(len(p["items"]) for p in profiles), "items")
for p in profiles:
    print(f'{p["release"]:3} {p["id"]:32} {p["title"]:34} table={p["table"]:45} items={len(p["items"])}')
