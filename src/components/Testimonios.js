import React from "react";

const Testimonios = () => {

  return (
    <section id="testimonios">
      <div className="container text-center">
        <div className="row">
          <h1 className="titulo fw-bold">Testimonios</h1>
          <h5 className="subtitulo mb-3">
            Ayudar a las personas a disminuir sus niveles de ansiedad es nuestra misión. Sus comentarios positivos nos motivan a seguir mejorando. Los usuarios de Serenity nos recomiendan.
          </h5>
        </div>
        <div className="row">
          <div className="col-md-4 col-12">
            <img className="fotoTestimonio" src="https://randomuser.me/api/portraits/men/75.jpg" alt="foto1" />
            <h4 className="fw-bold mt-4">Testimonio 1</h4>
            <p className="px-3">
              «¡Es una excelente página! Los ejercicios son fáciles de seguir, siempre que puedo los hago y la recomiendo a mis amigos y conocidos.»
            </p>
          </div>
          <div className="col-md-4 col-12">
            <img className="fotoTestimonio" src="https://randomuser.me/api/portraits/women/14.jpg" alt="foto2" />
            <h4 className="fw-bold mt-4">Testimonio 2</h4>
            <p className="px-3">
              « Conocí la página porque me la recomendó mi psicóloga. Estos ejercicios han sido de gran ayuda cuando siento que la ansiedad me invade. Además, puedo llevar un registro y mostrarle a ella mis notas en las siguientes sesiones. »
            </p>
          </div>
          <div className="col-md-4 col-12">
            <img className="fotoTestimonio" src="https://randomuser.me/api/portraits/women/76.jpg" alt="foto3" />
            <h4 className="fw-bold mt-4">Testimonio 3</h4>
            <p className="px-3">
              « He usado muchas aplicaciones para relajarme porque soy una persona muy ansiosa, pero desde que conoci Serenity no necesité buscar más. Los ejercicios son muy efectivos y escribir mis notas me ayuda muchísimo, es como un diario de vida.»
            </p>
          </div>
        </div>
        </div>
    </section>
  )
}

export default Testimonios