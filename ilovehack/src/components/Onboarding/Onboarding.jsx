import React from 'react'
import './Onboarding.css'


export default function Onboarding() {
    return (
        <div className="bodyOnboarding">
   <div className="container-onboarding">
  <div className="poster">
    <div className="poster__img"></div>
    <div className="poster__info">
      <h6 className="poster__title">Que apsa zagales</h6>
      <p className="poster__text">Que pq te registras que que haces aqui pequeño guason dale scroll y registrate papi! dale fuego a la cumbia guason dale scroll y registrate papi! dale fuego a la cumbia guason dale scroll y registra a la cumbia guason dale scroll y registra</p>
    </div>
  </div>
  <div className="btn-onboarding">
  <a href="/onboarding2">Next</a>
  <a href="/error">Skip</a>
  </div>
</div>
    </div>
    )
}
