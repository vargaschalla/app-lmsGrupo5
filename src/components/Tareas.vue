<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tareas</h1>
        <hr><br><br>
        <alert :message=message v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-on:click="nuevo()">AÑADIR TAREAS</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Titulo</th>
              <th scope="col">Nota</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in list" :key="index">
              <td>{{ d.ID }}</td>
              <td>{{ d.curso }} - {{ d.ID }}</td>
              <td>{{ d.titulo }}</td>
              <td>{{ d.nota }}</td>
              <td>{{ d.estado }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                          type="button"
                          class="btn btn-warning btn-sm"
                          @click="editar(d.ID)">
                      ACTUALIZAR
                  </button>
                  <button
                          type="button"
                          class="btn btn-danger btn-sm"
                          @click="onDelete(d)">
                      ELIMINAR
                  </button>
                </div>
                <br><br>
                <br><br>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import client from "../api";

export default {
  name: 'Tareas',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
    }
  },
methods: {
    editar: function (id){
      this.$router.push('/tareas/new/' + id);
    },
    nuevo: function () {
      this.$router.push('/tareas/new');
    },
    getStudents: function() {
      client.get("/tar/tareas").then((res) => {
          this.list = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onDelete: function (d) {
      var r = confirm("Eliminar ?");
      if (r == true) {
        this.delete(d.ID);
      }
    },
    delete: function (id) {
      client
        .delete(`/tar/tareas/${id}`)
        .then(() => {
          this.getStudents();
          this.message = "Person removed!";
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getStudents();
        });
    },
  },
  created: function () {
    this.message = this.$route.query.msg;
    //console.log(this.message);
    if (typeof(this.message) !=='undefined') {// || this.message !== null
      this.showMessage = true;
     // this.makeToast("Hecho", this.message, "success");
    }
    this.getStudents();
  },
}
</script>

<style scoped>

.container{
    margin-left: 40px;
    margin-top: 40px;
}
.col-sm-10{
  color: white;
}
</style>