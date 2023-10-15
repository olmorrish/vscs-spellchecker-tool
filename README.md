# About

This is an internal spell-check tool for the game VSCS-II. It doesn't have any use outside of personal development of VSCS-II, and file paths are hard-coded, so it has no general use-case.

This tool simply takes all convo files (`.json`) and article/text files (`.md`), and runs a spell-checker against the contents. For game-specific words and regional spelling, a dictionary of custom words is included in `dictionary.txt`, which is fed into the spell-checker at runtime.

## Data Format

For future reference, a Dialogue node in the convo files looks like this:

```json
 {
    "id":"0",
    "nodetype":"Dialogue",
    "speaker":"Emma",
    "contents":[
        "Oh good, looks like you got it booted up ok.",
        "Guess I should check - my messages are getting through to you, right?"
    ],
    "next":"1",
    "nodeposition":[-122.611999511719,574.762878417969]
}
```

All non-"Dialogue" type chat nodes are filtered out, and only contents are scanned. 