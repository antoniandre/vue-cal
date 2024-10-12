import { ComputedGetter, ComputedOptions, DefineComponent, EmitsOptions, ExtractDefaultPropTypes, MethodOptions, SlotsType } from 'vue';
import { PublicProps, ResolveProps } from '../extra-vue-types';
export interface WaveFlexProps {
    /**
     * TODO: Add Description
     * @property {string} tag - Default: 'div'
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    tag?: string;
    /**
     * TODO: Add Description
     * @property {boolean} column
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    column?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} grow
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    grow?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} noGrow
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    noGrow?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} shrink
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    shrink?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} noShrink
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    noShrink?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} fillHeight
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    fillHeight?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} wrap
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    wrap?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} alignStart
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    alignStart?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} alignCenter
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    alignCenter?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} alignEnd
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    alignEnd?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifyStart
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifyStart?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifyCenter
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifyCenter?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifyEnd
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifyEnd?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifySpaceBetween
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifySpaceBetween?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifySpaceAround
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifySpaceAround?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} justifySpaceEvenly
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    justifySpaceEvenly?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} basisZero
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    basisZero?: boolean;
    /**
     * TODO: Add Description
     * @property {number|string} gap - Default: 0
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    gap?: number | string;
}
export interface WaveFlexEmits {
}
export interface WaveFlexComputeds extends ComputedOptions {
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    classes: ComputedGetter<any>;
}
export interface WaveFlexMethods extends MethodOptions {
}
export type WaveFlexSlots = SlotsType<{
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-flex
     */
    'default': () => any;
}>;
export type WFlex = DefineComponent<WaveFlexProps, {}, {}, WaveFlexComputeds, WaveFlexMethods, {}, {}, WaveFlexEmits & EmitsOptions, string, PublicProps, ResolveProps<WaveFlexProps & WaveFlexEmits, EmitsOptions>, ExtractDefaultPropTypes<WaveFlexProps>, WaveFlexSlots>;
