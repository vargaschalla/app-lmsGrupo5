<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tareas</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancelar</button>
        <br><br>
        ID={{ f.ID }}
        <!--<b-form @submit="onSubmit" @reset="onReset" class="w-100">-->
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-curso-group"
                      label="Curso:"
                      label-for="form-curso-input">
            <b-form-input id="form-curso-input"
                          type="text"
                          v-model="f.curso"
                          required
                          placeholder="Ingresar curso">
            </b-form-input>
          </b-form-group>
          <b-form-group id="form-titulo-group"
                        label="Titulo:"
                        label-for="form-titulo-input">
              <b-form-input id="form-titulo-input"
                            type="text"
                            v-model="f.titulo"
                            required
                            placeholder="Ingresar titulo">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-nota-group"
                        label="Nota:"
                        label-for="form-nota-input">
              <b-form-input id="form-nota-input"
                            type="text"
                            v-model="f.nota"
                            required
                            placeholder="Ingresar nota">
              </b-form-input>
          </b-form-group>
          <b-form-group id="form-estado-group"
                        label="Estado:"
                        label-for="form-estado-input">
              <b-form-input id="form-estado-input"
                            type="text"
                            v-model="f.estado"
                            required
                            placeholder="Ingresar estado">
              </b-form-input>
          </b-form-group>
          <b-button-group>
            <b-button type="submit" variant="primary">ENVIAR</b-button>
            <b-button type="reset" variant="danger">REINICIAR</b-button>
          </b-button-group>
        </b-form>
        <br><br>
        <br><br>
      </div>
      <br><br>
      <br><br>
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
      f: {
        "ID": "",
        "curso": "",
        "titulo": "",
        "nota": "",
        "estado": "",
      }
    }
  },
  methods: {

    back: function (){
    this.$router.push("/tareas")
    },

    create: function (payload) {
      client
        .post("/tar/tareas", payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/tareas")

          this.message = 'Tarea added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    initForm: function() {
      this.f.curso = "";
      this.f.titulo = "";
      this.f.nota = "";
      this.f.estado = "";
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        curso: this.f.curso,
        titulo: this.f.titulo,
        nota: this.f.nota,
        estado: this.f.estado,
      };
      if (this.f.ID > 0){
        this.updateStudent(payload, this.f.ID)
      } else {
        this.create(payload)
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },
    getStudentId: function(id) {
      client
        .get(`/tar/tareas/${id}`)
        .then((res) => {
          this.f = res.data;
        })
        .catch((error) => {
          //this.message = error;
          //this.showMessage = true;
          console.error(error);
        });
    },
    updateStudent: function (payload, id) {
      client
        .put(`/tar/tareas/${id}`, payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/tareas")
          this.message = 'Tareas updated!';
          this.showMessage = true;
        })
        .catch((error) => {
          //this.message = error;
          //this.showMessage = true;
          console.error(error);
        });
    },
  },
  created: function(){
  this.f.ID = this.$route.params.id;
    if (this.f.ID>0){
      this.getStudentId(this.f.ID)
      //this.getBooks();
    }
  }, 
}
</script>
<style scoped>

.container{
    margin-left: 50px;
    margin-top: 40px;
}
.col-sm-10{
  color: white;
}
</style>