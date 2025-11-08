import './Help.css'
import HelpLandingImage from '../../assets/HelpLanding.jpg'
import { div } from 'three/tsl';
import React, { useState, useRef, useEffect } from 'react';

function HelpLanding() {
  return (
    <div>
      <section className='LandingSection'>
        <img src={HelpLandingImage} alt="" className='LandingPicture' />
        <div className='LandingOverlay'>
          <h1 className='txt-color-primary'>
            Pusat Bantuan
          </h1>
          <p className='p1 txt-color-white'>
            semua yang anda perlukan untuk mengukir kisah
          </p>
        </div>
      </section>
    </div>
  )
}

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);
  const answerRefs = useRef([]); // Create refs for each answer to measure height

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus."
    },
    {
      question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi dolor ante?",
      answer: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div>
      <section className='FAQSection'>
        <div className="FAQContent">
          <div className="FAQHeader">
            <p className="p2 txt-color-bg-light">Support</p>
            <h1 className="txt-color-primary">FAQs</h1>
            <p className="p1">
              ullam bibendum eget turpis nec rhoncus. Integer in
              sapien neque. Phasellus egestas pellentesque ligula
              tempor vulputate. Sed in bibendum quam.
            </p>
          </div>
          <div className="FAQList">
            {faqs.map((faq, index) => (
              <div key={index} className="FAQItem">
                <div className="FAQQuestion" onClick={() => toggleFAQ(index)}>
                  <p className="p1 txt-color-ternary">{faq.question}</p>
                  <span className={`toggle ${openFAQ === index ? 'open' : ''}`}>
                    <img src="https://api.iconify.design/eva/arrow-ios-downward-outline.svg?color=%238a8a8a" alt="arrow" />
                  </span>
                </div>
                {/* The FAQAnswer div is always rendered, but its max-height is controlled by inline style */}
                <div 
                  className="FAQAnswer"
                  style={{ maxHeight: openFAQ === index ? (answerRefs.current[index]?.scrollHeight + 'px' || '200px') : '0px' }}
                >
                  <div ref={el => answerRefs.current[index] = el} className="FAQAnswerInner">
                    <p className="p2 txt-color-bg-light">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='ContactCustomerServiceWidget'>
          <div className='ContactCustomerServiceDescription'>
            <h1 className='txt-color-primary'>
              Perlu bantuan lebih lanjut?
            </h1>
            <p className='p1 txt-color-white'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <button className='button-primary h3'>Customer Service</button>
        </div>
      </section>
    </div>
  );
}

export default function Help() {
    return (
        <div className="text-center mt-10">
          <HelpLanding />
          <FAQ />
        </div>
      );
}