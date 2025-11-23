import { Component } from '@angular/core';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {
    
    constructor(
        public authService: AuthService,
        private router: Router
    ) {}

    logout(): void {
        this.authService.logout();
    }

    isAdmin(): boolean {
        return this.authService.isAdmin();
    }

    isAuthenticated(): boolean {
        return this.authService.isAuthenticated();
    }
}

