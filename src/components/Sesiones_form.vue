<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Sesiones</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-on:click="back()">Cancelar</button>
        <br><br>
        ID={{ f.ID }}
        <!--<b-form @submit="onSubmit" @reset="onReset" class="w-100">-->
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-nombre-group"
                      label="nombre:"
                      label-for="form-nombre-input">
            <b-form-input id="form-nombre-input"
                          type="text"
                          v-model="f.nombre"
                          required
                          placeholder="Ingresar nombre">
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
          <b-form-group id="form-descripcion-group"
                        label="Descripcion:"
                        label-for="form-descipcion-input">
              <b-form-input id="form-descipcion-input"
                            type="text"
                            v-model="f.descipcion"
                            required
                            placeholder="Ingresar descipcion">
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
  name: 'Sesiones',
  data: function() {
    return{
      list: [],
      message: '',
      showMessage: false,
      f: {
        "ID": "",
        "nombre": "",
        "titulo": "",
        "descipcion": "",
        "estado": "",
      }
    }
  },
  methods: {

    back: function (){
    this.$router.push("/sesiones")
    },

    create: function (payload) {
      client
        .post("/ses/sesiones", payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/sesiones")

          this.message = 'Sesion added!';
          this.showMessage = true;
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error);
        });
    },

    initForm: function() {
      this.f.nombre = "";
      this.f.titulo = "";
      this.f.descipcion = "";
      this.f.estado = "";
    },

    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        nombre: this.f.nombre,
        titulo: this.f.titulo,
        descripcion: this.f.descripcion,
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
        .get(`/ses/sesiones/${id}`)
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
        .put(`/ses/sesiones/${id}`, payload)
        .then(() => {
          console.log(payload);
          this.$router.push("/sesiones")
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