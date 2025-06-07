import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Consulta } from '../types/Consulta';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private readonly urlApi = 'http://192.168.1.11:3000/consultas';

    private http = inject(HttpClient);

  // public salvar(consulta: Consulta) {
  //   if (consulta.id) {
  //     return this.http.put(`${this.urlApi}/${consulta.id}`, consulta);
  //   }

  //   return this.http.post(this.urlApi, consulta);
  // }

  public salvar(consulta: Consulta) {
  if (consulta.id) {
    return this.http.put(`${this.urlApi}/${consulta.id}`, consulta);
  }

  const novaConsulta = { ...consulta };
  delete novaConsulta.id;

  return this.http.post(this.urlApi, novaConsulta);
}

  
  public excluir(id: string) {
    return this.http.delete(`${this.urlApi}/${id}`);
  }

  public buscarTodos() {
    return this.http.get<Consulta[]>(this.urlApi);
  }

  public buscarPorId(id: string) {
    return this.http.get<Consulta>(`${this.urlApi}/${id}`);
  }
}
