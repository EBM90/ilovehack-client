import React from 'react'
import './FAQQ.css';

export default function FAQQ() {
    return (
        <div className="body-faq">
            <main class="faq">
            <div class="faq__holder">
  <h1 class="faq__heading">How i can help you?</h1>
 
  <details class="faq__detail">
      <summary  class="faq__summary"><span class="faq__question">What is love?</span></summary>
      <p class="faq__text">There are many ambiguous answers to this question, but we are going to be concise with the answer. Love is coffee in the company of every morning, the good night of a mother and the fleeting hug of a friend.
      And we are specialists in getting the first one.</p>
  </details>

  <details class="faq__detail">
    <summary  class="faq__summary"><span class="faq__question">Real stories</span></summary>
    <p class="faq__text">As an example we have Mike and Rachel, two people who had been looking for love and were the first couple that emerged from using our program. The couple were joined by two twins Zack and Cody.</p>
  </details>  

  <details class="faq__detail">
    <summary  class="faq__summary"><span class="faq__question">How we work?</span></summary>
    <p class="faq__text">Our work method is a mixture of mathematics and feelings. Through an algorithm designed to the millimeter by our developers, we are able to join similar profiles in order to establish love ties</p>
  </details>  
  
  <details class="faq__detail">
    <summary  class="faq__summary"><span class="faq__question">About us</span></summary>
    <p class="faq__text">The creators of the web are two humble programmers Marta,Eric,Guille and Jose Luis, who based on effort, perseverance and work have joined forces to bring love to every corner of the planet.</p>
  </details> 

</div>
</main>
        </div>
    )
}
