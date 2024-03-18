---
title: Matrix Digital Rain in a single JavaScript file
date: "2023-11-08"
---

I recently recreated the Digital Rain from the Matrix in JavaScript.

I'll link the repo [here](https://github.com/tom-on-the-internet/matrix-digital-rain), but also paste the entire file below for you to checkout.

Just know that I won't update this blog post, so the code in the repo might be newer than the code below.

Here's a picture:

![Matrix Digital Rain](images/matrix.png)

Here's the code:

```js
#!/usr/bin/env node

// Hi! This is the Digital Rain from the film The Matrix.
// This is meant to be run in a terminal.
//
// My name is Tom and I wrote this. You can visit my website at tomontheinternet.com
//
// You are free to change this code, copy it, claim you wrote it, etc. I hope you have fun
// and maybe even learn something.

/**
 * CHARACTERS is a list of characters that will be randomly selected from.
 * These characters look like the ones from the matrix, but you can use whatever you want.
 */
const CHARACTERS =
  "日ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍｦｲｸｺｿﾁﾄﾉﾌﾔﾖﾙﾚﾛﾝ1234567890:・.=*+-<>¦｜"

/**
 * SECRET_MESSAGE is a message that will sometimes appear in rain.
 */
const SECRET_MESSAGE = " TOM ON THE INTERNET.COM "

/**
 * TICK_TIME_IN_MS is how often the next set of letters will appear. 80 milliseconds feels
 * right to me.
 */
const TICK_TIME_IN_MS = 80

/**
 * terminal is a helper object that provides some functions for writing to the
 * terminal.
 */
const terminal = {
  move: (x, y) => process.stdout.write(`\x1b[${y};${x}H`),
  write: (str) => process.stdout.write(str),
  clear: () => process.stdout.write("\x1b[2J"),
  colors: {
    green: () => process.stdout.write("\x1b[32m"),
    white: () => process.stdout.write("\x1b[37m"),
  },
  cursor: {
    show: () => process.stdout.write("\x1b[?25h"),
    hide: () => process.stdout.write("\x1b[?25l"),
  },
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * randomCharacter returns a random character from the CHARACTERS string.
 * This is used to generate the rain.
 */
function randomCharacter() {
  return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
}

/**
 * makeRainColumn generates a column, which is a list of characters,
 * a head position (how far has the rain drop traveled), and a startIn value
 * that acts as a delay.
 */
function makeRainColumn(height) {
  const chars = Array.from(Array(height)).map(() => randomCharacter())

  // 1 in 20 chance of a rare column
  const rare = randomInt(1, 20) === 1
  if (rare) {
    const buffer = randomInt(1, 10)
    for (let i = 0; i < SECRET_MESSAGE.length; i++) {
      chars[i + buffer] = SECRET_MESSAGE[i]
    }
    chars[randomInt(0, height - 1)] =
      SECRET_MESSAGE[randomInt(0, SECRET_MESSAGE.length - 1)]
  }

  return { head: 1, startIn: randomInt(1, 150), chars }
}

/**
 * tick moves the rain down one row and draws the next character in the column.
 * If the column is at the bottom of the screen, it start removing characters
 * from the top.
 */
function tick(rainColumns) {
  for (let colIdx = 1; colIdx <= rainColumns.length; colIdx++) {
    const rainColumn = rainColumns[colIdx - 1]

    // this is to make the rain start at different times
    // there is a startIn delay that we slowly remove
    if (rainColumn.startIn > 0) {
      rainColumn.startIn--
      continue
    }

    const headHasLeftScreen = rainColumn.head > process.stdout.rows

    if (headHasLeftScreen) {
      // if the head has left the screen, we start removing from the tail
      terminal.move(colIdx, rainColumn.head - process.stdout.rows)
      terminal.write(" ")
    } else {
      // if the head has not left the screen
      // we move to the head and draw a white character
      // Also, we turn the previous head green if it exists
      rainColumn.head
      terminal.move(colIdx, rainColumn.head)
      terminal.colors.white()
      terminal.write(rainColumn.chars[rainColumn.head - 1])
      terminal.move(colIdx, rainColumn.head - 1)
      terminal.colors.green()
      if (rainColumn.head - 2 >= 0) {
        terminal.write(rainColumn.chars[rainColumn.head - 2])
      }
    }

    const headHasJustLeftScreen = rainColumn.head === process.stdout.rows + 1
    if (headHasJustLeftScreen) {
      // make sure the bottom character is also set to green
      terminal.move(colIdx, process.stdout.rows)
      terminal.write(rainColumn.chars.at(-1))
    }

    // this section handles randomly changing characters
    // it's a bit hacky, but works fine.
    const random = randomInt(1, process.stdout.rows * 4)
    if (
      random > 0 &&
      random < process.stdout.rows &&
      random < rainColumn.head - 1 &&
      random > rainColumn.head - process.stdout.rows
    ) {
      terminal.move(colIdx, random)
      terminal.write(randomCharacter())
    }

    // advance the head
    rainColumn.head++

    const rainHasFullyLeftScreen = rainColumn.head > process.stdout.rows * 2
    if (rainHasFullyLeftScreen) {
      // create a new rainColumn for this column
      rainColumns[colIdx - 1] = makeRainColumn(process.stdout.rows)
    }
  }
}

/**
 * handleExit listens for the user to press the "q" key or ctrl-c and then
 * exits the process.
 */
function handleExit() {
  process.stdin.setRawMode(true)
  process.stdin.resume()
  process.stdin.setEncoding("utf8")

  process.stdin.on("data", async (key) => {
    const value = key.toString().trim()

    if (value === "q" || value === "\u0003") {
      terminal.cursor.show()
      terminal.move(0, process.stdout.rows)
      process.exit(0)
    }
  })
}

/**
 * handleResize listens for the user to resize the terminal and then redraws
 * the rain.
 */
function handleResize(rainColumns) {
  process.on("SIGWINCH", () => {
    terminal.clear()
    rainColumns.length = 0
    for (let i = 0; i < process.stdout.columns; i++) {
      rainColumns.push(makeRainColumn(process.stdout.rows))
    }
  })
}

/**
 * main starts the program.
 */
function main() {
  // rainColumns is an array of objects that represent each column of rain.
  // This is the state of the program.
  const rainColumns = Array.from(Array(process.stdout.columns)).map(() =>
    makeRainColumn(process.stdout.rows)
  )

  handleExit()
  handleResize(rainColumns)
  terminal.cursor.hide()

  setInterval(() => tick(rainColumns), TICK_TIME_IN_MS)
}

main()
```
