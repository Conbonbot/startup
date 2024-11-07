import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './learn.css';



export function Learn(props){
    return (
        <>
          <main className="container-fluid bg-secondary text-center">
            <h1>Below is a breakdown of how stocks function</h1>
              <section className="examples-with-pictures">
                <div className="card card-styled">
                  <img src="../../image/pages/old_nvidia_stock_photo.jpg" className="card-img-top" alt="old-NVDA" />
                    <div className="card-body">
                      <h5 className="card-title">Example #1</h5>
                        <p className="card-text">
                          This is the NVDA stock price from 2015 to 2018. The graph clearly shows how the price has skyrocketed.
                          That means if you were to buy the stock when it was low, and sell it now (when it's high), you would make some
                          serious money.
                          <hr />
                          <b>This is what we want.</b>
                        </p>
                    </div>
                </div>
                <div className="card card-styled">
                  <img src="../../image/pages/crash.png" className="card-img-top" alt="dow-decline" />
                  <div className="card-body">
                    <h5 className="card-title">Example #2</h5>
                    <p className="card-text">
                      This is an example of a stock that has crashed. Unlike Example #1, you would lose quite a bit of money selling this stock
                      (assuming you bought it at its peak).
                      <hr />
                      <b>This is what we DO NOT want.</b>
                    </p>
                  </div>
                </div>
                <div className="card card-styled">
                  <img src="../../image/pages/sp500bubble.jpg" className="card-img-top" alt="almost-nothing" />
                  <div className="card-body">
                    <h5 className="card-title">Example #3</h5>
                    <p className="card-text">
                      This is an example where the stock price hasn't changed much. While it is better than Example #2,
                      There is basically no money to be made with this stock. 
                      <hr />
                      <b>This is not that useful for us.</b>
                    </p>
                  </div>
                </div>
            </section>
            <hr />
            <h2>Below is useful information to know about stocks!</h2>
            <section className="stock-information">
              <StocksAccordion />
            </section>
        </main>
        </>
    );
}

function StocksAccordion() {
    return (
        <>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Beta</Accordion.Header>
              <Accordion.Body>
                <b>Beta</b> refers to the volatility of a stock, compared to the stock market as a whole (1.00). If the beta is greater than 1,
                this typically means that a stock will outperform the stock market when the market is up, but also crash farther when the market is down.
                <hr />
                Stocks with a beta greater than 1 can be risky! They can lead to greater earnings, but they are not as stable, and could crash.
                <hr />
                On the other hand, Stocks with a beta less than 1 will typically underperform against the market. This means earnings are more stable,
                but with less magnitude than stocks with a greater beta.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='1'>
              <Accordion.Header>P/E Ratio</Accordion.Header>
              <Accordion.Body>
                <b>Price-to-Earnings Ratio</b>. Often called the price or earnings multiple, the P/E ratio helps assess the relative value of a company's stock. 
                It's handy for comparing a company's valuation against its historical performance, against other firms within its industry, or the overall market.
                <hr />
                Typically, a high P/E ratio means that a stock is expensive and its price may fall in the future, and a low P/E ratio menas that a stock
                is cheap and its price may rise in the future.
                <hr />
                An average P/E ratio is around <b>20-25</b>.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey='2'>
              <Accordion.Header>EPS</Accordion.Header>
              <Accordion.Body>
                <b>Earning per Share</b>. This number tells you how much a company earns in profit for each outstanding share of stock. EPS is calculated by 
                dividing a company's net income by the total number of shares outstanding.
                <hr />
                While there is no hard-and-fast rule of a "good" or "bad" EPS value, the higher the value, the better.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </>
    );
}