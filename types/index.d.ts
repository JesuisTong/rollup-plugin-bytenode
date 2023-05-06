export interface RollupBytenodeOptions {
    /** compile in electron env */
    electron?: boolean;
    /** determine what file should compile */
    includes?: RegExp;
    /** should compile as module or not */
    compileAsModule?: boolean;
}
