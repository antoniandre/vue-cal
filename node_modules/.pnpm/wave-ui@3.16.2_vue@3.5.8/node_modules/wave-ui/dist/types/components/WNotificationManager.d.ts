import { ComputedGetter, ComputedOptions, DefineComponent, EmitsOptions, ExtractDefaultPropTypes, MethodOptions, SlotsType } from 'vue';
import { PublicProps, ResolveProps } from '../extra-vue-types';
export interface WaveNotificationManagerProps {
}
export interface WaveNotificationManagerEmits {
}
export interface WaveNotificationManagerComputeds extends ComputedOptions {
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-notification-manager
     */
    conf: ComputedGetter<any>;
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-notification-manager
     */
    notifications: ComputedGetter<any>;
    /**
     * TODO: Add Description
     * @see https://antoniandre.github.io/wave-ui/w-notification-manager
     */
    transition: ComputedGetter<any>;
}
export interface WaveNotificationManagerMethods extends MethodOptions {
    /**
     * TODO: Add Description
     * @param {any} notif
     * @see https://antoniandre.github.io/wave-ui/w-notification-manager
     */
    notifProps(notif: any): void;
}
export type WaveNotificationManagerSlots = SlotsType<{}>;
export type WNotificationManager = DefineComponent<WaveNotificationManagerProps, {}, {}, WaveNotificationManagerComputeds, WaveNotificationManagerMethods, {}, {}, WaveNotificationManagerEmits & EmitsOptions, string, PublicProps, ResolveProps<WaveNotificationManagerProps & WaveNotificationManagerEmits, EmitsOptions>, ExtractDefaultPropTypes<WaveNotificationManagerProps>, WaveNotificationManagerSlots>;
