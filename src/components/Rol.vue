<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>ROL</h1>
        <hr />
        <br /><br />
        <alert :message="message" v-if="showMessage"></alert>
        <button id="addperson" type="button" class="btn btn-success btn-sm" v-on:click="add()">
          Add Person
        </button>
        <br /><br />
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Codigo</th>
              <th scope="col">Estado</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(d, index) in list" :key="index">
              <td>{{ index+1  }}</td>
              <td>{{ d.nombre   }}</td>
              <td>{{ d.codigo  }}</td>
              <td>{{ d.estado  }}</td>
              <td>
                <div class="btn-group" role="group">
                  <button
                    type="button"
                    class="btn btn-warning btn-sm"
                    @click="edit(d.ID)"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="onDelete(d)"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
//import axios from "axios";
import client from "../api";
//import Alert from "./Alert.vue";
export default {
  name: "Rol",
  data: function () {
    return {
      list: [],
      message: "",
      showMessage: false,
    };
  },
  components: {
    //alert: Alert,
  },
  methods: {
    edit: function (id) {
      this.$router.push("/rol/form/" + id);
    },
    add: function () {
      this.$router.push("/rol/form");
    },
    getList: function () {
      client
        .get("/r/rol")
        .then((res) => {
          this.list = res.data.r;
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
        .delete(`/per/persons/${id}`)
        .then(() => {
          this.getList();
          this.message = "Persona Removed!";
          this.showMessage = true;
        })
        .catch((error) => {
          console.error(error);
          this.getList();
        });
    },
  },
  created: function () {
    this.getList();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  color: #42b983;
}
#addperson{
  margin-right: 810px;
  width: 20%;
}
table td{
  border:solid 3px teal;
}
table th{
  border:solid 3px teal;
}
</style>