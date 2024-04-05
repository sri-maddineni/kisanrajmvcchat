import React from 'react';

function HomeSummaryCards() {
    return (
        <>
            <style>{`
        .carder {
          background: red;
          padding: 20px;
          border-radius: 5px;
          margin:5px;
        }
        .carder h2 {
          color: white;
          text-align: center;
        }
        .carder p {
          color: white;
        }
      `}</style>

            <div className="carder">
                <h2>Card Title</h2>
                <p>This is a summary card.</p>
            </div>
        </>
    );
}

export default HomeSummaryCards;
