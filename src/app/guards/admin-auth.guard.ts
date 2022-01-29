import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanLoad, Route, Router} from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AdminAuthGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  canLoad(route: Route): boolean {
    const loggedUser = this.authService.getLoggedUserFromLocalStorage();

    if (!this.authService.hasPermissions("admin")) {
      this.router.navigate(["/main", "listings"]);

      return false;
    }
    return true;
  }
}
