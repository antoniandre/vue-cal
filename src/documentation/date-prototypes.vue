<template lang="pug">
h1.title1 Date Prototypes

p
  | Vue Cal has no dependency and performs date operations through a few notable useful and efficient functions that
  | have been added to the native #[span.code Date] class for your convenience.#[br]
  strong.mr2.
    With this set of functions, you will most likely not need #[em Moment.js] or any other additional Date library!#[br]#[br]
    Once Vue Cal is loaded, you can access the following functions from anywhere in your code
    just like a simple #[span.code Date] function.#[br]
  | E.g. #[span.code (new Date()).addDays(2)]

ul
  li.mt3
    code.text-bold.mr2 .addDays(days)
    | Adds days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code days]` is an integer.
  li.mt3
    code.text-bold.mr2 .subtractDays(days)
    | Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code days]` is an integer.
  li.mt3
    code.text-bold.mr2 .addHours(hours)
    | Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code hours]` is an integer.
  li.mt3
    code.text-bold.mr2 .subtractHours(hours)
    | Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code hours]` is an integer.
  li.mt3
    code.text-bold.mr2 .addMinutes(minutes)
    | Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code minutes]` is an integer.
  li.mt3
    code.text-bold.mr2 .subtractMinutes(minutes)
    | Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
    | `#[span.code minutes]` is an integer.
  li.mt3
    code.text-bold.mr2 .getWeek()
    | Returns the week number (1 #[a(href="#there-can-be-53-weeks-in-a-year") to 53]) of a date.
  li.mt3
    code.text-bold.mr2 .isToday()
    | Returns #[span.code true] if the date is Today.
  li.mt3
    code.text-bold.mr2 .isLeapYear()
    | Returns #[span.code true] if the date is in a leap year.

h3.mt4 And because everyone needs a Date/time formatting function...
p It is now available directly from the Date object, with your loaded locale!

ul
  li.mt3
    code.text-bold.mr2 .format(format)
    div.
      Returns a formatted date string.
      Default format is #[span.code 'YYYY-MM-DD'], but you can use any formatting keyword from
      this list, and add any character not present in this mapping:
    ul
      li #[strong.code.base-color YYYY]: full year. #[span.grey-light1.ml2 // `2019`]
      li #[strong.code.base-color YY]: 2 last digits of the year. #[span.grey-light1.ml2 // `19`]
      li #[strong.code.base-color MMMM]: month in full. #[span.grey-light1.ml2 // `January`]
      li #[strong.code.base-color MMM]: 3 first letters of the month. #[span.grey-light1.ml2 // `Jan`]
      li #[strong.code.base-color MM]: month number with leading zero. (01-12) #[span.grey-light1.ml2 // `01`]
      li #[strong.code.base-color M]: month number without leading zero. (1-12) #[span.grey-light1.ml2 // `1`]
      li #[strong.code.base-color DD]: date of the month with leading zero. (01-31) #[span.grey-light1.ml2 // `01`]
      li #[strong.code.base-color D]: date of the month without leading zero. (1-31) #[span.grey-light1.ml2 // `1`]
      li.
        #[strong.code.base-color S]: (usually with surrounding #[span.code `{ }`]) only in English,
        will output #[span.code `st`], #[span.code `nd`], #[span.code `rd`] or #[span.code `th`].
      li #[strong.code.base-color dddd]: day of the week in full. #[span.grey-light1.ml2 // `Monday`]
      li #[strong.code.base-color ddd]: 3 first letters of the day of the week. #[span.grey-light1.ml2 // `Mon`]
      li #[strong.code.base-color dd]: first letter of the day of the week. #[span.grey-light1.ml2 // `M`]
      li #[strong.code.base-color d]: number of the day of the week. (1-7) #[span.grey-light1.ml2 // `1` for Monday]
      li #[strong.base-color And also all the keywords from the following #[span.code formatTime()] function.]

  li.mt3
    code.text-bold.mr2 .formatTime(format)
    div.
      Returns a formatted time string.#[br]
      The #[span.code format()] function can also do this, but this might be a shortcut if you just want
      the default time formatting.#[br]
      E.g. `#[span.code formatTime()]`).#[br]
      This function will also be slightly faster than #[span.code format()] as lighter in functionality.#[br]
      Default format is #[span.code 'HH:mm'], but you can use any formatting keyword from
      this list, and add any character not present in this mapping:
    ul
      li #[strong.code.base-color HH]: Hours with leading zero, 24-hour format. (00-24)#[span.grey-light1.ml2 // `20`]
      li #[strong.code.base-color H]: Hours without leading zero, 24-hour format. (0-24)#[span.grey-light1.ml2 // `20`]
      li #[strong.code.base-color hh]: Hours with leading zero, 12-hour format. #[span.grey-light1.ml2 // `08`]
      li #[strong.code.base-color h]: Hours without leading zero, 12-hour format. #[span.grey-light1.ml2 // `8`]
      li #[strong.code.base-color mm]: Minutes with leading zero. #[span.grey-light1.ml2 // `08`]
      li #[strong.code.base-color m]: Minutes without leading zero. #[span.grey-light1.ml2 // `8`]
      li #[strong.code.base-color am]: (usually with surrounding #[span.code `{ }`]) am or pm (also localized if any)

highlight-message.my4(type="tips")
  ul
    li.
      To separate 2 keywords or a keyword and another text not from this list without adding spaces or
      any separation, you can use the delimiters #[span.code `{ }`].#[br]
      For instance #[span.code `new Date().format('YYYY{MM}DD')`] (or even #[span.code `{YYYY}{MM}{DD}`]) will produce:
      "#[span.code {{ nowFormatted }}]".
    li.mt4.
      The Date functions are added when Vue Cal loads, you can always check if you have it before you use it:#[br]
      #[span.code Date.prototype.format &amp;&amp; new Date().format()]
    li.mt4.
      If you really don't want the Date prototypes to be added, you can disable them with this option:
      #[span.code disable-date-prototypes].#[br]
      Refer to #[a(href="https://github.com/antoniandre/vue-cal/issues/259" target="_blank" style="text-decoration: underline;color: inherit") This Vue Cal issue on Github].
</template>

<script setup>
</script>

<style lang="scss">
</style>
