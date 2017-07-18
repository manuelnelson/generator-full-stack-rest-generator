import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService, <%=modelName %>Service } from '../../services';
import { <%=modelName %> } from '../../models';
@Injectable()
export class <%=modelName %>Resolver implements Resolve<Array<<%=modelName %>>> {
    constructor(private <%=camelModelName %>Service: <%=modelName %>Service, private router: Router, private authService: AuthenticationService) {}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Array<<%=modelName %>>> {
        return this.<%=camelModelName %>Service.list().map(<%=camelModelName %>s => <%=camelModelName %>s).toPromise();
    }
}
