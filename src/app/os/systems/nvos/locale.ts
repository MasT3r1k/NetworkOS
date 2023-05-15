import { device } from "./system";

export type valid_languages = 'Czech' | 'English'; // ADD FOR MORE LANGUAGES

interface LocaleObject {
    display_text?: string;
    data: any;
}

export namespace NetworkLanguages {
    export let locale: Record<valid_languages, LocaleObject> = {
        Czech: {
            display_text: 'Čeština',
            data: {
                apps: {
                    Settings: 'Nastavení',
                    TaskManager: 'Správce úloh',
                    Terminal: 'Terminál'
                }
            }
        },
        English: {
            data: {
                apps: {
                    Settings: 'Settings',
                    TaskManager: 'Task Manager',
                    Terminal: 'Terminal'
                }
            }
        }
    };


    export function selectLanguage(language: valid_languages) {
        device.language = language;
    }

    export function getLanguage(): valid_languages {
        return device.language;
    }

    export function getActiveLanguageDisplay(): string {
        let l = locale[getLanguage()];
        return l.display_text ? l.display_text : getLanguage();
    }
}