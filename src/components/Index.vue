<template>
  <div
    id="video-carousel-example2"
    class="carousel slide carousel-fade mt-0"
    data-ride="carousel"
  >
    <ol class="carousel-indicators">
      <li
        data-target="#video-carousel-example2"
        data-slide-to="0"
        class="active"
      ></li>
      <li data-target="#video-carousel-example2" data-slide-to="1"></li>
      <li data-target="#video-carousel-example2" data-slide-to="2"></li>
    </ol>

    <div class="carousel-inner" role="listbox">
      <div class="carousel-item active">
        <div class="view outer-image-container">
          <img
            src="https://i.imgur.com/9h6vtta.png"
            class="d-block w-100 img-responsive"
          />
        </div>

        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h3 class="h3-responsive">¡Es Gratis!</h3>
            <p>Nunca es tarde para aprender</p>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="view outer-image-container">
          <img
            src="https://i.imgur.com/2fYFOSt.png"
            class="d-block w-100 img-responsive"
          />
        </div>

        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h3 class="h3-responsive">Anímate</h3>
            <p>Cualquier persona se puede registrar</p>
          </div>
        </div>
      </div>

      <div class="carousel-item">
        <div class="view outer-image-container">
          <img
            src="https://i.imgur.com/fIGXc50.png"
            class="d-block w-100 img-responsive"
          />
        </div>

        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h3 class="h3-responsive">Contenido Constante</h3>
            <p>
              Aprender nunca está de más, espera las próximas actualizaciones
            </p>
          </div>
        </div>
      </div>
    </div>

    <a
      class="carousel-control-prev"
      href="#video-carousel-example2"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#video-carousel-example2"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h2>Escuela para Padres, donde aprenderás a ser el padre más padre</h2>
        <p class="text-justify">
          Fundación Niños 360 ofrece cursos gratuitos con contenido multimedia
          para que cualquier persona pueda aprender de una manera sencilla y
          eficaz. Creemos que todo el mundo merece tener derecho al conocimiento
          y por eso extendemos contenido creado 100% por los miembros de la
          fundación.
        </p>
        <p class="text-justify">
          Estos cursos consisten en vídeos grabados por miembros de nuestra
          fundación de carácter educativo para impactar de una manera positiva
          en el futuro de las personas inculcando conocimiento de una manera
          dinámica y entretenida con el fin de apoyar la formación permanente y
          desarrollar los intereses de las personas mayores.
        </p>
        <p class="text-justify text-center pt-5">
          Nuestro compromiso es brindar material como un compromiso cívico y sin
          fines de lucro.
        </p>
      </div>
    </div>

    <div class="LogoFundacion text-center">
      <img
        src="https://i.imgur.com/U4W10I2.png"
        alt="Logo Fundacion"
        height="210"
        width="240"
      />
    </div>

    <br />
  </div>
  <section class="pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h3 class="mb-3">Posts</h3>
        </div>
        <div class="col-md-6 text-right">
          <a
            class="btn btn-primary mb-3 mr-1"
            href="#carouselExampleIndicators2"
            role="button"
            data-slide="prev"
          >
            <i class="fa fa-arrow-left"></i>
          </a>
          <a
            class="btn btn-primary mb-3"
            href="#carouselExampleIndicators2"
            role="button"
            data-slide="next"
          >
            <i class="fa fa-arrow-right"></i>
          </a>
        </div>
        <div class="col-md-12">
          <div
            id="carouselExampleIndicators2"
            class="carousel slide"
            data-ride="carousel"
          >
            <div class="carousel-inner">
              <div class="carousel-item active">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532781914607-2031eca2f00d?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=7c625ea379640da3ef2e24f20df7ce8d"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 1</h4>
                        <p class="card-text">Descripción para Post 1</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=42b2d9ae6feb9c4ff98b9133addfb698"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 2</h4>
                        <p class="card-text">Descripción para Post 2</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3d2e8a2039c06dd26db977fe6ac6186a"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 3</h4>
                        <p class="card-text">Descripción para Post 3.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532771098148-525cefe10c23?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=3f317c1f7a16116dec454fbc267dd8e4"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 4</h4>
                        <p class="card-text">Descripción para Post 4</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532715088550-62f09305f765?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ebadb044b374504ef8e81bdec4d0e840"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 5</h4>
                        <p class="card-text">Descripción para Post 5</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=0754ab085804ae8a3b562548e6b4aa2e"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 6</h4>
                        <p class="card-text">Descripción para Post 6</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="row">
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=ee8417f0ea2a50d53a12665820b54e23"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 7</h4>
                        <p class="card-text">Descripción para Post 7</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532777946373-b6783242f211?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=8ac55cf3a68785643998730839663129"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 8</h4>
                        <p class="card-text">Descripción para Post 8</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4 mb-3">
                    <div class="card">
                      <img
                        class="img-fluid"
                        alt="100%x280"
                        src="https://images.unsplash.com/photo-1532763303805-529d595877c5?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=1080&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjMyMDc0fQ&amp;s=5ee4fd5d19b40f93eadb21871757eda6"
                      />
                      <div class="card-body">
                        <h4 class="card-title">Post 9</h4>
                        <p class="card-text">Descripción para Post 9</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div class="LogoNombre text-center">
    <img src="https://i.imgur.com/6cUAZb4.png" alt="Logo Fundacion" />
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap%27");

* {
  font-family: "Poppins", sans-serif;
}

.card {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}

.outer-image-container {
  max-width: 100%;
  max-height: 380px;
}

.item img {
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  min-height: 500px;
}
/*
body{
  background-image: url("https://i.imgur.com/9SuMVET.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
} */

p {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 20px;
  font-weight: normal;
  line-height: 32px;
}
</style>

<script setup></script>
