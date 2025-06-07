import { ConsultaService } from './../../services/consulta.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  ModalController,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonButton,
  IonIcon,
  IonText,
} from '@ionic/angular/standalone';
import { Consulta } from 'src/app/types/Consulta';
import { CadastroConsultaComponent } from 'src/app/components/cadastro-consulta/cadastro-consulta.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
  standalone: true,
  imports: [
    IonText,
    IonIcon,
    IonButton,
    IonCard,
    IonLabel,
    IonItem,
    IonList,
    IonCardContent,
    IonCardTitle,
    IonCardHeader,
    IonButtons,
    IonBackButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class ConsultaPage implements OnInit {
  public consultas$!: Observable<Consulta[]>;

  private modalController = inject(ModalController);
  private consultaService = inject(ConsultaService);

  ngOnInit() {
    this.carregarConsultas();
  }

  public async abrirModal(consulta?: Consulta) {
    const modal = await this.modalController.create({
      component: CadastroConsultaComponent,
      breakpoints: [0.5, 0.75, 0.95],
      initialBreakpoint: 0.75,
      componentProps: {
        consulta: consulta,
      },
    });

    modal.onDidDismiss().then(() => {
      this.carregarConsultas();
    });

    modal.present();
  }

  public carregarConsultas() {
    this.consultas$ = this.consultaService.buscarTodos();
  }

  public excluirConsulta(id: string) {
    console.log(id);

    this.consultaService.excluir(id).subscribe(() => {
      this.carregarConsultas();
    });
  }
}
