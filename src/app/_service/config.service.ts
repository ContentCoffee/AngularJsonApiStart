import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

    private DRUPALSERVER = 'http://druplay.loc';
    private USER = 'admin';
    private PASS = 'admin';
    private JSONAPIPATH = 'jsonapi/';
    private LANGUAGE = 'en';

    set language(langcode: string) {
        this.LANGUAGE = langcode;
    }

    get language() {
        return this.LANGUAGE;
    }

    get drupalServer() {
        return this.DRUPALSERVER;
    }

    get user() {
        return this.USER;
    }

    get password() {
        return this.PASS;
    }

    get jsonApiPath() {
        return '/' + this.language + '/' + this.JSONAPIPATH;
    }
}