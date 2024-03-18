---
title: Santa Cypher - A seasonal encoder
date: "2020-12-01"
display_toc: true
---

Full code: [github.com/tom-on-the-internet/santa-cypher](https://github.com/tom-on-the-internet/santa-cypher).\
Website here: [santa-cypher.tomontheinternet.com](https://santa-cypher.tomontheinternet.com)\
Video here: [Youtube](https://youtu.be/dksyFORajJA)

## I'm not great at bash

But I'm trying to get better.

People say: "Build things in Bash to get better at Bash!"

Ok. Here's something...

## It starts with a stupid idea

I wonder if I could write a program in Bash that could encode messages into Santa's laughter. I could send messages around that look like Holiday Cheer, but actually contain a hidden message. How hard would that be? Turns out, not hard. Sort of.

## Goal

GIVEN `santa`\
RETURN `HoHoHo🎅HoHO🎅HOHo🎅HO🎅HoHO🎅`

GIVEN `HoHoHo🎅HoHO🎅HOHo🎅HO🎅HoHO🎅`\
RETURN `SANTA`

## How can we do the encoding

Morse code!

`▄▄  (dot) = Ho`\
`▄▄▄ (dash) = HO`

And 🎅 can indicate the end of a letter.

## But how can we do a look up in Bash

Using associative arrays. Yes! Bash has them. It has since 2009.

An associative array is a `key` `value` store. In Python they're called dictionaries. In Golang they're called maps. In JavaScript most of the time we use object literals, but we have maps in JavaScript now too.

## Using associative arrays in Bash

```bash
# make the array
declare -A MY_ARRAY

# insert into the array
MY_ARRAY[MY_KEY]="i am a value"

# access a value in the array
${MY_ARRAY[MY_KEY]}
```

## Now that we have our associative array

We can look up letters in in our array.

`S = HoHoHo🎅`\
`T = HO🎅`

But that means that we lose capitalization differences. _Fine!_

Let's do this: capitalize the input and throw out anything but alphanumeric characters, spaces, and a bit of punctuation. We won't get 100% fidelity, but that's not _too_ important in a cypher, right?

To do this we'll use `tr`, a program used to "translate or delete characters".

`input=$(echo "$input" | tr '[:lower:]' '[:upper:]' | tr -cd '[:alnum:][:space:].!?')`

So, `Let's talk, ok?` becomes `LETS TALK OK?`

Now we loop through each character and replace it with the Hohos from the map. Anything not in the map we leave as is. After each chunk of Hohos we'll add our break character: 🎅

```bash
  output=""

  for ((i = 0; i < ${#input}; i++)); do
    char=${input:$i:1}
    if [[ -v "CYPHER[$char]" ]]; then
      output="$output"${CYPHER[$char]}$break_char
    else
      output="$output"$char
    fi
  done

  echo "$output"
```

So now `SANTA` has become `HoHoHo🎅HoHO🎅HOHo🎅HO🎅HoHO🎅`

## We're halfway there!

Now we need to take our encoded message and turn it back into something _pretty close_ to what it originally looked like.

But first we need to figure out, given some text, should we **encode** it or **decode** it?

We can check if the input only contains these characters: `🎅 H h O o . ! ?`

If the input only contains those characters, we can safely try to decode it.

```bash
break_char=🎅

# checks if the input is already encoded
is_hohoho() {
  stripped=$(echo "$input" | tr -cd "$break_char"".!? "HOho)
  [ "$input" = "$stripped" ]
}
```

## Decoding Santa

Decoding is a bit trickier. We want to grab bunches of `HoHo`s, but stop at a 🎅. To do this we can use `awk` to grab all characters up to the 🎅. Then we look up the match in our associative array. If we are dealing with a non Santa or Hoho character, we let it through unaltered.

```bash
# decodes from hohoho
to_text() {
  output=""

  while [ -n "$input" ]; do
    # if char is !hoHO🎅
    char=${input:0:1}
    if [[ $char =~ (H|O|h|o|🎅) ]]; then
      string=$(echo "$input" | awk -F🎅 '{print $1}')
      match="${CYPHER[$string]}"
      output="$output""$match"
      chars_to_remove=$((${#string} + 1))
      input="${input:$chars_to_remove}"
    else
      output="$output"$char
      input="${input:1}"
    fi
  done
```

All done!

## Suggested use cases

There are many places that Santa Cypher could we used.

1. Jokes in Slack.
2. Jokes in Discord.
3. Production encryption for sensitive personal information. (not really, settle down)

## Is bash really a good fit for this sort of thing?

Almost certainly not. Bash is great for gluing other programs together, but for this type of problem a language like Go would probably be a better fit. But bash is fun and ubiquitous, so it's good to get comfortable with it.
