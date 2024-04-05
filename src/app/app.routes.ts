import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { authGuard } from './user/auth.guard';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {
        path: 'kanban-board', 
        component: HomePageComponent,
        canActivate: [authGuard]
    },
    {path: 'login', loadChildren: () => import("./user/user.module").then(m => m.UserModule)}
];
