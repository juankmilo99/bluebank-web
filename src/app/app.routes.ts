import { Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ConsultaSaldoComponent} from "./components/consulta-saldo/consulta-saldo.component";
import {MovimientosRecientesComponent} from "./components/movimientos-recientes/movimientos-recientes.component";
import {ExtractosComponent} from "./components/extractos/extractos.component";
import {ReportesComponent} from "./components/reportes/reportes.component";
import {TransaccionComponent} from "./components/transaccion/transaccion.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'consulta-saldo', component: ConsultaSaldoComponent },
  { path: 'movimientos-recientes', component: MovimientosRecientesComponent },
  { path: 'extractos', component: ExtractosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'transacciones', component: TransaccionComponent },
];
