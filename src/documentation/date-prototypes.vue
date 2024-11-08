<template lang="pug">
h1.title1 Date Prototypes

w-alert.info.size--lg.pa3.pl4(border-left).
  Vue Cal has no dependency and internally performs date operations through a set of useful and
  efficient functions that you can choose to add to the JavaScript native #[span.code Date] class
  for your convenience. They are not altering the Date object but only adding 11 new utility functions.

w-accordion.mt12.mb2(
  :model-value="[false, true, true]"
  expand-icon-rotate90
  title-class="bd0")

  //- What is this and what for.
  w-accordion-item
    template(#title)
      title-link.ma0.pa0.bd0(h2 anchor="what-is-it") What is this and what for?
    template(#content)
      ul
        li A #[span.code Date] prototype is an injected function to the native JavaScript #[span.code Date] class.
        li.
          The #[span.code Date] class offers crucial methods that allows one to manipulate dates in JavaScript,
          but some useful methods are missing and since Vue Cal already has them implemented and in use internally,
          it exposes them in any #[span.code Date] object for you to use without any overhead.

        w-alert.yellow(border-left)
          .base-color
            .title3 Keeping you informed
            p.
              Injecting methods in a native JavaScript class is possible but usually discouraged for the
              following reasons:
            ul
              li
                | These functions are not part of the official Date documentation.
                .caption.size--md.lh1
                  strong.mr1 How to address:
                  | A new developer in your project should be told where these functions come from and where is
                  | their documentation if needed. The code should be clearly commented.

              li
                | If multiple libraries do this, there could be a variable naming collision resulting in unexpected function return.
                .caption.size--md.lh1
                  strong.mr1 How to address:
                  | Ensure that you don't use another Date library that would also inject in Date, furthermore with colliding names.
                  | This is extremely unlikely to happen, but just be aware.

        h3.mt0 Motivation for use
        p Here are some convincing key points:
        ul
          li You will obviously need at least one of them at some point if you work with Vue Cal and a backend.
          li No overhead in using, available straight away.
          li Intuitive names and discoverable from any Dev Tools Console: type #[code (new Date).] for intellisense.
          li Each function is very small and straightforward, with only one task to perform at a time.
          li These functions are not altering any of the base behavior of the date object, only adding new well-tested and stable functions.
          li Using your loaded locale for any formatting.

  //- How to use.
  w-accordion-item.mt12.mb2
    template(#title)
      title-link.ma0.pa0.bd0(h2 anchor="how-to-use") How to use

    template(#content)
      ssh-pre(language="js" :dark="store.darkMode").
        import { addDatePrototypes } from '@/vue-cal'

        addDatePrototypes()

        const tomorrow = (new Date()).addDays(1) // Tomorrow at same time.
        console.log(tomorrow.format()) // outputs: {{ (new Date()).addDays(1).format() }}

        const currentTime = new Date()
        console.log(currentTime.formatTime()) // outputs: {{ (new Date()).formatTime() }}

  //- Prototypes.
  w-accordion-item.mt12.mb2
    template(#title)
      title-link.ma0.pa0.bd0(h2 anchor="prototypes") Prototypes

    template(#content)
      w-accordion(
        :model-value="[false, true, true]"
        expand-icon-rotate90
        title-class="bd0")
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .addDays(days)
        template(#content)
          | Adds days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code days]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .subtractDays(days)
        template(#content)
          | Subtracts days to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code days]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .addHours(hours)
        template(#content)
          | Adds hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code hours]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .subtractHours(hours)
        template(#content)
          | Subtracts hours to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code hours]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .addMinutes(minutes)
        template(#content)
          | Adds minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code minutes]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .subtractMinutes(minutes)
        template(#content)
          | Subtracts minutes to a Date object and returns it. The original Date stays untouched as a copy is made.#[br]
          | `#[span.code minutes]` is an integer.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .getWeek()
        template(#content)
          | Returns the week number (1 #[a(href="#there-can-be-53-weeks-in-a-year") to 53]) of a date.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .isToday()
        template(#content)
          | Returns #[span.code true] if the date is Today.
      w-accordion-item
        template(#title)
          code.text-bold.mr2 .isLeapYear()
        template(#content)
          | Returns #[span.code true] if the date is in a leap year.

      h3.mt4 And because everyone needs a Date/time formatting function...
      p It is now available directly from the Date object, with your loaded locale!

      w-accordion-item
        template(#title)
          code.text-bold.mr2 .format(format)
        template(#content)
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

      w-accordion-item
        template(#title)
          code.text-bold.mr2 .formatTime(format)
        template(#content)
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

      w-alert.info.mt4.pl4(border-left)
        ul
          li.
            To separate 2 keywords or a keyword and another text not from this list without adding spaces or
            any separation, you can use the delimiters #[span.code `{ }`].#[br]
            For instance #[span.code `new Date().format('YYYY{MM}DD')`] (or even #[span.code `{YYYY}{MM}{DD}`]) will produce:
            "#[span.code {{ (new Date()).format('YYYY{MM}DD') }}]".
          li.mt4.
            The Date functions are available right after you have called addDatePrototypes().#[br]
            If you are not sure, you can check its availability before using with the optional chaining:
            #[span.code new Date().format?.()], or from template
            #[span.code Date.prototype.format &amp;&amp; new Date().format()].
</template>

<script setup>
import SshPre from 'simple-syntax-highlighter'
import 'simple-syntax-highlighter/dist/sshpre.css'
import { useAppStore } from '@/store'
import TitleLink from '@/documentation/components/title-link.vue'
import { addDatePrototypes } from '@/vue-cal'

const store = useAppStore()

addDatePrototypes()
</script>

<style lang="scss">
</style>
