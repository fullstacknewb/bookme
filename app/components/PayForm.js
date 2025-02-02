'use client';

import { useEffect, useRef, useState } from 'react';
import {submitPayment} from '../handlers/createpayment.js';

export default function PayForm() {
  //Payment form state
  const cardRef = useRef(null);
  //Payment status state
  const [paymentStatus, setPaymentStatus] = useState('');

  // Initialize Square SDK and card form with useEffect
  useEffect(() => {
    const scriptId = 'square-sdk-script';
    const scriptUrl = 'https://sandbox.web.squarecdn.com/v1/square.js';
    let script = document.getElementById(scriptId);

    const initializeSquarePayments = async () => {
      if (!window.Square) {
        console.error('Square SDK not loaded');
        return;
      }

      const payments = window.Square.payments(
        'sandbox-sq0idb-0-2aMVlWLv_r7_-VWTpVvA',
        'LY2QRHG0Q0XZ7'
      );

      try {
        // Clear previous card instance if exists
        if (cardRef.current) {
          await cardRef.current.destroy();
          cardRef.current = null;
        }

        const card = await payments.card({
          postalCode: 'required'
          
        });
        const container = document.getElementById('card-container');
        
        // Clear container and attach new card
        container.innerHTML = '';
        await card.attach(container);
        
        cardRef.current = card;
        console.log('Card element initialized');
      } catch (error) {
        console.error('Card initialization failed:', error);
      }
    };

    // Load script if not already loaded
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = scriptUrl;
      script.async = true;
      script.onload = initializeSquarePayments;
      script.onerror = () => {
        console.error('Failed to load Square SDK');
        document.body.removeChild(script);
      };
      document.body.appendChild(script);
    } else if (window.Square) {
      initializeSquarePayments();
    }

    // Cleanup function
    return () => {
      if (cardRef.current) {
        cardRef.current.destroy().then(() => {
          console.log('Card element cleaned up');
          cardRef.current = null;
        });
      }
    };
  }, []);

  const handlePayment = async () => {
    if (!cardRef.current) return;

    try {
      const result = await cardRef.current.tokenize();
      if (result.status === 'OK') {
        const response = submitPayment(result.token);

       if(response.payment){
        setPaymentStatus('Payment successful.');
        console.log(paymentStatus)
       } else {
        
       }
      }
    } catch (error) {
      console.error('Payment error:', error);
      setPaymentStatus('Payment failed.');
    }
  };

  return (
    <div>
      <h1>Square Payment Integration (Canada)</h1>
      <div id="card-container"></div>
      <button onClick={handlePayment}>Pay</button>
      <p>{paymentStatus}</p>
    </div>
  );
}