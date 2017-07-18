import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService, AlertService } from '../services';
import { <%=modelName %> } from '../models';
import 'rxjs/add/operator/map'

@Injectable()
export class <%=modelName %>Service {
    constructor(private http: Http, private authService: AuthenticationService) { }
    private apiEndpointUrl: string = '/api/<%=camelModelName %>s';

    create(<%=camelModelName %>: <%=modelName %>) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.apiEndpointUrl, <%=camelModelName %>, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let <%=camelModelName %> = response.json();
                if (<%=camelModelName %>) {
                    return <%=camelModelName %>;
                }
            });
    }
    update(<%=camelModelName %>: <%=modelName %>) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(this.apiEndpointUrl + '/' + <%=camelModelName %>._id, <%=camelModelName %>, options)
            .map((response: Response) => {
                // update successful - return <%=camelModelName %>
                let <%=camelModelName %> = response.json();
                if (<%=camelModelName %>) {
                    return <%=camelModelName %>;
                }
            });
    }

    list() {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let <%=camelModelName %>s = response.json() as Array<<%=modelName %>>;
                return <%=camelModelName %>s;
            });
    }
    get(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.get(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let <%=camelModelName %> = response.json() as <%=modelName %>;
                return <%=camelModelName %>;
            });
    }
    delete(id: string) {
        // add authorization header with jwt token
        let headers = new Headers({ 'Authorization': this.authService.token });
        let options = new RequestOptions({ headers: headers });

        return this.http.delete(this.apiEndpointUrl + '/' + id, options)
            .map((response: Response) => {
                let <%=camelModelName %> = response.json() as <%=modelName %>;
                return <%=camelModelName %>;
            });
    }

}
