import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { AuthService, LoginRequest, LoginResponse } from './auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerSpy }
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Limpa localStorage antes de cada teste
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should login successfully and store token', () => {
      const credentials: LoginRequest = {
        email: 'test@example.com',
        password: 'password123'
      };

      const mockResponse: LoginResponse = {
        token: 'fake-jwt-token',
        user: { id: 1, name: 'Test User' }
      };

      service.login(credentials).subscribe(response => {
        expect(response).toEqual(mockResponse);
        expect(service.getToken()).toBe('fake-jwt-token');
        expect(service.isAuthenticated()).toBeTruthy();
      });

      const req = httpMock.expectOne(request => request.url.includes('/auth/login'));
      expect(req.request.method).toBe('POST');
      req.flush(mockResponse);
    });
  });

  describe('logout', () => {
    it('should clear tokens and navigate to login', () => {
      // Simula um usuário logado
      localStorage.setItem('auth_token', 'fake-token');
      localStorage.setItem('user_data', JSON.stringify({ name: 'Test' }));

      service.logout();

      expect(service.getToken()).toBeNull();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('isAuthenticated', () => {
    it('should return false when no token exists', () => {
      expect(service.isAuthenticated()).toBeFalsy();
    });

    it('should return true when valid token exists', () => {
      // Token JWT válido com exp no futuro
      const futureDate = Math.floor(Date.now() / 1000) + 3600; // 1 hora no futuro
      const token = `header.${btoa(JSON.stringify({ exp: futureDate }))}.signature`;
      localStorage.setItem('auth_token', token);

      expect(service.isAuthenticated()).toBeTruthy();
    });

    it('should return false when token is expired', () => {
      // Token JWT expirado
      const pastDate = Math.floor(Date.now() / 1000) - 3600; // 1 hora no passado
      const token = `header.${btoa(JSON.stringify({ exp: pastDate }))}.signature`;
      localStorage.setItem('auth_token', token);

      expect(service.isAuthenticated()).toBeFalsy();
    });
  });

  describe('isAdmin', () => {
    it('should return false when no user is logged in', () => {
      expect(service.isAdmin()).toBeFalsy();
    });

    it('should return true when user has admin role', () => {
      localStorage.setItem('user_data', JSON.stringify({ role: 'admin' }));
      // Força reload do user
      service = TestBed.inject(AuthService);
      
      expect(service.isAdmin()).toBeTruthy();
    });

    it('should return true when user has isAdmin flag', () => {
      localStorage.setItem('user_data', JSON.stringify({ isAdmin: true }));
      // Força reload do user
      service = TestBed.inject(AuthService);
      
      expect(service.isAdmin()).toBeTruthy();
    });

    it('should return false when user is not admin', () => {
      localStorage.setItem('user_data', JSON.stringify({ role: 'user' }));
      // Força reload do user
      service = TestBed.inject(AuthService);
      
      expect(service.isAdmin()).toBeFalsy();
    });
  });
});
