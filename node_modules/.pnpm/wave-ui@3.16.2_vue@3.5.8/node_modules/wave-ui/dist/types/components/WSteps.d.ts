import { ComputedGetter, ComputedOptions, DefineComponent, EmitsOptions, ExtractDefaultPropTypes, MethodOptions, SlotsType } from 'vue';
import { PublicProps, ResolveProps } from '../extra-vue-types';
export interface WaveStepsProps {
    /**
     * TODO: Add Description
     * @property {boolean} dark
     * @see https://antoniandre.github.io/wave-ui/w-steps
     */
    dark?: boolean;
    /**
     * TODO: Add Description
     * @property {boolean} light
     * @see https://antoniandre.github.io/wave-ui/w-steps
     */
    light?: boolean;
}
export interface WaveStepsEmits {
}
export interface WaveStepsComputeds extends ComputedOptions {
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-steps
     */
    classes: ComputedGetter<any>;
}
export interface WaveStepsMethods extends MethodOptions {
}
export type WaveStepsSlots = SlotsType<{}>;
export type WSteps = DefineComponent<WaveStepsProps, {}, {}, WaveStepsComputeds, WaveStepsMethods, {}, {}, WaveStepsEmits & EmitsOptions, string, PublicProps, ResolveProps<WaveStepsProps & WaveStepsEmits, EmitsOptions>, ExtractDefaultPropTypes<WaveStepsProps>, WaveStepsSlots>;
