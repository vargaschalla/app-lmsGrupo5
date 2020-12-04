<template>
  <div class="container">
    <h1>Rol Form</h1>
        <hr />
        <br />
        <alert :message="message" v-if="showMessage"></alert>
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <button
          type="button"
          class="btn btn-success btn-sm"
          v-on:click="back()"
        >
          Cancel
        </button>
        <br /><br />ID= {{ d.ID }}
    
      <b-form-group label-cols="4" label-cols-lg="3" label-size="sm" label="Nombre">
        <b-form-input id="input-sm" size="sm" placeholder="Enter Nombre" type="text" v-model="d.nombre" required></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="3" label-size="sm" label="Código">
        <b-form-input id="input-sm" size="sm" placeholder="Enter Código" type="number" v-model="d.codigo" required></b-form-input>
      </b-form-group>

      <b-form-group label-cols="4" label-cols-lg="3" label-size="sm" label="Estado">
        <b-form-input id="input-sm" size="sm" placeholder="Enter Estado" type="number" v-model="d.estado"></b-form-input>
      </b-form-group>

      <b-button-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-button-group>
      
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
//import store from 'your/store/path/store'
//import Alert from "./Alert.vue";
//var tokent ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE2MDYyMjM1MTQsIm1pbyI6ImhvbGEiLCJ1c2VyX2lkIjoiMTkwZGE1N2MtNjk4YS00NTg4LWFlMDItZmI4MmUwZDllNTIzIn0.8_-CN2MbixtEmRcwIsTSg6wTFXRj8QkPgFl3hSI9XCk';
axios.interceptors.request.use(
  function (config) {
    console.log("get");
    let token = '';
    let user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem('user') != null ) {
      console.log(user.token);
      console.log(user);
      token = user.token; //store.getters.token;
    }
    //let token = user.token+''; //store.getters.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);
export default {
  name: "RolForm",
  data: function () {
    return {
      list: [],
      message: "",
      showMessage: false,
      d: {
        ID: "",
        nombre: "",
        codigo: "",
        estado: "",

      },
    };
  },
  components: {
    //alert: Alert,
  },
  methods: {
    makeToast: function (titulo, texto, tipo) {
      this.toastCount++;
      this.$bvToast.toast(texto, {
        title: titulo,
        variant: tipo,
        autoHideDelay: 5000,
        appendToast: true,
      });
    },
    back: function () {
      this.$router.push("/rol");
    },
    create: function (payload) {
      const path = "http://localhost:8080/r/rol";
      axios
        .post(path, payload)
        .then(() => {
          console.log(payload);
          this.message = "Rol added!";
          this.showMessage = true;
          this.makeToast("Hecho", "Paciente creado", "success");
          this.$router.push("/rol?msg="+this.message);
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      this.d.nombre = "";
      this.d.codigo = "";
      this.d.estado = "";
    },
    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        nombre: this.d.nombre,
        codigo: this.d.codigo,
        estado: this.d.estado,

      };
      if (this.d.ID > 0) {
        this.update(payload, this.d.ID);
      } else {
        this.create(payload);
      }
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
    },
    getById: function (id) {
      const path = "http://localhost:8080/r/rol/" + id;
      console.log(path);
      axios
        .get(path)
        .then((res) => {
          this.d = res.data;
        })
        .catch((error) => {
          this.message = error;
          this.showMessage = true;
          // eslint-disable-next-line
          console.error(error);
        });
    },
    update: function (payload, id) {
      const path = `http://localhost:8080/r/rol/${id}`;
      axios
        .put(path, payload)
        .then(() => {
          console.log(payload);
          this.message = "Rol added!";
          this.showMessage = true;
          this.makeToast("Hecho", "Paciente editado", "success");
          this.$router.push("/rol?msg="+this.message);
        })
        .catch((error) => {
         this.message = error;
          this.showMessage = true;
          // eslint-disable-next-line
          console.error(error);
          //this.getById();
        });
    },
  },
  created: function () {
    this.d.ID = this.$route.params.id;
    if (this.d.ID > 0) {
      this.getById(this.d.ID);
    }
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

.container {
  margin-top: 20px;
  height: 400px;
  width: 50%;
  background: rgb(43, 160, 154);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

}
</style>