import { Injectable } from '@angular/core';
@Injectable()
export class AppConfig {
    private _config: { [key: string]: string };
    constructor() {
        this._config = {
            // PathAPI: 'http://localhost:4200/server/api/'
            PathAPI: 'http://jpharma.us-east-2.elasticbeanstalk.com/api/'
        };
    }
    get setting():{ [key: string]: string } {
        return this._config;
    }
    get(key: any) {
        return this._config[key];
    }
};
