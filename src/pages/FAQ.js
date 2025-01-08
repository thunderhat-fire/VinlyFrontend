import React, { useState } from 'react';
import './FAQ.css';
import Footer from '../components/Footer';

const accordionData = [
  {
    question: 'What is your service about.',
    answer: 'Our service helps with creating crowdfunds for vinyl pressings.',
  },
  {
    question: 'How do I start a crowdfund.',
    answer:
      'Click on the "Press Vinyl Menu" button and fill in the required details to start.',
  },
  {
    question: 'How long does the crowdfund process take.',
    answer: 'The timeframe is set to 4 weeks for all Crowdfunds.',
  },
  {
    question: 'What happens when the crowdfund target is reached.',
    answer:
      'The project closes and then we send your master audio and Album artwork to the plant for pressing and printing.',
  },
  {
    question: 'How long does it take to get the records to my Fans.',
    answer:
      'The records are pressed within a timeframe of about 6 weeks from the closing of crowdfund, and then sent out to Fans who donated to your project. You can reasonably expect a record to get to your Donor/Fan within 7 weeks of the end of Crowdfund.',
  },
  {
    question: 'What happens if my chosen target funding goal is not reached.',
    answer:
      'If at the end of the timeframe you do not reach your target - we will refund your Fans/Donors their original donation minus a small fee.',
  },
  {
    question: 'The fees you pay.',
    answer:
      'We charge a 5% flat fee on all transactions - so if you have made a donation of £20 (to an unsuccessful crowdfund) you will be returned £19 back to the source you made the payment with - normally your credit or debit card.',
  },
  {
    question: 'When do my donators get refunded if I do not reach my goal.',
    answer:
      'The timeframe can vary slightly, but they should have received their original donation (minus fee) a week after the closing of the unsuccessful project.',
  },
  {
    question: 'What happens to the extra records that have been pressed (once all my donors have been sent a copy).',
    answer:
      'You as the creator of the successful crowdfund receive any excess copies - posted to you.',
  },
  {
    question: 'How do I find out more about this process.',
    answer:
      'Click on the "Process" menu button and fill in the required details to start a conversation with us by email or telephone - we will be happy to explain and answer further questions.',
  },
  {
    question: 'Who runs VinylFunders.',
    answer: 'We are an independent arm of the agency Soundonshape.com.',
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
//    <>
//<div className="polka-dots"></div>

      <div className="faq-container">
        <h2>Your Questions Answered</h2>
        <h4>How It Works</h4>
        <p>We will outline our terms here</p>

        <div className="accordion">
          {accordionData.map((item, index) => (
            <div className="accordion-item" key={index}>
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                {item.question}
              </button>
              <div
                className={`accordion-content ${
                  activeIndex === index ? 'active' : ''
                }`}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
//</>
  );
};

export default FAQ;
