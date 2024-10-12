import { ComputedGetter, ComputedOptions, DefineComponent, EmitsOptions, ExtractDefaultPropTypes, MethodOptions, SlotsType } from 'vue';
import { PublicProps, ResolveProps } from '../extra-vue-types';
export interface WaveGridProps {
    /**
     * TODO: Add Description
     * @property {string} tag - Default: 'div'
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    tag?: string;
    /**
     * TODO: Add Description
     * @property {number|{}|string} columns
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    columns?: number | {} | string;
    /**
     * TODO: Add Description
     * @property {number|{}|string} gap - Default: 0
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    gap?: number | {} | string;
}
export interface WaveGridEmits {
}
export interface WaveGridComputeds extends ComputedOptions {
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    breakpointsColumns: ComputedGetter<any>;
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    breakpointsGap: ComputedGetter<any>;
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    classes: ComputedGetter<any>;
}
export interface WaveGridMethods extends MethodOptions {
}
export type WaveGridSlots = SlotsType<{
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-grid
     */
    'default': () => any;
}>;
export type WGrid = DefineComponent<WaveGridProps, {}, {}, WaveGridComputeds, WaveGridMethods, {}, {}, WaveGridEmits & EmitsOptions, string, PublicProps, ResolveProps<WaveGridProps & WaveGridEmits, EmitsOptions>, ExtractDefaultPropTypes<WaveGridProps>, WaveGridSlots>;
