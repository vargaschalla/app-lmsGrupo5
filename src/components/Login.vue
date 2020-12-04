<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>INICIAR SESIÓN</h1>
        <hr />
        <br /><br />
        <b-form @submit="onSubmit" @reset="onReset" class="w-100">
          <b-form-group
            id="form-title-group"
            label="Nombre de usuario:"
            label-for="form-title-input"
          >
            <b-form-input
              id="form-title-input"
              type="text"
              v-model="d.username"
              required
              placeholder="xxx@gmail.com"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="form-author-group"
            label="Contraseña:"
            label-for="form-author-input"
          >
            <b-form-input
              id="form-author-input"
              type="text"
              v-model="d.password"
              required
              placeholder="......"
              >s
            </b-form-input>
          </b-form-group>

          <b-button-group>
            <b-button type="submit" variant="primary">Ingresar</b-button>
            <b-button type="reset" variant="danger">Reiniciar</b-button>
          </b-button-group>
          <br /><br />
          <br /><br />
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import client from "../api";
export default {
  name: "LoginForm",
  data: function () {
    return {
      message: "",
      showMessage: false,
      d: {
        username: "",
        password: "",
      },
    };
  },
  components: {
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
      this.$router.push("/tareas");
    },
    login: function (payload) {
      client
        .post("/us/login", payload)
        .then((res) => {
          console.log(payload);
          // console.log('set');
          let credentials = {
            "token":res.data.token,
            "user":res.data,
          };
          //console.log(credentials.token);
          localStorage.setItem("user", JSON.stringify(credentials));
          //console.log('get');
          //let user = JSON.parse(localStorage.getItem("user"));
          //if (user != null) {
          //  console.log(user.token);
          //}
          this.message = "Login success!";
          this.showMessage = true;
          this.makeToast("Hecho", "Login ok", "success");
          //this.$router.push("/persons");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    initForm: function () {
      //this.d.ID = '';
      this.d.username = "";
      this.d.password = "";
    },
    onSubmit: function (evt) {
      evt.preventDefault();
      const payload = {
        email: this.d.username,
        password: this.d.password,
      };
      this.login(payload);
      this.initForm();
    },
    onReset: function (evt) {
      evt.preventDefault();
      //this.initForm();
      evt.target.reset();
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

.container{
    margin-left: 40px;
    margin-top: 40px;
}
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
  color: #d44706;
}
</style>