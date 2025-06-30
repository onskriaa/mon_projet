import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: spy }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation if user is logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to login if user is not logged in', () => {
    const navigateSpy = spyOn(router, 'navigate');
    authServiceSpy.isLoggedIn.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
  });
});
