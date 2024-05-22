import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { ExitGuardFn } from './guards/exit.guard';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ProductsResolverService } from './services/products.resolver';

export default [
	{ path: 'home', title: 'Home', component: HomePageComponent },
	{
		path: 'login',
		title: 'Inicio de sesión',
		loadChildren: () => import('./pages/login-page/login-page.module').then((m) => m.LoginModule)
	},
	{
		path: 'register',
		canDeactivate: [ExitGuardFn],
		loadComponent: () => import('./pages/register-page/register-page.component')
	},
	{
		path: 'payment/:user',
		title: 'Pagos',
		data: { title: 'Pagos' },
		resolve: { products: ProductsResolverService },
		canActivate: [AuthGuard],
		loadChildren: () => import('./pages/payment-page/payment.routes').then((r) => r.PaymentRoutes)
	},
	{
		path: 'user',
		title: 'Usuario',
		loadChildren: () => import('./pages/user/user.routes')
	},

	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'login', redirectTo: '/login', pathMatch: 'prefix' },
	{
		path: '**',
		loadComponent: () => import('./pages/not-found-page/not-found-page.component')
	}
] as Routes;
